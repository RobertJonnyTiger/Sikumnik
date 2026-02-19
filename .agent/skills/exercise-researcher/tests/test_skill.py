import os
import sys

# Protocol: "If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing."

SKILL_PATH = r".agent\skills\exercise-researcher\exercise-researcher-SKILL.md"

def test_skill_exists():
    if not os.path.exists(SKILL_PATH):
        print(f"FAIL: Skill file not found at {SKILL_PATH}")
        return False
    return True

def test_skill_content():
    with open(SKILL_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    required_terms = [
        "guided-exercise",
        "independentExercises",
        "Sikumnik Tutor", # Persona
        "I do, We do, You do" # Philosophy
    ]
    
    missing = [term for term in required_terms if term not in content]
    
    if missing:
        print(f"FAIL: Skill missing required terms: {missing}")
        return False
    
    print("PASS: Skill file exists and contains required terms.")
    return True

if __name__ == "__main__":
    if not test_skill_exists():
        sys.exit(1)
    
    if not test_skill_content():
        sys.exit(1)
    
    sys.exit(0)
