# EduPath AI

EduPath AI is a career-roadmap and learning platform. A learner can explore technical domains, choose a path, and use the roadmap to work through topics in a suggested order. The project combines a Gemini-powered assistant with course pages, quizzes, progress tracking, and coding practice.

## What is implemented

- **Domain exploration:** pages introduce Data Analytics, AI/ML, Full-Stack Development, Cybersecurity, Mobile Development, and UI/UX.
- **Roadmap setup:** the AI Career Architect asks about a learner's background and completed prerequisites before setting up a roadmap.
- **Progress tracking:** courses are grouped into levels, with prerequisite and completion states shown in the roadmap.
- **Course practice:** available course areas include topic material, quizzes, and browser-based coding exercises.
- **Account support:** registration and login use MongoDB-backed user data and JWT authentication.

The Data Analyst track has the most complete course experience. The repository also contains an AI/ML roadmap; several other domain pages are currently introductions rather than full interactive curricula.

## How the pieces fit together

The Express application serves the frontend from `frontend/project` and exposes the backend routes. MongoDB stores user and roadmap information. The chatbot uses the Google Generative AI SDK, with course and roadmap context supplied by the server. Course exercises are supported by the scripts under `compiler_scripts`; the project also uses `sql.js` for local SQL execution and has a Judge0 integration.

## Built with

| Part | Technologies |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Server | Node.js, Express |
| Data and authentication | MongoDB, Mongoose, JSON Web Tokens, bcryptjs |
| AI assistant | Google Generative AI SDK (Gemini) |
| Coding practice | Judge0, sql.js, Python scripts and Flask |
| Other libraries | Axios, Morgan, CORS |

## Project structure

```text
.
├── server.js
├── package.json
├── requirements.txt
├── course_data/
├── compiler_scripts/
│   ├── data_viz/
│   ├── excel/
│   ├── numpy/
│   ├── pandas/
│   ├── python/
│   ├── regression/
│   └── sql/
└── frontend/
    └── project/
        ├── index.html
        ├── login.html
        ├── signup.html
        ├── dashboard.html
        ├── domain.html
        ├── chatbot.html
        ├── roadmap.html
        ├── courses/
        ├── compiler/
        ├── css/
        └── js/
```

## Run locally

### Requirements

- Node.js and npm
- Python 3.9 or later
- MongoDB (local or Atlas)
- A Google Gemini API key for the chatbot

### Install dependencies

```bash
git clone https://github.com/padmanaban-mu/Edupath-AI.git
cd Edupath-AI
npm install
pip install -r requirements.txt
```

### Configure environment

Create a `.env` file in the repository root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/edupath_db
GEMINI_API_KEY=your_gemini_api_key

# Optional Judge0 configuration
JUDGE0_URL=https://ce.judge0.com
JUDGE0_API_KEY=
JUDGE0_HOST=
JUDGE0_LANGUAGE_ID=71
```

The server falls back to a local MongoDB database and port 3000 when those settings are not supplied. Use your own MongoDB connection string and API credentials where required.

### Start the application

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000), unless you configured a different `PORT`.

## Things to know before deployment

- The Data Analyst track is the most developed. Other domain pages should not be mistaken for complete course tracks.
- Course videos rely on external video providers, and quiz questions come from curated question banks.
- Code execution must be isolated before accepting untrusted users. A production deployment needs a hardened sandbox with CPU, memory, time, and network limits.
- The current server code defines the JWT signing secret directly in `server.js`. Move it to a private environment variable and rotate it before deploying; do not reuse a committed secret.
- Keep API keys and database credentials out of Git. Do not commit your local `.env` file.

## Possible next steps

- Finish the interactive curricula for the remaining domains.
- Make assessments adapt to learner performance.
- Run coding exercises in isolated containers.
- Support progress across more than one active roadmap.

## License

No `LICENSE` file is currently present in the repository. Add one if you intend to specify how others may use, modify, or distribute this project.
