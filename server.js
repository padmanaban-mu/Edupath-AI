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

// ─── EduPath Course Knowledge Base ───────────────────────────────
// Inline course data so the chatbot ONLY knows about EduPath content.
// Keep this in sync with courseData.js (frontend).

const EDUPATH_COURSE_KNOWLEDGE = `
=== EDUPATH AI — COURSE KNOWLEDGE BASE ===

## DOMAINS
EduPath AI offers two learning tracks:
1. Data Analyst
2. AI/ML Engineer

---

## DOMAIN: DATA ANALYST
Levels: Data Foundations → Statistical Analysis → Database & SQL → Python Engineering → Visual Analytics → Advanced Modeling

### Fundamental Courses
- Data Fundamentals (Level 1): Data Types, Database Intro, Data Cleaning basics
- Statistics (Level 2, needs: Data Fundamentals): Descriptive Stats, Hypothesis Testing, Probability Distributions
- Excel Analytics (Level 2, needs: Data Fundamentals): Pivot Tables, VLOOKUP/XLOOKUP, Conditional Formatting
- Exploratory DA/EDA (Level 5, needs: Statistics + Pandas): Handling Missing Data, Outlier Detection, Correlation Matrices
- BI Tools PBI/Tableau (Level 5, needs: Excel + EDA): DAX Queries, Dashboard Design, Data Connections

### Programming Courses
- SQL Basics and Advanced (Level 3, needs: Data Fundamentals): JOINS, Subqueries, Window Functions | Compiler: sql.html
- Python Basics (Level 4, needs: Data Fundamentals): Loops & Functions, OOPs Concepts, Lists & Dictionaries | Compiler: python_compiler.html
- NumPy Arrays (Level 4): Array Slicing, Broadcasting, Matrix Operations | Compiler: comp_numpy.html
- Pandas DataFrames (Level 4, needs: NumPy): DataFrames, Groupby & Aggregation, Merging Data | Compiler: pandas_compiler.html
- Python Viz (Level 5): Matplotlib Pyplot, Seaborn Styling, Interactive Plots | Compiler: dataviz.html
- Regression Models (Level 6, needs: Statistics + Python Basics): Linear Regression, Logistic Regression, Model Evaluation | Compiler: regression_compiler.html

---

## DOMAIN: AI/ML ENGINEER
Levels: Math Foundations → Statistical Theory → Classical ML → Deep Learning → Applied AI → Ethics & Ops

### Fundamental Courses
- Linear Algebra (Level 1): Vectors, Matrices, Eigenvalues
- Multivariable Calculus (Level 1, needs: Linear Algebra): Partial Derivatives, Gradients, Chain Rule
- Probability & Inference (Level 2, needs: Linear Algebra): Bayes Theorem, Random Variables, Distributions
- Optimization Theory (Level 3, needs: Multivariable Calculus): Gradient Descent, Convex Optimization, Loss Functions
- AI Ethics & Bias (Level 6): Algorithmic Bias, Data Privacy, Explainable AI

### Programming Courses
- Scikit-Learn ML (Level 3, needs: Linear Algebra): Classification, Clustering, Cross Validation
- Neural Networks (Level 4, needs: Scikit-Learn): Backpropagation, Activation Functions, Epochs
- PyTorch/TF (Level 4, needs: Neural Networks): Tensors, Building Models, Training Loops
- NLP & Transformers (Level 5, needs: Neural Networks): Tokenization, Word Embeddings, Attention Mechanism
- Computer Vision (Level 5, needs: Neural Networks): CNNs, Image Preprocessing, Object Detection
- MLOps Deployment (Level 6, needs: PyTorch/TF): Docker, Model Monitoring, API Endpoints

---

## COURSE MODULES & TOPICS

### NumPy Arrays (9 modules, 27 questions)
1. Introduction to NumPy: ndarray object, shape/ndim/dtype, memory layout
2. Array Creation: np.zeros(), np.ones(), np.arange(), np.linspace(), np.eye()
3. Indexing & Slicing: 1D/2D indexing, slicing syntax, boolean indexing, fancy indexing
4. Reshaping & Transposing: flatten(), reshape(), transpose(), views vs copies
5. Numerical Operations: element-wise arithmetic, broadcasting, vectorized functions
6. Statistical Functions: mean(), median(), std(), max()/min(), axis parameter
7. Random Number Generation: np.random.rand(), randint(), seed(), shuffle()
8. Linear Algebra: np.dot(), matmul()/@, linalg.inv(), linalg.det(), eigenvalues
9. Final Mock Assessment: end-to-end NumPy pipeline

### Python Basics (13 modules, 39 questions)
1. Introduction to Python: print(), input(), comments, basic syntax
2. Variables and Data Types: int/float/str/bool, type(), type casting
3. Operators & Expressions: arithmetic, comparison, logical operators
4. Strings: string methods, f-strings, slicing, formatting
5. Lists & Tuples: list methods, list comprehensions, tuple unpacking
6. Dictionaries & Sets: dict methods, set operations, dictionary comprehension
7. Functions: def, arguments/kwargs, return, lambda, recursion
8. Loops & Conditionals: for/while, if/elif/else, break/continue, enumerate/zip
9. File I/O: open()/read()/write(), context manager, CSV reading
10. Error & Exception Handling: try/except/finally, raising exceptions, custom exceptions
11. Modules & Libraries: import, math/random/datetime, pip basics
12. OOP Concepts: classes, inheritance, encapsulation, __init__, method overriding
13. Final Mock Assessment: combined Python skills

### Pandas DataFrames (11 modules, 33 questions)
1. Introduction to Pandas: Series vs DataFrame, core data structures
2. DataFrames Basics: creating DataFrames, shape/columns/dtypes, custom index
3. Reading Data: pd.read_csv(), pd.read_excel(), parsing specific columns, dates on load
4. Selection and Indexing: column selection, loc vs iloc, conditional filtering, boolean masks
5. Numerical Operations & Mapping: column arithmetic, apply(), map(), lambda on columns
6. Handling Missing Data: isnull(), dropna(), fillna(), imputation strategies
7. GroupBy & Aggregations: groupby(), agg(), multiple aggregations, filter() on groups
8. Concatenation & Merging: pd.concat(), pd.merge(), INNER/LEFT/RIGHT joins
9. Time Series Data: pd.to_datetime(), DatetimeIndex, resample(), rolling windows
10. Multi-indexing: pd.MultiIndex, set_index(), loc on MultiIndex, reset_index()
11. Final Mock Assessment: end-to-end Pandas pipeline

### Regression Models (9 modules, 27 questions)
1. Introduction to Regression: supervised vs unsupervised, types of regression
2. Simple Linear Regression: y=mx+b, OLS, slope and intercept
3. Multiple Linear Regression: matrix form y=Xβ, Normal Equation, bias term
4. Cost Functions & Gradient Descent: MSE, gradient computation, learning rate, GD loop
5. Model Evaluation Metrics: MSE/RMSE/MAE, R-squared, Adjusted R², residual analysis
6. Data Preprocessing: Z-score standardization, min-max scaling, one-hot encoding, train-test split
7. Cross-Validation & Splitting: K-Fold CV, shuffle and split, bias-variance tradeoff
8. Logistic Regression: sigmoid function, binary cross entropy, logistic gradient descent
9. Final Mock Assessment: end-to-end regression pipeline

### SQL Basics and Advanced (9 modules, 27 questions)
1. Introduction to SQL & Databases: SELECT *, column aliasing, string concatenation
2. Basic SELECT & Filtering: WHERE clause, AND/OR/NOT, BETWEEN, LIKE, IN
3. Aggregates & Grouping: COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING
4. SQL JOINS: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, Self JOIN
5. Subqueries & CTEs: WHERE subquery, derived tables, WITH clause, correlated subqueries
6. Data Manipulation (DML): INSERT INTO, UPDATE SET, DELETE WHERE, TRUNCATE
7. Table Creation & Structure (DDL): CREATE TABLE, PRIMARY KEY, NOT NULL, FOREIGN KEY, ALTER TABLE
8. Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), PARTITION BY, OVER()
9. Final Mock Assessment: combined SQL skills

### Python Viz (9 modules, 27 questions)
1. Principles of Data Visualization: chart selection, data-ink ratio, tidy data, colorblind palettes
2. Matplotlib: plt.plot(), scatter(), bar(), subplots, Figure & Axes objects
3. Seaborn: histplot(), boxplot(), heatmap(), Seaborn themes
4. Interactive Plots with Plotly: plotly.express, px.line(), px.pie(), hover data
5. Interactive Plots with Bokeh: bokeh.plotting.figure(), line/vbar, HoverTool
6. Declarative Visualization with Altair: alt.Chart(), mark_bar/circle, encoding channels, .interactive()
7. Geographic Mapping with Folium: folium.Map(), Marker, CircleMarker, choropleth layers
8. Visualization for Data Science & ML: Confusion Matrix, ROC Curve, PCA scatter
9. Final Mock Assessment: combined visualization skills

### Excel Analytics (9 modules, 27 questions)
1. Getting Started with Excel: cell references, TODAY()/NOW(), absolute vs relative ($)
2. Essential Formulas & Functions: SUM, AVERAGE, MAX, MIN, COUNT, COUNTA
3. Logical Functions: IF, AND, OR, Nested IF, IFS
4. Lookup Functions: VLOOKUP, HLOOKUP, XLOOKUP, INDEX MATCH
5. Data Cleaning & Formatting: TRIM, PROPER, UPPER, LOWER, TEXTJOIN, SUBSTITUTE
6. Pivot Tables & Charts: creating pivot tables, GETPIVOTDATA, COUNTBLANK, COUNTIFS
7. Advanced Data Analysis: SUMPRODUCT, INDEX MATCH combo, IFERROR, array formulas
8. Macros & VBA: recording macros, Sub procedures, Range.Clear, User Defined Functions
9. Final Mock Assessment: combined Excel skills

---

## OFF-TOPIC POLICY
You ONLY discuss EduPath AI platform content (domains, courses, modules, topics, questions, roadmap, progress).
If user asks anything outside this scope, redirect warmly:
"I'm specialized for EduPath AI. I can help with your roadmap, course topics, or practice questions. What would you like to learn today?"
`;

