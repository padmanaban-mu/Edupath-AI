# 🎓 EduPath AI — Intelligent Career Roadmap & Technical Learning Hub

> **EduPath AI** is an intelligent, personalized career navigation and learning platform designed to guide students and professionals from foundational exploration to industry-ready mastery in top technical domains.

---

## 📌 Project Overview & Core Idea

The core vision of **EduPath AI** is to demystify complex technical careers and eliminate the overwhelming confusion learners face when starting out. The platform provides an end-to-end guided experience:

1. **Explore Technical Domains**: Students explore comprehensive overviews of various high-demand technical career tracks to make well-informed career choices.
2. **AI Career Architect & Dynamic Roadmap Initialization**: Through an intelligent chatbot mediator, the platform assesses the user's current background (Beginner, Intermediate, or Advanced/Topper) and completed prerequisites, then dynamically generates and initializes a personalized, sequential visual roadmap.
3. **Comprehensive Learning Hub**: Direct access to structured courses divided into **Programming** and **Non-Programming/Fundamental** divisions, featuring curated video tutorials, topic quizzes, and interactive in-browser coding compilers.

---

## 🚀 End-to-End User Journey (5 Key Stages)

### 1️⃣ User Onboarding & Dashboard Walkthrough
* After creating an account or logging in via secure **JWT authentication**, the user lands on the **Personal Dashboard (`dashboard.html`)**.
* The dashboard features an intuitive, step-by-step walkthrough explaining how to use the platform:
  * **Step 01: Cross-Domain Explorer** — Discover industry-aligned career tracks.
  * **Step 02: Intelligence Gathering** — Chat with the AI Career Architect to assess competency.
  * **Step 03: Visual Execution** — Track real-time progress on the interactive roadmap.

### 2️⃣ Technical Domain Exploration
* Before committing to a career path, students can navigate to the **Domain Explorer (`domain.html`)** to view dedicated pages for distinct technical fields:
  * 📊 **Data Analyst** (`analyst.html`)
  * 🤖 **AI / Machine Learning Engineer** (`aintelligence.html`)
  * 🌐 **Full Stack Web Development** (`fullstack.html`)
  * 🛡️ **Cybersecurity** (`cybersecurity.html`)
  * 📱 **Mobile App Development** (`mobile.html`)
  * 🎨 **UI / UX Design** (`uidesigner.html`)
* Each domain page provides an in-depth perspective covering core competencies, standard tools, daily responsibilities, market demand, and recommended learning progressions so learners get a complete panoramic view.

### 3️⃣ AI Chatbot Mediator & Roadmap Initialization
* Once the student selects a target domain, they interact with the **AI Career Architect Chatbot (`chatbot.html`)** powered by **Google Gemini AI**.
* **Chatbot as Mediator**: The chatbot bridges the gap between student queries and the `roadmap.html` visualization script.
* **Competency & Prerequisite Gathering**:
  * The chatbot prompts the user for their background: **Complete Beginner**, **Intermediate**, or **Advanced / Topper**.
  * The user reviews an interactive checklist of prerequisite courses (split into Programming and Fundamentals).
* **Dynamic Custom Initialization**:
  * **Beginner Track**: Initializes all courses starting from Level 1, enforcing sequential prerequisites and unlocking module by module.
  * **Intermediate / Fast-Track**: Automatically marks selected completed courses to **90% completion** and unlocks downstream dependencies. To achieve 100% mastery, the student must pass the comprehensive Mock Assessment.
  * Upon typing `confirm`, the chatbot synchronizes the deep state mapping with MongoDB (`/save-roadmap`) and pushes the initialized configuration directly to `roadmap.html`.

### 4️⃣ Interactive 3-Section Roadmap Hub (`roadmap.html`)
Once initialized, `roadmap.html` renders three distinct sections:
* **Section 1: Complete Technical Domain Roadmap Visualization**:
  * An interactive milestone flow chart illustrating progress across career levels (e.g., Level 1: Data Foundations $\rightarrow$ Level 6: Advanced Modeling).
  * Shows total journey completion percentage, interconnected progress lines, status badges, and tooltip details for key topics.
* **Section 2: Programming Courses Division**:
  * Displayed as a responsive grid of square-sized course cards (e.g., Python Basics, SQL Basics & Advanced, NumPy Arrays, Pandas DataFrames, Python Viz, Regression Models).
  * Cards display course iconography, difficulty level, completion percentage, and dependency lock/unlock states.
