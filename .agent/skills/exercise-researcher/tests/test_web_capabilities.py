import os
import sys

SKILL_PATH = r".agent\skills\exercise-researcher\exercise-researcher-SKILL.md"

def test_web_instructions():
    if not os.path.exists(SKILL_PATH):
        print(f"FAIL: Skill file not found at {SKILL_PATH}")
        return False

    with open(SKILL_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Requirement: The user explicitly demanded web search and "fresh ideas".
    required_phrases = [
        "search_web", # Must mention the tool
        "inspiration", # "for inspiration of different elements"
        "fresh ideas", # "come up with fresh ideas"
        "examples"
    ]
    
    missing = [phrase for phrase in required_phrases if phrase.lower() not in content.lower()]
    
    if missing:
        print(f"FAIL: Skill definition missing required web-search instructions: {missing}")
        return False
        
    print("PASS: Skill definition contains web-search instructions.")
    return True

if __name__ == "__main__":
    if not test_web_instructions():
        sys.exit(1)
    sys.exit(0)
