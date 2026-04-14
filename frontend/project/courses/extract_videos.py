import os
import re
import json

def extract_video_ids(directory):
    video_data = []
    # Regex for youtube embed links
    pattern = re.compile(r'https://www\.youtube\.com/embed/([a-zA-Z0-9_-]{11})')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = pattern.findall(content)
                    for match in matches:
                        video_data.append({
                            "course": os.path.basename(file),
                            "path": file_path,
                            "video_id": match
                        })
    return video_data

if __name__ == "__main__":
    courses_dir = r"c:\Users\FD0021TU\OneDrive\Desktop\sem 4 proje\courses"
    data = extract_video_ids(courses_dir)
    print(json.dumps(data, indent=2))
