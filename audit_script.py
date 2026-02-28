import os
import re
import json

src_dir = r"c:\Users\rober\AI Projects\Sikumnik\web\src"
files = []

for root, dirs, filenames in os.walk(src_dir):
    for f in filenames:
        if f.endswith('.ts') or f.endswith('.tsx'):
            files.append(os.path.join(root, f))

# Build dependency map
dependents = {f: [] for f in files}

def get_import_path(base_file, import_str):
    if import_str.startswith('@/'): # alias for web/src
        return os.path.join(src_dir, import_str[2:])
    elif import_str.startswith('.'):
        return os.path.normpath(os.path.join(os.path.dirname(base_file), import_str))
    return None

def resolve_file(base_path):
    if os.path.isfile(base_path + '.ts'): return base_path + '.ts'
    if os.path.isfile(base_path + '.tsx'): return base_path + '.tsx'
    if os.path.isdir(base_path):
        if os.path.isfile(os.path.join(base_path, 'index.ts')): return os.path.join(base_path, 'index.ts')
        if os.path.isfile(os.path.join(base_path, 'index.tsx')): return os.path.join(base_path, 'index.tsx')
    return base_path

import_regex = re.compile(r'(?:import|export)\s+.*?\s+from\s+[\'"]([^\'"]+)[\'"]')
dynamic_import_regex = re.compile(r'await\s+import\([\'"]([^\'"]+)[\'"]\)')

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file_obj:
            content = file_obj.read()
            imports = import_regex.findall(content) + dynamic_import_regex.findall(content)
            for imp in imports:
                target_base = get_import_path(f, imp)
                if target_base:
                    target = resolve_file(target_base)
                    # We try to match with the known files
                    for k in dependents.keys():
                        k_no_ext = k.rsplit('.', 1)[0]
                        if target.lower() == k.lower() or target.lower() == k_no_ext.lower() or target.lower() == os.path.join(k_no_ext.lower(), 'index'):
                            dependents[k].append(f)
                            break
    except Exception as e:
        pass

output = []
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file_obj:
            content = file_obj.read()
            # Try to grab the class/function names and some keywords to help the LLM summarize
            lines = content.split('\n')
            imports_stripped = [l for l in lines if not l.startswith('import')]
            snippet = '\n'.join(imports_stripped[:15]).strip()
            if not snippet:
                snippet = '\n'.join(lines[:15]).strip()
    except Exception as e:
        snippet = ""
        
    rel_path = os.path.relpath(f, src_dir).replace('\\', '/')
    deps = list(set([os.path.relpath(d, src_dir).replace('\\', '/') for d in dependents[f]]))
    
    # Simple heuristic for what it does
    output.append(f"### File: {rel_path}")
    output.append(f"Dependents: {', '.join(deps) if deps else 'None'}")
    output.append(f"Snippet:\n{snippet[:500]}\n")

with open('audit_output.txt', 'w', encoding='utf-8') as out:
    out.write('\n'.join(output))

print(f"Generated audit for {len(files)} files.")
