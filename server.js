require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawnSync } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const morgan = require('morgan');
const axios = require('axios');

// Check for API Key
console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "Key Found" : "Key MISSING");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = '2da20021ba5468a6bd0883fde8fb0cc9b51de723ced5dc3d08d663e8518fb28ab0c02158e9a5ac628eb383e3496010cee77db48e51c87c877ce9330ba6cc2b22';

// Judge0 Configuration (For SQL compilation via Python harness)
const JUDGE0_URL = process.env.JUDGE0_URL || "https://ce.judge0.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || "";
const JUDGE0_HOST = process.env.JUDGE0_HOST || "";
const JUDGE0_LANGUAGE_ID = Number(process.env.JUDGE0_LANGUAGE_ID || 71);

// ─── Initialize SQL Engine (Local) ───────────────────────────────
let SQL;
initSqlJs().then(s => {
    SQL = s;
    console.log('sqlite engine initialized');
}).catch(err => console.error('sql.js init error:', err));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── Middleware ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan('dev'));
// UPDATED: Points to your new frontend folder
app.use(express.static(path.join(__dirname, 'frontend', 'project')));

// ─── Database Connection ─────────────────────────────────────────
mongoose.connect('mongodb://127.0.0.1:27017/edupath_db');

// ─── User Schema ─────────────────────────────────────────────────
const User = mongoose.model('User', new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasGeneratedRoadmap: { type: Boolean, default: false },
    selectedDomain: { type: String, default: '' },
    roadmapData: { type: Object, default: null },
    chatHistory: { type: Array, default: [] } 
}));

// ─── Authentication Middleware ───────────────────────────────────
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send({ error: "Invalid token" });
        req.userId = decoded.userId;
        next();
    });
};

// ─── Module Metadata (From Compiler Server) ───────────────────────
const MODULE_NAMES = {
    module1: 'Introduction to Data Visualization',
    module2: 'Matplotlib Basics',
    module3: 'Statistical Plots',
    module4: 'Interactive Charts with Plotly',
    module5: 'Bokeh Visualizations',
    module6: 'Altair & Declarative Visualization',
    module7: 'Geospatial Visualization',
    module8: 'ML Model Visualizations'
};

const NUMPY_MODULE_NAMES = {
    module1: 'NumPy Basics',
    module2: 'Array Creation',
    module3: 'Indexing & Slicing',
    module4: 'Reshaping Arrays',
    module5: 'Math Operations',
    module6: 'Matrix Operations',
    module7: 'Statistics',
    module8: 'Advanced NumPy'
};

// ─── Safe input() wrapper for Python ──────────────────────────────
const SAFE_INPUT_WRAPPER = `import sys as _sys
_stdin_lines = _sys.stdin.read().split('\\n')
_stdin_idx = [0]
def input(prompt=''):
    if _stdin_idx[0] < len(_stdin_lines):
        val = _stdin_lines[_stdin_idx[0]]
        _stdin_idx[0] += 1
        return val
    return ''

`;

// ─── Helper Functions (Local Python Execution) ───────────────────

function runPythonCase(code, stdin) {
    const tmp = path.join(os.tmpdir(), `edupath_${Date.now()}_${Math.random().toString(36).slice(2)}.py`);
    try {
        fs.writeFileSync(tmp, SAFE_INPUT_WRAPPER + code, 'utf-8');
        const result = spawnSync('python', [tmp], {
            input: stdin || '',
            timeout: 10000,
            encoding: 'utf-8'
        });
        return {
            stdout: (result.stdout || '').replace(/\r\n/g, '\n').trim(),
            stderr: (result.stderr || '').replace(/\r\n/g, '\n').trim()
        };
    } finally {
        try { fs.unlinkSync(tmp); } catch (_) { }
    }
}

const sendWithRetry = async (chatSession, message, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await chatSession.sendMessage(message);
        } catch (error) {
            console.warn(`[Network] Gemini API fetch failed. Attempt ${i + 1} of ${retries}...`);
            if (i === retries - 1) throw error;
            await new Promise(res => setTimeout(res, 1500));
        }
    }
};

// ─── Helper Functions (Judge0 SQL Compiler) ──────────────────────

