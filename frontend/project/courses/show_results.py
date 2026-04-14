data = open(r'c:\Users\FD0021TU\OneDrive\Desktop\sem 4 proje\courses\audit_results.txt', encoding='utf-8', errors='replace').read()
idx = data.find('=== ')
lines = data[idx:].split('\n')
for line in lines:
    line = line.strip()
    if line:
        print(line)
