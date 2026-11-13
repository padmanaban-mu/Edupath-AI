# EduPath AI — Career Roadmaps & Interactive Learning

EduPath AI is a learning platform concept that helps students explore technical career paths, build a structured learning roadmap, and practise selected topics through lessons, quizzes, and coding environments.

## What it does

- **Explore career domains:** overview pages for Data Analytics, AI/ML, Full-Stack Development, Cybersecurity, Mobile Development, and UI/UX.
- **Personalise a roadmap:** a Gemini-powered career assistant gathers a learner's background and selected prerequisites, then initialises a roadmap.
- **Track learning progress:** roadmap views organise topics into levels and show prerequisite and completion states.
- **Learn by doing:** supported course areas combine curated video material, topic quizzes, and browser-based coding exercises.

The repository documents two more developed learning tracks: **Data Analyst** and **AI/ML Engineer**. Other domain pages are primarily exploratory overviews rather than complete course curricula.

## Main user journey

1. Register or sign in.
2. Explore technical domains and choose a target.
3. Discuss current experience and prerequisites with the AI Career Architect.
4. Initialise and review the learning roadmap.
5. Open available courses to study topics, attempt quizzes, and practise in the relevant coding environment.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database & authentication | MongoDB, Mongoose, JWT, bcryptjs |
| AI integration | Google Generative AI SDK (Gemini) |
| Learning tools | Judge0 integration, sql.js, Python helper services |

## Repository layout

```text
.
├── server.js
├── package.json
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

### Prerequisites

- Node.js and npm
- Python 3.9+
- A MongoDB instance or Atlas connection
- A Google Gemini API key
- Judge0 credentials if using the hosted code-execution integration

### Setup

```bash
git clone https://github.com/padmanaban-mu/Edupath-AI.git
cd Edupath-AI
npm install
pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

Start the server:

```bash
npm start
```

Open the local URL printed by the server (the default port is 5000).

## Current scope and limitations

- The Data Analyst learning track is the most developed course experience; AI/ML is architected, while several other domains currently provide overviews rather than full interactive curricula.
- Course videos depend on external providers.
- Quiz content is based on curated question banks; adaptive assessment is a future enhancement.
- The code-execution components need strong isolation, resource limits, and abuse protection before being exposed to untrusted users at production scale.
- The project currently focuses on one active roadmap at a time.

## Security notes

Never commit `.env` files, API keys, database credentials, or JWT secrets. Treat any code-execution endpoint as untrusted input: production use requires a hardened sandbox and strict CPU, memory, time, and network limits.

## Future improvements

- Expand complete curricula across all domains.
- Add adaptive assessments based on learner performance.
- Isolate code execution in containerised sandboxes.
- Support multiple active roadmaps and richer progress analytics.

## License

No license file was identified during this documentation update. Check the repository's licensing before reusing or distributing the code.
