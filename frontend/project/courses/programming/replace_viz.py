import re

# New video IDs gathered via search
new_vids = [
    "5Zg-C8AAIGg", # Fallback, will replace manually if needed, wait, let's use the ones I just scraped.
    "OkmNXy7er84", # 1. data viz explained
    "8ndTGIKFFdU", # 2. matplotlib
    "6GUZXDef2U0", # 3. seaborn
    "G1-r_c-A0yA", # 4. plotly
    "2TR_6VaVp1E", # 5. bokeh (Wait, I need the actual scraped ones. I'll pass them in directly) 
]

# Let's read the exact output I got.
with open(r"c:\Users\FD0021TU\OneDrive\Desktop\sem 4 proje\courses\programming\data_viz_replacements.txt", "r", encoding="utf-16le") as f:
    lines = f.readlines()

replacements = []
for line in lines:
    if "->" in line:
        vid_id = line.split("->")[1].strip()
        replacements.append(vid_id)

if len(replacements) == 8:
    html_path = r"c:\Users\FD0021TU\OneDrive\Desktop\sem 4 proje\courses\programming\data_visualization.html"
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Find all iframes with youtube embed
    
    def replacer(match):
        replacer.counter += 1
        idx = replacer.counter - 1
        if idx < len(replacements):
            return f'src="https://www.youtube.com/embed/{replacements[idx]}?enablejsapi=1"'
        return match.group(0)
    
    replacer.counter = 0
    
    new_html = re.sub(r'src="https://www.youtube.com/embed/[a-zA-Z0-9_-]+\?enablejsapi=1"', replacer, html)
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("Successfully replaced 8 videos in data_visualization.html")
else:
    print(f"Error: expected 8 replacements, got {len(replacements)}")
    print(replacements)
