require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "Key Found" : "Key MISSING");
const { GoogleGenerativeAI } = require('@google/generative-ai'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = '2da20021ba5468a6bd0883fde8fb0cc9b51de723ced5dc3d08d663e8518fb28ab0c02158e9a5ac628eb383e3496010cee77db48e51c87c877ce9330ba6cc2b22';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/edupath_db');

// --- USER SCHEMA (Updated with chatHistory) ---
const User = mongoose.model('User', new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasGeneratedRoadmap: { type: Boolean, default: false },
    selectedDomain: { type: String, default: '' }, 
    roadmapData: { type: Object, default: null },
    chatHistory: { type: Array, default: [] } // Stores { role: 'user' | 'bot', text: '...' }
}));

// --- AUTHENTICATION MIDDLEWARE ---
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

// --- AUTH ROUTES ---
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

// --- ROADMAP ROUTES ---
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

// --- NETWORK RETRY HELPER (Added to fix fetch failed errors) ---
const sendWithRetry = async (chatSession, message, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await chatSession.sendMessage(message);
        } catch (error) {
            console.warn(`[Network] Gemini API fetch failed. Attempt ${i + 1} of ${retries}...`);
            if (i === retries - 1) throw error; // Throw on final failure
            await new Promise(res => setTimeout(res, 1500)); // Wait 1.5 seconds before retrying
        }
    }
};

// --- GEMINI AI CHAT ROUTES (With Database Memory) ---

// 1. Fetch Chat History on Page Load
app.get('/api/chat-history', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.send({ history: user.chatHistory || [] });
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch history" });
    }
});

// 2. Send Message and Store in DB
app.post('/api/chat', authenticateToken, async (req, res) => {
    try {
        const { userMessage } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send({ error: "User not found" });

        // --- DATA EXTRACTION (Stay True to Project State) ---
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

        // --- THE SYSTEM CONTEXT (Importing project data into AI memory) ---
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

        // --- EXECUTION ---
        const aiModel = genAI.getGenerativeModel({ 
            model: "models/gemini-2.5-flash",
            systemInstruction: systemInstruction 
        });

        const formattedHistory = user.chatHistory.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        const chatSession = aiModel.startChat({ history: formattedHistory });
        
        // Using the new robust retry mechanism to combat 'fetch failed'
        const result = await sendWithRetry(chatSession, userMessage);
        const responseText = result.response.text();

        // Save to MongoDB
        user.chatHistory.push({ role: 'user', text: userMessage });
        user.chatHistory.push({ role: 'bot', text: responseText });
        await user.save();

        res.send({ reply: responseText });

    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).send({ reply: "Architect is recalibrating. Please try again." });
    }
});
app.listen(3000, () => console.log('EduPath AI Server running on port 3000'));