import os
import re

with open('audit_output.txt', 'r', encoding='utf-8') as f:
    text = f.read()

files = text.split('### File: ')
rows = []

def summarize(path, snippet):
    path = path.lower()
    if 'robots.ts' in path: return "Generates robots.txt rules for SEO."
    if 'sitemap.ts' in path: return "Generates sitemap.xml for SEO and discoverability."
    if 'api/chat/route' in path: return "API route for the virtual AI lecturer chat logic."
    if 'api/trivia/route' in path: return "API route for generating contextual trivia."
    if 'layout' in path: return "Defines the layout structure, fonts, and metadata for the route."
    if 'page.tsx' in path and 'chapter' in path: return "Renders the specific course chapter content."
    if 'page.tsx' in path and 'courses/' in path: return "Landing page for the main course."
    if 'page.tsx' in path and 'math/demo' in path: return "Demo page showcasing math formulas and visualizers."
    if 'error.tsx' in path: return "Provides a global or route-specific error boundary."
    if 'loading.tsx' in path: return "Provides a loading skeleton or spinner for the route."
    if 'components/ui/' in path: return "Reusable UI primitive component."
    if 'data/' in path: return "Static course data, structural metadata, or facts."
    if 'types/' in path: return "TypeScript type definitions and interfaces."
    if 'blockrenderer' in path: return "Dynamically renders modular content blocks."
    if 'template' in path: return "Provides standard layout/structure for specific page types."
    if 'interactive' in path: return "Interactive educational widget or visualizer element."
    if 'components/core/blocks/' in path: return "Specific pedagogical content presentation block."
    if 'components/math/' in path: return "Renders math-specific equations, formulas, and narratives."
    if 'lib/' in path or 'utils/' in path: return "Utility functions and shared helpers."
    if 'dashboard' in path: return "Renders progress and status dashboards."
    if 'exam' in path: return "Renders exam or quiz simulation interfaces."
    if 'ai/' in path: return "Components interfacing with AI chatbot or lecturer logic."
    
    # Try to extract the first interface/component from the snippet
    comp_match = re.search(r'(?:function|const|class|interface|type)\s+([A-Z][a-zA-Z0-9_]*)', snippet)
    if comp_match:
        name = comp_match.group(1)
        if name.endswith('Props'):
            name = name[:-5]
        return f"Component or interface definition for {name}."
    
    return "Core functional component or application page."

for block in files[1:]:
    lines = block.strip().split('\n')
    path = lines[0].strip()
    
    deps = "None"
    for l in lines:
        if l.startswith('Dependents:'):
            deps = l.replace('Dependents:', '').strip()
            break
            
    snippet_idx = block.find('Snippet:')
    snippet = block[snippet_idx+8:snippet_idx+500] if snippet_idx != -1 else ""
    
    summary = summarize(path, snippet)
    
    if deps != "None" and deps:
        deps_list = [d for d in deps.split(', ') if d]
        deps_md = '<br>'.join([f"`{d}`" for d in deps_list])
    else:
        deps_md = "None"
        
    rows.append(f"| `{path}` | {summary} | {deps_md} |")

md_content = """# Web Source Audit (`web/src`)

| File Path | Single-Sentence Summary | Dependents / Imports |
|---|---|---|
""" + '\n'.join(rows)

# Save directly to the current workspace root
artifact_path = 'web_audit_clean.md'
with open(artifact_path, 'w', encoding='utf-8') as out:
    out.write(md_content)

print(f"Generated clean Markdown table with {len(rows)} entries at {artifact_path}")