function loadQuestionForSql(course, moduleName, questionId) {
    const moduleDir = path.join(__dirname, 'course_data', course, 'modules', moduleName);
    let filePath = path.join(moduleDir, `${questionId}.json`);

    // Added fallback from NumPy server to match data.id
    if (!fs.existsSync(filePath) && fs.existsSync(moduleDir)) {
        const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.json'));
        const match = files.find(f => {
            const d = JSON.parse(fs.readFileSync(path.join(moduleDir, f), "utf-8"));
            return d.id === questionId;
        });
        if (match) filePath = path.join(moduleDir, match);
    }

    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function buildBaseSetupSql(question) {
    const tables = question?.schema?.tables ?? [];
    const statements = [];
    for (const t of tables) {
        if (t.create_sql) statements.push(t.create_sql);
        for (const insertSql of t.insert_sql ?? []) {
            statements.push(insertSql);
        }
    }
    return statements.join("\n");
}

function normalizeRows(rows) {
    return (rows ?? []).map((row) => {
        const keys = Object.keys(row).sort();
        const normalized = {};
        for (const key of keys) {
            normalized[key] = row[key] === null ? null : String(row[key]);
        }
        return normalized;
    });
}

function rowsMatch(actualRows, expectedRows) {
    const actual = normalizeRows(actualRows);
    const expected = normalizeRows(expectedRows);
    return JSON.stringify(actual) === JSON.stringify(expected);
}

function getAllTestCases(question) {
    const visible = question?.test_cases?.visible ?? [];
    const hidden = question?.test_cases?.hidden ?? [];
    const combined = [
        ...visible.map((c, i) => ({ ...c, id: c.id || `visible_${i + 1}`, visibility: "visible" })),
        ...hidden.map((c, i) => ({ ...c, id: c.id || `hidden_${i + 1}`, visibility: "hidden" }))
    ];

    if (combined.length === 0) {
        return [
            {
                id: "fallback_1",
                visibility: "visible",
                description: "Default expected output check",
                setup_sql: "",
                expected_output: question?.expected_output ?? []
            }
        ];
    }
    return combined;
}

function buildPythonHarness(baseSetupSql, caseSetupSql, userSql) {
    const payload = JSON.stringify({
        base_setup_sql: baseSetupSql,
        case_setup_sql: caseSetupSql || "",
        user_sql: userSql
    });

    return `
import sqlite3
import json
import traceback

payload = json.loads(${JSON.stringify(payload)})
conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

try:
    cur.executescript(payload["base_setup_sql"])
    if payload["case_setup_sql"]:
        cur.executescript(payload["case_setup_sql"])
except Exception as e:
    print(json.dumps({"ok": False, "error": f"Setup Error: {str(e)}"}))
    raise SystemExit(0)

try:
    cur.execute(payload["user_sql"])
    if cur.description is not None:
        rows = [dict(row) for row in cur.fetchall()]
    else:
        conn.commit()
        rows = [{"rows_affected": cur.rowcount}]
    print(json.dumps({"ok": True, "rows": rows}, default=str))
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
`.trim();
}

async function submitToJudge0(sourceCode) {
    const headers = { "Content-Type": "application/json" };
    if (JUDGE0_API_KEY) {
        headers["x-rapidapi-key"] = JUDGE0_API_KEY;
        headers["x-rapidapi-host"] = JUDGE0_HOST;
    }

    const url = `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`;
    const response = await axios.post(
        url,
        {
            language_id: JUDGE0_LANGUAGE_ID,
            source_code: sourceCode
        },
        { headers, timeout: 30000 }
    );
    return response.data;
}

function parseJudge0Result(result) {
    if (result?.stderr) return { ok: false, error: result.stderr };
    if (result?.compile_output) return { ok: false, error: result.compile_output };
    if (result?.message) return { ok: false, error: result.message };
    if (!result?.stdout) return { ok: false, error: "No output returned from Judge0." };

    try {
        return JSON.parse(result.stdout);
    } catch {
        return { ok: false, error: `Unexpected Judge0 output: ${result.stdout}` };
    }
}


// ─── Auth Routes ─────────────────────────────────────────────────

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: "Account Created!" });
    } catch (err) {
        res.status(400).send({ error: "Email already exists" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.send({ message: "Success", token, username: user.username });
    } else {
        res.status(401).send({ error: "Invalid Credentials" });
    }
});

app.get("/profile", authenticateToken, async (req, res) => {
    res.set("Cache-Control", "no-store");
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send({ error: "User not found" });
        res.send({ username: user.username, fullName: user.fullName });
    } catch (err) {
        res.status(500).send({ error: "Internal server error" });
    }
});