* **Section 3: Non-Programming / Fundamentals Division**:
  * Displayed as a responsive grid of square-sized cards (e.g., Data Fundamentals, Statistics, Excel Analytics, Exploratory Data Analysis, BI Tools - PowerBI / Tableau).
* **Direct Redirection**: Clicking any unlocked course card instantly routes the learner to that course's dedicated study environment.

### 5️⃣ Study Course Content & Interactive Learning Engine
Each course is systematically broken down into topic-wise modules. Every standard module contains a complete **3-part learning triad**:
1. 🎥 **Video Explanation**: Curated, topic-specific video lessons to build conceptual understanding.
2. 📝 **Interactive Topic Quiz**: Multiple-choice assessments (MCQs) with instant evaluation to test comprehension.
3. 💻 **Hands-On Programming Playground**: For coding courses (Python, SQL, Pandas, NumPy, etc.), an integrated in-browser compiler environment (powered by Judge0 API and backend execution scripts) allows students to practice live programming tasks directly alongside the curriculum.

---

## 🏛️ Central Source of Truth: Roadmap Data Structure

The entire platform's course curriculum, levels, prerequisite mappings, and visual styling are governed by a centralized configuration in `frontend/project/js/courseData.js`:

```javascript
// File: js/courseData.js
// Central Single Source of Truth for EduPath AI

window.roadmapData = {
    dataAnalyst: {
        nonProgramming: [
            { id: "df", title: "Data Fundamentals", level: 1, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9953/9953334.png", color: "#3b82f6", keyTopics: ["Data Types", "Database Intro", "Data Cleaning basics"] },
            { id: "stats", title: "Statistics", level: 2, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", color: "#8b5cf6", keyTopics: ["Descriptive Stats", "Hypothesis Testing", "Probability Distributions"] },
            { id: "excel", title: "Excel Analytics", level: 2, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/732/732220.png", color: "#10b981", keyTopics: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Conditional Formatting"] },
            { id: "eda", title: "Exploratory DA (EDA)", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4245/4245351.png", color: "#f59e0b", keyTopics: ["Handling Missing Data", "Outlier Detection", "Correlation Matrices"] },
            { id: "bi", title: "BI Tools (PBI/Tableau)", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5956/5956597.png", color: "#ec4899", keyTopics: ["DAX Queries", "Dashboard Design", "Data Connections"] }
        ],
        programming: [
            { id: "sql_a", title: "SQL Basics and Advanced", level: 3, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png", color: "#2563eb", keyTopics: ["JOINS", "Subqueries", "Window Functions"] },
            { id: "py_b", title: "Python Basics", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", color: "#f59e0b", keyTopics: ["Loops & Functions", "OOPs Concepts", "Lists & Dictionaries"] },
            { id: "numpy", title: "NumPy Arrays", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png", color: "#ef4444", keyTopics: ["Array Slicing", "Broadcasting", "Matrix Operations"] },
            { id: "pandas", title: "Pandas DataFrames", level: 4, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/4862/4862036.png", color: "#10b981", keyTopics: ["DataFrames", "Groupby & Aggregation", "Merging Data"] },
            { id: "viz_py", title: "Python Viz", level: 5, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png", color: "#6366f1", keyTopics: ["Matplotlib Pyplot", "Seaborn Styling", "Interactive Plots"] },
            { id: "reg", title: "Regression Models", level: 6, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png", color: "#ef4444", keyTopics: ["Linear Regression", "Logistic Regression", "Model Evaluation"] }
        ],
        levels: [
            { lv: 1, name: "Data Foundations", icon: "fa-database" },
            { lv: 2, name: "Statistical Analysis", icon: "fa-chart-line" },
            { lv: 3, name: "Database & SQL", icon: "fa-server" },
            { lv: 4, name: "Python Engineering", icon: "fa-brands fa-python" },
            { lv: 5, name: "Visual Analytics", icon: "fa-pie-chart" },
            { lv: 6, name: "Advanced Modeling", icon: "fa-brain" }
        ]
    },
    aiml: {
        nonProgramming: [
            { id: "math_la", title: "Linear Algebra", level: 1, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/3721/3721619.png", color: "#3b82f6", keyTopics: ["Vectors", "Matrices", "Eigenvalues"] },
            { id: "calc_mv", title: "Multivariable Calculus", level: 1, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png", color: "#8b5cf6", keyTopics: ["Partial Derivatives", "Gradients", "Chain Rule"] },
            { id: "prob_inf", title: "Probability & Inference", level: 2, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1611/1611179.png", color: "#10b981", keyTopics: ["Bayes Theorem", "Random Variables", "Distributions"] },
            { id: "opt_algo", title: "Optimization Theory", level: 3, prereq: ["calc_mv"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2540/2540832.png", color: "#f59e0b", keyTopics: ["Gradient Descent", "Convex Optimization", "Loss Functions"] },
            { id: "ethics_ai", title: "AI Ethics & Bias", level: 6, prereq: [], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/1162/1162456.png", color: "#ec4899", keyTopics: ["Algorithmic Bias", "Data Privacy", "Explainable AI"] }
        ],
        programming: [
            { id: "skl_ml", title: "Scikit-Learn ML", level: 3, prereq: ["math_la"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103507.png", color: "#2563eb", keyTopics: ["Classification", "Clustering", "Cross Validation"] },
            { id: "dl_nn", title: "Neural Networks", level: 4, prereq: ["skl_ml"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2103/2103831.png", color: "#f59e0b", keyTopics: ["Backpropagation", "Activation Functions", "Epochs"] },
            { id: "tf_torch", title: "PyTorch/TF", level: 4, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", color: "#ef4444", keyTopics: ["Tensors", "Building Models", "Training Loops"] },
            { id: "nlp_proc", title: "NLP & Transformers", level: 5, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png", color: "#10b981", keyTopics: ["Tokenization", "Word Embeddings", "Attention Mechanism"] },
            { id: "cv_vision", title: "Computer Vision", level: 5, prereq: ["dl_nn"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/2892/2892305.png", color: "#6366f1", keyTopics: ["CNNs", "Image Preprocessing", "Object Detection"] },
            { id: "mlo_ops", title: "MLOps Deployment", level: 6, prereq: ["tf_torch"], progress: 0, img: "https://cdn-icons-png.flaticon.com/512/9135/9135965.png", color: "#ef4444", keyTopics: ["Docker", "Model Monitoring", "API Endpoints"] }
        ],
        levels: [
            { lv: 1, name: "Math Foundations", icon: "fa-square-root-variable" },
            { lv: 2, name: "Statistical Theory", icon: "fa-chart-area" },
            { lv: 3, name: "Classical ML", icon: "fa-microchip" },
            { lv: 4, name: "Deep Learning", icon: "fa-network-wired" },
            { lv: 5, name: "Applied AI", icon: "fa-eye" },
            { lv: 6, name: "Ethics & Ops", icon: "fa-gears" }
        ]
    }
};
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Flexbox & Grid layouts, Custom Variables), JavaScript (Vanilla ES6+), FontAwesome Icons, Marked.js |
| **Backend API** | Node.js, Express.js, Body-Parser, CORS, Morgan |
| **Database & Auth** | MongoDB, Mongoose ODM, JSON Web Tokens (JWT), Bcrypt.js |
| **AI Integration** | Google Generative AI SDK (`@google/generative-ai` — Gemini Models) |
| **Code Execution & Compilers** | RapidAPI Judge0 API, Python Flask microservice, `sql.js` (WebAssembly SQLite), Node.js `child_process` runner |

---

## 📂 Project Structure

```text
EdupathAI/
├── .env                                # Environment variables (API keys, DB URI, JWT secret)
├── .gitignore                          # Git ignore configuration
├── package.json                        # Node.js dependencies & scripts
├── requirements.txt                    # Python dependencies for compiler microservices
├── server.js                           # Express server, MongoDB models, auth & AI API routes
├── compiler_scripts/                   # Backend scripts supporting live code execution
│   ├── data_viz/
│   ├── excel/
│   ├── numpy/
│   ├── pandas/
│   ├── python/
│   ├── regression/
│   └── sql/
├── course_data/                        # Static question banks, exercise datasets, and test cases
└── frontend/
    └── project/
        ├── index.html                  # Landing page
        ├── login.html                  # User login
        ├── signup.html                 # User registration
        ├── dashboard.html              # Main dashboard with step-by-step user guide
        ├── domain.html                 # Technical domain explorer portal
        ├── chatbot.html                # AI Career Architect for background assessment & roadmap sync
        ├── roadmap.html                # 3-section interactive career roadmap
        ├── review.html                 # Progress review and metrics
        ├── profile.html                # User profile and account management
        ├── compiler/                   # In-browser web compiler pages
        │   ├── comp_numpy.html
        │   ├── dataviz_comp.html
        │   ├── excel_compiler.html
        │   ├── pandas_compiler.html
        │   ├── python_compiler.html
        │   ├── regression_compiler.html
        │   └── sql_compiler.html
        ├── courses/                    # Interactive courseware
        │   ├── programming/            # Python, SQL, NumPy, Pandas, Data Viz, Regression
        │   └── non-programming/        # Data Fundamentals, Statistics, Excel, EDA, BI Tools
        ├── domains/                    # Domain overview pages (AI/ML, Data Analyst, Web, Cyber, etc.)
        ├── css/                        # Core stylesheets
        └── js/                         # Frontend logic (courseData.js, dashboard.js)
