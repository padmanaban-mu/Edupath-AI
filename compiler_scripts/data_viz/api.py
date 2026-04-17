import ast
import os
import tempfile
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def safe_str(value):
    return '' if value is None else str(value)


def run_user_code(code, stdin):
    temp_file = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as tmp:
            temp_file = tmp.name
            tmp.write(code)

        completed = subprocess.run(
            ['python', temp_file],
            input=safe_str(stdin),
            capture_output=True,
            text=True,
            timeout=5,
            cwd=os.path.dirname(temp_file)
        )

        return completed.stdout or '', completed.stderr or ''
    except subprocess.TimeoutExpired:
        return '', 'Execution timed out after 5 seconds'
    except Exception as exc:
        return '', str(exc)
    finally:
        if temp_file and os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except Exception:
                pass


def parse_output_length(output):
    text = safe_str(output).strip()
    if not text:
        return 0
    try:
        value = ast.literal_eval(text)
        return len(value)
    except Exception:
        return len(text)


def validate_test_case(output, test_case):
    normalized_output = safe_str(output).strip()
    checks = []

    if 'expected' in test_case:
        checks.append(normalized_output == safe_str(test_case.get('expected', '')).strip())

    if 'expected_contains' in test_case:
        checks.append(safe_str(test_case.get('expected_contains', '')) in normalized_output)

    if 'expected_length' in test_case:
        expected_length = test_case.get('expected_length')
        checks.append(parse_output_length(normalized_output) == expected_length)

    return all(checks)


@app.route('/run', methods=['POST'])
def run_code():
    if not request.is_json:
        return jsonify({'success': False, 'results': [], 'error': 'Invalid JSON payload'}), 400

    payload = request.get_json()
    code = safe_str(payload.get('code', ''))
    test_cases = payload.get('test_cases', [])

    if not isinstance(test_cases, list):
        return jsonify({'success': False, 'results': [], 'error': 'test_cases must be a list'}), 400

    results = []
    all_passed = True

    for test_case in test_cases:
        if not isinstance(test_case, dict):
            results.append({'input': '', 'output': '', 'passed': False, 'error': 'Invalid test case'})
            all_passed = False
            continue

        stdin = safe_str(test_case.get('input', ''))
        output, error = run_user_code(code, stdin)
        passed = False

        if error:
            passed = False
        else:
            passed = validate_test_case(output, test_case)

        if not passed:
            all_passed = False

        result_entry = {
            'input': stdin,
            'output': safe_str(output).strip(),
            'passed': passed
        }
        if error:
            result_entry['error'] = error

        results.append(result_entry)

    return jsonify({'success': all_passed, 'results': results})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
