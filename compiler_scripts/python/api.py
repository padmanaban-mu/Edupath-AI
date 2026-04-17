import os
import time
import base64
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

# Load Judge0 credentials from .env
load_dotenv()
JUDGE0_API_KEY = os.getenv('JUDGE0_API_KEY')
JUDGE0_API_HOST = os.getenv('JUDGE0_API_HOST', 'judge0-ce.p.rapidapi.com')
JUDGE0_API_URL = os.getenv('JUDGE0_API_URL', 'https://judge0-ce.p.rapidapi.com')

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

MODULES_DIR = os.path.join(os.path.dirname(__file__), 'modules')

# Descriptive names for modules
MODULE_NAMES = {
    'module1': 'Introduction to Python',
    'module2': 'Variables and Data Types',
    'module3': 'Python Operators',
    'module4': 'Conditional Statements',
    'module5': 'Loops – while loop',
    'module6': 'Loops – for loop',
    'module7': 'Data Structures (Lists & Tuples)',
    'module8': 'Advanced Data Structures (Dictionaries & Sets)',
    'module9': 'Methods and Functions in Python',
    'module10': 'File Handling',
    'module11': 'Exception Handling',
    'module12': 'OOPs concept'
}

# ─── Utility Functions ───────────────────────────────────────────

def decode_b64(val):
    if not val:
        return ""
    try:
        return base64.b64decode(val).decode('utf-8')
    except Exception:
        return ""

def encode_b64(val):
    if not val:
        return ""
    return base64.b64encode(val.encode('utf-8')).decode('utf-8')

# ─── API Routes ───────────────────────────────────────────────────

@app.route('/api/modules', methods=['GET'])
def get_modules():
    try:
        modules = []
        # Replicating existing node logic to sort modules
        folders = [f for f in os.listdir(MODULES_DIR) if os.path.isdir(os.path.join(MODULES_DIR, f))]
        folders.sort(key=lambda x: int(x.replace('module', '')))

        for folder in folders:
            module_path = os.path.join(MODULES_DIR, folder)
            questions = []
            q_files = [f for f in os.listdir(module_path) if f.endswith('.json')]
            q_files.sort(key=lambda x: int(x.replace('q', '').replace('.json', '')))

            for f in q_files:
                with open(os.path.join(module_path, f), 'r', encoding='utf-8-sig') as file:
                    data = json.load(file)
                    questions.append({
                        "id": data.get('id', f.replace('.json', '')),
                        "title": data.get('title'),
                        "difficulty": data.get('difficulty', 'Basic')
                    })
            
            modules.append({
                "id": folder,
                "name": MODULE_NAMES.get(folder, folder),
                "questions": questions
            })
        
        return jsonify({"modules": modules})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/modules/<module_id>/questions/<question_id>', methods=['GET'])
def get_question(module_id, question_id):
    try:
        file_path = os.path.join(MODULES_DIR, module_id, f"{question_id}.json")
        if not os.path.exists(file_path):
            return jsonify({"error": "Question not found"}), 404
        
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/run', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code', '')
    stdin = data.get('input', '')

    if not JUDGE0_API_KEY or JUDGE0_API_KEY == 'YOUR_RAPIDAPI_KEY_HERE':
        return jsonify({
            "status": "error",
            "error": "Judge0 API key not configured in .env",
            "execution_status": "FAIL"
        }), 400

    headers = {
        "x-rapidapi-key": JUDGE0_API_KEY,
        "x-rapidapi-host": JUDGE0_API_HOST,
        "Content-Type": "application/json"
    }

    # 1. Submit Code
    submit_payload = {
        "language_id": 71,  # Python 3
        "source_code": encode_b64(code),
        "stdin": encode_b64(stdin),
        "base64_encoded": True
    }

    try:
        sub_res = requests.post(
            f"{JUDGE0_API_URL}/submissions",
            json=submit_payload,
            params={"base64_encoded": "true"},
            headers=headers
        )
        token = sub_res.json().get('token')

        if not token:
            return jsonify({"status": "error", "error": "Failed to get submission token", "execution_status": "FAIL"}), 500

        # 2. Polling Logic
        while True:
            poll_res = requests.get(
                f"{JUDGE0_API_URL}/submissions/{token}",
                params={"base64_encoded": "true"},
                headers=headers
            )
            result = poll_res.json()
            status = result.get('status', {}).get('description')

            if status not in ["In Queue", "Processing"]:
                break
            
            time.sleep(1)

        # 3. Parse Result
        stdout = decode_b64(result.get('stdout'))
        stderr = decode_b64(result.get('stderr'))
        compile_output = decode_b64(result.get('compile_output'))
        
        execution_status = "SUCCESS"
        output_to_show = stdout
        error_to_show = ""

        if compile_output:
            execution_status = "FAIL"
            error_to_show = compile_output
        elif stderr:
            execution_status = "FAIL"
            error_to_show = stderr

        return jsonify({
            "status": "success",
            "output": output_to_show,
            "error": error_to_show,
            "execution_status": execution_status
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "execution_status": "FAIL"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