```

---

## ⚙️ Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [Python](https://www.python.org/) (v3.9 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
* Google Gemini API Key (from Google AI Studio)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/EdupathAI.git
cd EdupathAI
```

### Step 2: Install Dependencies
Install Node.js packages:
```bash
npm install
```

Install Python requirements (for compiler and data analysis scripts):
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key

# RapidAPI / Judge0 (Optional for extended compiler features)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### Step 4: Run the Application
Start the Node.js server:
```bash
npm start
```
The application will be accessible at: `http://localhost:5000` (or the configured `PORT`).

---

## ⚠️ Current Limitations

While EduPath AI delivers a functional, end-to-end learning workflow, several technical and architectural limitations currently exist:

1. **Course Content Depth Across Domains**:
   * Fully realized, multi-module interactive courses with video, quiz, and compiler integrations are currently operational for the **Data Analyst** track (with the **AI/ML** track architected). Other domains (Cybersecurity, Fullstack, Mobile, UI/UX) currently provide extensive domain exploration overviews rather than complete deep-dive interactive curricula.
2. **Compiler Sandboxing & Scalability**:
   * Code execution currently leverages a combination of client-side/Judge0 API and local Node.js child processes. While effective for learning exercises, high-concurrency production deployments require containerized sandboxing (e.g., Docker/gVisor micro-containers) to enforce strict memory and CPU throttling.
