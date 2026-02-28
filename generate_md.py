import os
import re

appDataDir = r"C:\Users\rober\.gemini\antigravity\brain\6c9b1fec-d20a-43b6-ab56-b97677de7b2d"
os.makedirs(appDataDir, exist_ok=True)

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
    if 'page.tsx' in path and 'chapter' in path: return "Renders the specific course chapter content using ChapterTemplate."
    if 'page.tsx' in path and 'courses/' in path: return "Landing page for the main course."
    if 'error.tsx' in path: return "Provides a global or route-specific error boundary."
    if 'loading.tsx' in path: return "Provides a loading skeleton or spinner for the route."
    if 'components/ui/' in path: return "Reusable UI primitive component."
    if 'data/' in path: return "Static course data, structural metadata, or facts."
    if 'types/' in path: return "TypeScript type definitions and schemas."
    if 'blockrenderer' in path: return "Dynamically renders different types of modular content blocks."
    if 'template' in path: return "Provides standard layout/structure for specific page types."
    if 'interactive/accounting/' in path or 'interactive/accounting' in path: return "Accounting-specific interactive educational widget."
    if 'interactive' in path: return "Interactive widget or visualizer element used in lessons."
    if 'components/core/blocks/' in path: return "Specific pedagogical content presentation block."
    if 'components/math/' in path: return "Renders math-specific equations, formulas, and narratives."
    if 'lib/' in path or 'utils/' in path: return "Utility functions and shared helpers."
    if 'dashboard' in path: return "Renders progress and status dashboards."
    if 'exam' in path: return "Renders exam or quiz simulation interfaces."
    if 'ai/' in path: return "Components interfacing with AI chatbot or lecturer logic."
    return "Core functional component or application page."

for block in files[1:]:
    lines = block.strip().split('\n')
    path = lines[0].strip()
    
    try:
        deps_line = next(l for l in lines if l.startswith('Dependents:'))
        deps = deps_line.replace('Dependents:', '').strip()
    except:
        deps = "None"
        
    snippet_idx = block.find('Snippet:')
    snippet = block[snippet_idx+8:snippet_idx+500] if snippet_idx != -1 else ""
    
    summary = summarize(path, snippet)
    
    # Format deps to backticks
    if deps != "None":
        deps_list = deps.split(', ')
        deps_md = ', '.join([f"`{d}`" for d in deps_list if d])
    else:
        deps_md = "None"
        
    rows.append(f"| `{path}` | {summary} | {deps_md} |")

md_content = """# Web Source Audit (`web/src`)

| File Path | Single-Sentence Summary | Dependents / Imports |
|---|---|---|
""" + '\n'.join(rows)

artifact_path = os.path.join(appDataDir, 'web_src_audit.md')
with open(artifact_path, 'w', encoding='utf-8') as out:
    out.write(md_content)

print(f"Generated Markdown table with {len(rows)} entries at {artifact_path}")