// ─── Roadmap Routes ──────────────────────────────────────────────

app.get("/get-roadmap", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send({ error: "User not found" });
        res.send({
            hasGeneratedRoadmap: user.hasGeneratedRoadmap,
            selectedDomain: user.selectedDomain,
            roadmapData: user.roadmapData
        });
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch roadmap" });
    }
});

app.post('/save-roadmap', authenticateToken, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $set: {
                roadmapData: req.body.roadmapData,
                selectedDomain: req.body.selectedDomain,
                hasGeneratedRoadmap: true
            }
        });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/update-domain", authenticateToken, async (req, res) => {
    try {
        const { selectedDomain } = req.body;
        await User.findByIdAndUpdate(req.userId, { selectedDomain });
        res.send({ message: `Track switched to ${selectedDomain}` });
    } catch (err) {
        res.status(500).send({ error: "Failed to update domain preference" });
    }
});

// ─── Compiler & Module Routes ────────────────────────────────────

app.get('/api/modules', (req, res) => {
    try {
        // UPDATED: Points to your new course_data folder
        const course = req.query.course || 'data_visualization';
        // Handle path for numpy if it was just in /modules in the original, adapting it to course_data
        const modulesDir = course === 'numpy' && !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
            ? path.join(__dirname, 'modules') 
            : path.join(__dirname, 'course_data', course, 'modules');
            
        const modules = [];

        if (!fs.existsSync(modulesDir)) {
            return res.json({ modules: [] });
        }

        const moduleFolders = fs.readdirSync(modulesDir)
            .filter(f => fs.statSync(path.join(modulesDir, f)).isDirectory())
            .sort((a, b) => {
                const numA = parseInt(a.replace('module', ''));
                const numB = parseInt(b.replace('module', ''));
                return numA - numB;
            });

        for (const folder of moduleFolders) {
            const moduleDir = path.join(modulesDir, folder);
            const questions = fs.readdirSync(moduleDir)
                .filter(f => f.endsWith('.json'))
                .sort((a, b) => {
                    const numA = parseInt(a.replace('q', '').replace('.json', ''));
                    const numB = parseInt(b.replace('q', '').replace('.json', ''));
                    return numA - numB;
                })
                .map(f => {
                    const data = JSON.parse(fs.readFileSync(path.join(moduleDir, f), 'utf-8'));
                    return {
                        id: data.id || f.replace('.json', ''),
                        dataId: data.id,
                        title: data.title,
                        difficulty: data.difficulty || 'Basic'
                    };
                });

            // Added check for NumPy naming
            let moduleTitleName = folder;
            if (course === 'numpy' && NUMPY_MODULE_NAMES[folder]) {
                moduleTitleName = NUMPY_MODULE_NAMES[folder];
            } else if (MODULE_NAMES[folder]) {
                moduleTitleName = MODULE_NAMES[folder];
            }

            modules.push({
                id: folder,
                name: moduleTitleName,
                questions
            });
        }
        res.json({ modules });
    } catch (err) {
        console.error('Error loading modules:', err);
        res.status(500).json({ error: 'Failed to load modules' });
    }
});

