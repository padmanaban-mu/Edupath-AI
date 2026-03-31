const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_super_secret_key';

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/edupath_db');

// --- UPDATED USER SCHEMA ---
// Includes tracking for roadmap generation and the currently active domain
const User = mongoose.model('User', new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasGeneratedRoadmap: { type: Boolean, default: false },
    selectedDomain: { type: String, default: 'dataAnalyst' }, // Tracks if user is in 'aiml' or 'dataAnalyst'
    roadmapData: { type: Object, default: null } // Stores the full JSON progress object
}));

// --- AUTHENTICATION MIDDLEWARE ---
// Helper to verify JWT and extract userId for protected routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send({ error: "Invalid or expired token" });
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
        res.send({ 
            message: "Success", 
            token: token, 
            username: user.username 
        });
    } else {
        res.status(401).send({ error: "Invalid Credentials" });
    }
});

// --- ROADMAP ROUTES ---

// GET: Fetch the user's current roadmap and domain preference
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

// POST: Save or update the full roadmap (Called by chatbot and progress clicks)
// Inside server.js
// Example Express Route
// server.js
app.post('/save-roadmap', authenticateToken, async (req, res) => {
    try {
        // Change req.user.id to req.userId
        await User.findByIdAndUpdate(
            req.userId, 
            { 
                $set: { 
                    roadmapData: req.body.roadmapData,
                    selectedDomain: req.body.selectedDomain,
                    hasGeneratedRoadmap: true 
                } 
            }
        );
        res.sendStatus(200);
    } catch (err) {
        console.error("Database Save Error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
// POST: Explicitly switch the user's track (Called by switch buttons in roadmap.html)
app.post("/update-domain", authenticateToken, async (req, res) => {
    try {
        const { selectedDomain } = req.body;
        await User.findByIdAndUpdate(req.userId, { selectedDomain });
        res.send({ message: `Track switched to ${selectedDomain}` });
    } catch (err) {
        res.status(500).send({ error: "Failed to update domain preference" });
    }
});

// --- PROFILE ROUTES ---

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

app.listen(3000, () => console.log('EduPath AI Server running on port 3000'));