/**
 * Builds the full Gemini system instruction for /api/chat.
 * Merges student profile data with the static course knowledge base.
 */
function buildChatSystemInstruction({ domainName, completionRate, completed, inProgress, pendingMockTest, locked, programmingProgress, nonProgrammingProgress }) {
    return `
You are EduPath AI — a specialized educational assistant for the EduPath AI learning platform.

═══════════════════════════════════════════
STUDENT PROFILE (DATABASE SYNCED)
═══════════════════════════════════════════
- Chosen Domain: ${domainName}
- Overall Roadmap Progress: ${completionRate}% Complete
- Programming Track Progress: ${programmingProgress}%
- Fundamentals Track Progress: ${nonProgrammingProgress}%

- Finished Courses (100%): ${completed.length > 0 ? completed.join(', ') : 'None'}
- Active Learning (<90%): ${inProgress.length > 0 ? inProgress.join(', ') : 'None'}
- Pending Mock Tests (Blocked at 90%): ${pendingMockTest.length > 0 ? pendingMockTest.join(', ') : 'None'}
- Locked / Next in Queue: ${locked.slice(0, 5).join(', ') || 'None'}

═══════════════════════════════════════════
STRICT SCOPE — WHAT YOU CAN ANSWER
═══════════════════════════════════════════
1. Questions about the EduPath AI platform and how it works.
2. The selected domain: ${domainName}.
3. Any course, module, topic, or practice question listed in the COURSE KNOWLEDGE BASE.
4. Learning path advice based strictly on the user's completed/pending courses. If they ask how to study a specific course, recommend a module-by-module approach based on the syllabus.
5. Conceptual explanations of topics that appear in the curriculum.

═══════════════════════════════════════════
STRICT SCOPE — WHAT YOU MUST NOT ANSWER
═══════════════════════════════════════════
- Anything unrelated to EduPath AI or the listed courses/domains
- General coding help for tools/frameworks NOT in the curriculum (e.g. LangChain, Hugging Face, Django, React)
- External homework, interviews, or projects outside this platform
- General chat, news, weather, opinions, or non-learning topics

If a question is outside scope, reply:
"That's beyond my EduPath AI knowledge area. I'm best at helping with your [${domainName}] roadmap, course modules, and practice questions. What would you like to explore today?"

═══════════════════════════════════════════
PROGRESS RULES
═══════════════════════════════════════════
- If user asks "What is my progress?", answer exactly ${completionRate}%.
- Pending Mock Tests: User MUST pass the Final Mock Assessment in each pending course to unlock dependencies. Emphasize this clearly.
- Only explain course content from Finished, Active Learning, or Pending Mock Test lists in detail.
- For Locked courses, give a brief overview and explain what prerequisites must be completed first.

═══════════════════════════════════════════
FORMATTING RULES
═══════════════════════════════════════════
- Use **bold** for course names, topics, and key terms
- Use bullet points for steps and lists
- Use ### for section headers
- For code-related topics, always include a short code example in a markdown code block
- Be concise, warm, and motivating — treat the user as a learner on a journey

═══════════════════════════════════════════
COMPILER PAGES (direct users here for practice)
═══════════════════════════════════════════
- Python Basics → python_compiler.html
- NumPy Arrays → comp_numpy.html
- Pandas DataFrames → pandas_compiler.html
- Regression Models → regression_compiler.html
- SQL Basics and Advanced → sql.html
- Python Viz → dataviz.html
- Excel Analytics → excel_compiler.html

═══════════════════════════════════════════
COURSE KNOWLEDGE BASE
═══════════════════════════════════════════
${EDUPATH_COURSE_KNOWLEDGE}
`;
}

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
// ─── Database Connection ─────────────────────────────────────────
const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edupath_db';
mongoose.connect(DB_URI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ─── User Schema ─────────────────────────────────────────────────
const User = mongoose.model('User', new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasGeneratedRoadmap: { type: Boolean, default: false },
    selectedDomain: { type: String, default: '' },
    roadmapData: { type: Object, default: null },
    courseProgress: { type: Object, default: {} }, // NEW: Tracks module-level completion per course
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

// ─── Dynamic Module Metadata (Upgraded for all courses) ───────────
const MODULE_NAMES = {
    module1: 'Introduction to Data Visualization',
    module2: 'Matplotlib Basics',
    module3: 'Statistical Plots',
    module4: 'Interactive Charts with Plotly',
    module5: 'Bokeh Visualizations',
    module6: 'Altair & Declarative Visualization',
    module7: 'Geospatial Visualization',
    module8: 'ML Model Visualizations',
    module9: 'Final Mock Assessment'
};

const NUMPY_MODULE_NAMES = {
    module1: 'NumPy Basics',
    module2: 'Array Creation',
    module3: 'Indexing & Slicing',
    module4: 'Reshaping Arrays',
    module5: 'Math Operations',
    module6: 'Matrix Operations',
    module7: 'Statistics',
    module8: 'Advanced NumPy',
    module9: 'Final Mock Assessment'
};

const PANDAS_MODULE_NAMES = {
    module2: 'DataFrames Basics',
    module3: 'Reading Data (CSV, Excel, etc.)',
    module4: 'Selection and Indexing',
    module5: 'Numerical Operations & Mapping',
    module6: 'Handling Missing Data',
    module7: 'GroupBy & Aggregations',
    module8: 'Concatenation & Merging',
    module9: 'Time Series Data',
    module10: 'Multi-indexing',
    module11: 'Data Visualization with Pandas',
    module12: 'Advanced Operations & Optimization',
    module13: 'Final Mock Assessment'
};

const PYTHON_MODULE_NAMES = {
    module1: 'Introduction to Python',
    module2: 'Variables and Data Types',
    module3: 'Python Operators',
    module4: 'Conditional Statements',
    module5: 'Loops – while loop',
    module6: 'Loops – for loop',
    module7: 'Data Structures (Lists & Tuples)',
    module8: 'Advanced Data Structures',
    module9: 'Methods and Functions',
    module10: 'File Handling',
    module11: 'Exception Handling',
    module12: 'OOP Concepts',
    module13:'Final Mock Assessment'
};

// FULLY INTEGRATED REGRESSION METADATA
const REGRESSION_MODULE_NAMES = {
    module1: 'Introduction to Regression',
    module2: 'Simple Linear Regression',
    module3: 'Multiple Linear Regression',
    module4: 'Polynomial Regression',
    module5: 'Support Vector Regression',
    module6: 'Decision Tree Regression',
    module7: 'Random Forest Regression',
    module8: 'Model Evaluation & Metrics',
    module9: 'Final Mock Assessment'
};

const EXCEL_MODULE_NAMES = {
    module1: 'Getting Started with Excel',
    module2: 'Essential Formulas & Functions',
    module3: 'Logical Functions (IF, AND, OR)',
    module4: 'Lookup Functions (VLOOKUP, XLOOKUP)',
    module5: 'Data Cleaning & Formatting',
    module6: 'Pivot Tables & Charts',
    module7: 'Advanced Data Analysis',
    module8: 'Macros & VBA',
    module9: 'Final Mock Assessment'
};

const COURSE_MODULE_NAMES = {
    data_visualization: MODULE_NAMES,
    sql: {
        module1: 'Introduction to SQL & Databases',
        module2: 'Basic SELECT & Filtering',
        module3: 'Aggregates & Grouping',
        module4: 'SQL JOINS',
        module5: 'Subqueries & CTEs',
        module6: 'Data Manipulation (DML)',
        module7: 'Table Creation & Structure (DDL)',
        module8: 'Advanced SQL Concepts',
        module9: 'Final Mock Assessment'
    },
    numpy: NUMPY_MODULE_NAMES,
    pandas: PANDAS_MODULE_NAMES,
    python: PYTHON_MODULE_NAMES,
    regression: REGRESSION_MODULE_NAMES
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
        const normalizedCode = code.replace(/\r\n/g, '\n'); 
        fs.writeFileSync(tmp, SAFE_INPUT_WRAPPER + normalizedCode, 'utf-8');
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
    let baseDelay = 1500;
    
    for (let i = 0; i < retries; i++) {
        try {
            return await chatSession.sendMessage(message);
        } catch (error) {
            console.warn(`[Network] Gemini API fetch failed (Attempt ${i + 1}/${retries}). Error: ${error.status || 'Network Issue'}`);
            if (i === retries - 1) throw error;
            const delay = baseDelay * Math.pow(2, i);
            console.log(`[Network] Waiting ${delay / 1000}s before next attempt...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

// ─── Helper Functions (Judge0 SQL Compiler) ──────────────────────

function loadQuestionForSql(course, moduleName, questionId) {
    const moduleDir = path.join(__dirname, 'course_data', course, 'modules', moduleName);
    let filePath = path.join(moduleDir, `${questionId}.json`);

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
            roadmapData: user.roadmapData,
            courseProgress: user.courseProgress || {} // Send detailed progress to frontend
        });
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch roadmap" });
    }
});
app.post('/save-roadmap', authenticateToken, async (req, res) => {
    try {
        // We now extract 'courseProgress' directly from the Chatbot's payload.
        // This payload contains the deep {video, quiz, program} logic for every specific course.
        const { hasGeneratedRoadmap, selectedDomain, roadmapData, courseProgress } = req.body;
        
        // Update the MongoDB document with the Chatbot's exact, highly-detailed schema
        await User.findByIdAndUpdate(req.userId, {
            $set: {
                roadmapData: roadmapData,
                selectedDomain: selectedDomain,
                hasGeneratedRoadmap: hasGeneratedRoadmap,
                courseProgress: courseProgress || {} // Saves the deep module gatekeepers
            }
        });
        
        res.sendStatus(200);
    } catch (err) {
        console.error("Save Roadmap Error:", err);
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
        const course = req.query.course || 'data_visualization';
        // Updated to fully handle the new regression folder along with existing paths
        const modulesDir = (course === 'numpy' || course === 'python' || course === 'pandas' || course === 'regression') && !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
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

            // Using the fully upgraded dictionary map for all courses
            const mappedName = (COURSE_MODULE_NAMES[course] && COURSE_MODULE_NAMES[course][folder]) || folder;

            modules.push({
                id: folder,
                name: mappedName,
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
        
        // Bulletproof check for questions
        const modulesDir = !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
            ? path.join(__dirname, 'modules') 
            : path.join(__dirname, 'course_data', course, 'modules');
            
        const moduleDir = path.join(modulesDir, moduleId);
        let filePath = path.join(moduleDir, `${questionId}.json`);

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

    const modulesDir = (course === 'numpy' || course === 'python' || course === 'pandas' || course === 'regression') && !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
        ? path.join(__dirname, 'modules') 
        : path.join(__dirname, 'course_data', course, 'modules');

    const moduleDir = path.join(modulesDir, moduleId);
    let filePath = path.join(moduleDir, `${questionId}.json`);

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

    // Python Execution Logic
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
// ==========================================
// EXCEL COMPILER ENDPOINT
// ==========================================
app.post('/api/compile-excel', (req, res) => {
    try {
        const { code, module: moduleId, q: questionId, course } = req.body;

        // Locate the correct question JSON file using the bulletproof path logic
        const modulesDir = !fs.existsSync(path.join(__dirname, 'course_data', course, 'modules')) 
            ? path.join(__dirname, 'modules') 
            : path.join(__dirname, 'course_data', course, 'modules');

        const moduleDir = path.join(modulesDir, moduleId);
        let filePath = path.join(moduleDir, `${questionId}.json`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ status: "error", message: "Question file not found on server." });
        }

        const question = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const expected = (question.expected_output || "").trim().toLowerCase();
        
        // Clean the user's code (remove VBA comments, trim whitespace, ignore case)
        const userCodeClean = code
            .split('\n')
            .filter(line => !line.trim().startsWith("'")) 
            .join('')
            .trim()
            .toLowerCase();

        // Compare user code to expected output (ignoring extra spaces)
        const isCorrect = userCodeClean === expected || userCodeClean.replace(/\s+/g, '') === expected.replace(/\s+/g, '');

        res.json({
            status: "success",
            isCorrect: isCorrect,
            summary: { total: 1, passed: isCorrect ? 1 : 0, failed: isCorrect ? 0 : 1 },
            results: [{
                id: "test_1",
                visibility: "visible",
                passed: isCorrect,
                message: isCorrect ? "Formula matches expected solution!" : "Formula logic incorrect.",
               actual_output: code.split('\n').filter(line => !line.trim().startsWith("'")).join('\n').trim(),
                expected_output: [question.expected_output]
            }]
        });

    } catch (err) {
        console.error("Excel compile error:", err);
        res.status(500).json({ status: "error", message: "Server encountered an error." });
    }
});
// Judge0 API Endpoint for Advanced SQL compilation
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
        let pendingMockTest = [];
        let inProgress = [];
        let locked = [];
        let programmingProgress = 0;
        let nonProgrammingProgress = 0;

        if (roadmap && roadmap[domain]) {
            const prog = roadmap[domain].programming || [];
            const nonProg = roadmap[domain].nonProgramming || [];
            const all = [...prog, ...nonProg];
            
            completed       = all.filter(c => c.progress === 100).map(c => c.title);
            pendingMockTest = all.filter(c => c.progress === 90).map(c => c.title);
            inProgress      = all.filter(c => c.progress > 0 && c.progress < 90).map(c => `${c.title} (${c.progress}%)`);
            locked          = all.filter(c => c.progress === 0).map(c => c.title);

            // Calculate overall section progresses
            const calcAvg = arr => arr.length ? Math.round(arr.reduce((acc, curr) => acc + curr.progress, 0) / arr.length) : 0;
            programmingProgress = calcAvg(prog);
            nonProgrammingProgress = calcAvg(nonProg);
        }

        const domainName = domain === 'aiml' ? "AI/ML Engineer" : "Data Analyst";
        const totalCourses = completed.length + pendingMockTest.length + inProgress.length + locked.length;
        const completionRate = totalCourses > 0 ? Math.round((completed.length / totalCourses) * 100) : 0;

        // Pass all detailed DB metrics to the prompt
        const systemInstruction = buildChatSystemInstruction({
            domainName,
            completionRate,
            completed,
            inProgress,
            pendingMockTest,
            locked,
            programmingProgress,
            nonProgrammingProgress
        });

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

// ─── REGRESSION FILE ROUTES ──────────────────────────────────────
app.get('/regression_models.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'regression_models.html'));
});

app.get('/regression_compiler.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'regression_compiler.html'));
});

// ─── Catch-all Route ─────────────────────────────────────────────
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