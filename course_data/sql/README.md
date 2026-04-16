# EduPath SQL Compiler (Judge0 + Frontend)

## Setup

1. Go to `backend`
2. Install dependencies:
   - `npm install`
3. Copy env file:
   - `copy .env.example .env`
4. Add your Judge0 key in `.env`
5. Start server:
   - `npm run dev`
6. Open:
   - `http://localhost:5173`

## API

- `GET /api/modules`  
  Lists all modules and question IDs from `modules/`.

- `GET /api/question?module=module1&q=q1`  
  Returns question metadata.

- `POST /api/compile-sql`
  ```json
  {
    "module": "module1",
    "q": "q1",
    "sql": "SELECT * FROM Employees;"
  }
  ```

### Compile Response

Returns:
- `status`: `success` or `error`
- `isCorrect`: final boolean
- `summary`: test totals
- `results`: per-test pass/fail (hidden tests do not expose expected/actual output)

## Frontend

- `public/index.html` contains the quiz layout similar to your screenshot.
- `public/app.js` handles module navigation, SQL editor, and compile calls.
- `public/styles.css` styles the two-pane question + quiz navigation UI.

## Module Structure

- `modules/module1` ... `modules/module8`
- each module contains `q1.json`, `q2.json`, `q3.json`
