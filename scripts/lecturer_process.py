import os
import json
import re

# Simple Lecturer Script to mock the skill for now
# Ideally this would use an LLM, but for this "Refactor" phase in the pipeline,
# We will construct a basic JSON skeleton from the Librarian output.
# The user can then "Review" it or fine tune it.

def parse_librarian_output(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Very basic parsing
    title_match = re.search(r'# (.*)', content)
    title = title_match.group(1) if title_match else "Chapter 2"
    
    return {
        "title": title,
        "content": content
    }

def generate_chapter_json(data, output_path):
    chapter_data = {
        "id": "micro-ch2-metrics",
        "course": "מיקרו-כלכלה",
        "chapterNumber": 2,
        "totalChapters": 12,
        "title": data['title'],
        "pageMap": {
            "learningObjectives": [
                "Understand Opportunity Cost in depth",
                "Calculate MC (Marginal Cost)",
                "PPC Shifts"
            ],
            "estimatedTime": "60 דקות"
        },
        "introduction": {
            "hook": "Generated Hook from " + data['title'],
            "whyItMatters": "Why calculating costs matters...",
            "content": "Introduction content..."
        },
        "topics": [
            {
                "id": "topic-1",
                "title": "Topic 1 (Generated)",
                "blocks": []
            }
        ],
        "checkpoint": [],
        "bridge": {
            "nextChapterTitle": "Chapter 3",
            "content": "Moving on...",
            "nextChapter": "chapter-3"
        }
    }
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=4)
    
    print(f"Generated {output_path}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('input', help='Librarian Markdown Path')
    parser.add_argument('--output', help='Chapter JSON Output Path')
    args = parser.parse_args()
    
    if os.path.exists(args.input):
        data = parse_librarian_output(args.input)
        generate_chapter_json(data, args.output)
    else:
        print(f"Input file not found: {args.input}")