app.get('/api/modules/:moduleId/questions/:questionId', (req, res) => {
    try {
        const course = req.query.course || 'data_visualization';
        const { moduleId, questionId } = req.params;
        
        const modulesDir = course === 'numpy' && !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
            ? path.join(__dirname, 'modules') 
            : path.join(__dirname, 'course_data', course, 'modules');
            
        const moduleDir = path.join(modulesDir, moduleId);
        let filePath = path.join(moduleDir, `${questionId}.json`);

        // Added fallback from NumPy server to match data.id
        if (!fs.existsSync(filePath) && fs.existsSync(moduleDir)) {
            const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.json'));
            const match = files.find(f => {
                const d = JSON.parse(fs.readFileSync(path.join(moduleDir, f), 'utf-8'));
                return d.id === questionId;
            });
            if (match) filePath = path.join(moduleDir, match);
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const question = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(question);
    } catch (err) {
        console.error('Error loading question:', err);
        res.status(500).json({ error: 'Failed to load question' });
    }
});

// Original /api/execute (Local Python / Local sql.js execution)
app.post('/api/execute', async (req, res) => {
    const { query, moduleId, questionId, course = 'data_visualization' } = req.body;

    if (!query || !moduleId || !questionId) {
        return res.status(400).json({ status: 'error', error: 'Missing required fields' });
    }

    const modulesDir = course === 'numpy' && !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
        ? path.join(__dirname, 'modules') 
        : path.join(__dirname, 'course_data', course, 'modules');

    const moduleDir = path.join(modulesDir, moduleId);
    let filePath = path.join(moduleDir, `${questionId}.json`);

    // Added fallback from NumPy server to match data.id
    if (!fs.existsSync(filePath) && fs.existsSync(moduleDir)) {
        const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.json'));
        const match = files.find(f => {
            const d = JSON.parse(fs.readFileSync(path.join(moduleDir, f), 'utf-8'));
            return d.id === questionId;
        });
        if (match) filePath = path.join(moduleDir, match);
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ status: 'error', error: 'Question not found' });
    }
    const question = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Python Execution Logic (Expanded to handle NumPy test_cases array pattern)
    if (question.expected_output !== undefined || (Array.isArray(question.test_cases) && question.test_cases.length > 0)) {
        const testList = (Array.isArray(question.test_cases) && question.test_cases.length > 0)
            ? question.test_cases
            : [{ input: question.input || '', expected: question.expected_output }];

        const results = [];
        let allPass = true;
        let firstOut = '';
        let firstErr = '';

        for (const tc of testList) {
            const stdin = tc.input || '';
            const { stdout, stderr } = runPythonCase(query, stdin);
            const expected = (tc.expected || '').trim();
            const pass = stdout === expected;

            if (results.length === 0) {
                firstOut = stdout;
                firstErr = stderr;
            }
            if (!pass) allPass = false;

            results.push({
                input: tc.input,
                expected: expected,
                actual: stdout,
                pass,
                error: stderr || ''
            });
        }

        const detailLines = results.map((r, i) =>
            `Test ${i + 1}: ${r.pass ? '✅ PASS' : '❌ FAIL'}` +
            (r.pass ? '' : `\n  Input   : ${r.input || '(none)'}\n  Expected: ${r.expected}\n  Got     : ${r.actual}`) +
            (r.error ? `\n  Error   : ${r.error}` : '')
        ).join('\n\n');

        return res.json({
            status: allPass ? 'success' : 'error',
            correct: allPass,
            output: allPass ? (firstOut || detailLines) : detailLines,
            error: allPass ? '' : detailLines,
            details: results
        });
    }

    // SQL Execution Logic (Local Fallback)
    let db;
    try {
        if (!SQL) SQL = await initSqlJs();
        db = new SQL.Database();

        if (question.schema && question.schema.tables) {
            for (const table of question.schema.tables) {
                const columnDefs = table.columns.map(c => `${c.name} ${c.type}`).join(', ');
                db.exec(`CREATE TABLE ${table.name} (${columnDefs})`);

                if (table.data && table.data.length > 0) {
                    const colNames = table.columns.map(c => c.name).join(', ');
                    for (const row of table.data) {
                        const values = row.map(val => {
                            if (val === null) return 'NULL';
                            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
                            return val;
                        }).join(', ');
                        db.exec(`INSERT INTO ${table.name} (${colNames}) VALUES (${values})`);
                    }
                }
            }
        }

        const results = db.exec(query);
        let columns = [];
        let values = [];
        if (results.length > 0) {
            columns = results[0].columns;
            values = results[0].values;
        }

        res.json({
            status: 'success',
            correct: true,
            output: JSON.stringify({ columns, values }),
            error: ''
        });

    } catch (err) {
        res.json({ status: 'error', correct: false, output: '', error: err.message });
    } finally {
        if (db) db.close();
    }
});