3. **External Video Embed Dependency**:
   * Module video explanations rely on external streaming providers (YouTube). Changes in external video availability or playback restrictions can impact the video viewing experience.
4. **Static Question Banks**:
   * Topic quizzes and assessments utilize curated question banks. While comprehensive, questions do not dynamically adapt in real-time to each student's specific error patterns.
5. **Single-Track Active Roadmap**:
   * Users currently initialize and actively track one primary domain roadmap at a time. Switching domains requires re-initialization rather than maintaining concurrent dual-track progress.

---

## 🔮 Future Enhancements

The following features and improvements are planned for upcoming iterations of EduPath AI:

* 🧠 **Adaptive AI-Generated Assessments**:
  * Utilize LLMs to generate dynamic, on-the-fly quizzes and coding challenges that target the learner's specific historical weak spots rather than static MCQ sets.
* 🌐 **Full Curriculum Expansion for All Domains**:
  * Build complete module tracks, interactive compilers, and exercises for Fullstack Web Development, Cloud DevOps, and Cybersecurity.
* 🐳 **Cloud-Native Containerized Code Sandbox**:
  * Migrate code execution to an isolated, secure Docker microservice architecture supporting multiple programming languages (C++, Java, Go, Rust) with strict resource isolation.
* 🏆 **Gamification & Community Peer Learning**:
  * Implement experience points (XP), streak multipliers, achievement badges, global leaderboards, and collaborative discussion forums for each module.
* 📜 **Automated Verifiable Certification & Portfolio Generator**:
  * Issue verifiable digital completion certificates and automatically package completed coding assignments into a portfolio-ready GitHub showcase project.
* 🎙️ **Voice-Enabled Multimodal AI Mentor**:
  * Integrate real-time voice and multimodal dialogue into the AI Chatbot to conduct interactive mock technical interviews.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