// Judge0 API Endpoint for Advanced SQL compilation (Merged from (sql)server.js)
app.post("/api/compile-sql", async (req, res) => {
    const { module: moduleName, q, sql, course = 'data_visualization' } = req.body ?? {};
    if (!moduleName || !q || !sql) {
        return res.status(400).json({ error: "module, q, and sql are required" });
    }

    const question = loadQuestionForSql(course, moduleName, q);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const baseSetupSql = buildBaseSetupSql(question);
    const testCases = getAllTestCases(question);
    const results = [];

    for (const testCase of testCases) {
        const sourceCode = buildPythonHarness(baseSetupSql, testCase.setup_sql || "", sql);
        let judgeResult;
        try {
            judgeResult = await submitToJudge0(sourceCode);
        } catch (err) {
            return res.status(502).json({
                status: "error",
                isCorrect: false,
                message: `Judge0 request failed: ${err.message}`
            });
        }

        const parsed = parseJudge0Result(judgeResult);
        if (!parsed.ok) {
            results.push({
                id: testCase.id,
                visibility: testCase.visibility,
                passed: false,
                message: parsed.error
            });
            continue;
        }

        const passed = rowsMatch(parsed.rows, testCase.expected_output ?? []);
        results.push({
            id: testCase.id,
            visibility: testCase.visibility,
            passed,
            message: passed ? "Passed" : "Output mismatch",
            actual_output: testCase.visibility === "visible" ? parsed.rows : undefined,
            expected_output: testCase.visibility === "visible" ? testCase.expected_output : undefined
        });
    }

    const failed = results.filter((r) => !r.passed);
    return res.json({
        status: failed.length === 0 ? "success" : "error",
        isCorrect: failed.length === 0,
        summary: {
            total: results.length,
            passed: results.length - failed.length,
            failed: failed.length
        },
        results
    });
});

// ─── Gemini AI Chat Routes ───────────────────────────────────────

app.get('/api/chat-history', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.send({ history: user.chatHistory || [] });
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch history" });
    }
});

app.post('/api/chat', authenticateToken, async (req, res) => {
    try {
        const { userMessage } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send({ error: "User not found" });

        const domain = user.selectedDomain;
        const roadmap = user.roadmapData;
        let completed = [];
        let inProgress = [];
        let locked = [];

        if (roadmap && roadmap[domain]) {
            const all = [...roadmap[domain].programming, ...roadmap[domain].nonProgramming];
            completed = all.filter(c => c.progress === 100).map(c => c.title);
            inProgress = all.filter(c => c.progress > 0 && c.progress < 100).map(c => `${c.title} (${c.progress}%)`);
            locked = all.filter(c => c.progress === 0).map(c => c.title);
        }

        const domainName = domain === 'aiml' ? "AI/ML Engineer" : "Data Analyst";
        const totalCourses = completed.length + inProgress.length + locked.length;
        const completionRate = totalCourses > 0 ? Math.round((completed.length / totalCourses) * 100) : 0;

        const systemInstruction = `
        You are the EduPath AI Career Architect. You have FULL ACCESS to the student's project data.
        
        STUDENT PROFILE:
        - Chosen Domain: ${domainName}
        - Roadmap Progress: ${completionRate}% Complete
        - Finished Courses: ${completed.length > 0 ? completed.join(', ') : 'None'}
        - Active Learning: ${inProgress.length > 0 ? inProgress.join(', ') : 'None'}
        - Next in Queue: ${locked.slice(0, 5).join(', ')}

        STRICT RULES:
        1. DATA TRUTH: If the user asks "What is my progress?", answer exactly ${completionRate}%.
        2. DOMAIN FOCUS: All career advice must be specific to ${domainName}.
        3. COURSE DOUBTS: If a student asks about a course in their "Finished" or "Active" list, give expert technical help.
        4. WORLD OPPORTUNITIES: Mention global roles and salary trends for ${domainName}.

        FORMATTING:
        - Use **bold** for courses/skills.
        - Use bullet points for steps.
        - Use ### for headers.
        `;

        const aiModel = genAI.getGenerativeModel({
            model: "models/gemini-2.5-flash",
            systemInstruction: systemInstruction
        });

        const formattedHistory = user.chatHistory.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        const chatSession = aiModel.startChat({ history: formattedHistory });
        const result = await sendWithRetry(chatSession, userMessage);
        const responseText = result.response.text();

        user.chatHistory.push({ role: 'user', text: userMessage });
        user.chatHistory.push({ role: 'bot', text: responseText });
        await user.save();

        res.send({ reply: responseText });

    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).send({ reply: "Architect is recalibrating. Please try again." });
    }
});

// ─── Catch-all Route ─────────────────────────────────────────────
// ─── Serve index.html for all other routes ───────────────────────
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'project', 'index.html'));
});

// ─── Server Start ────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n  ╔══════════════════════════════════════╗`);
    console.log(`  ║   🎓 EduPath AI — Career Architect   ║`);
    console.log(`  ║   Unified Server on Port: ${PORT}       ║`);
    console.log(`  ╚══════════════════════════════════════╝\n`);
    console.log(`  🚀 Click here to open: http://localhost:${PORT}\n`);
});