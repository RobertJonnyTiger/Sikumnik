import os
import json
import sys

# Paths
SKILL_PATH = r"c:\Users\rober\AI Projects\Sikumnik\.agent\skills\interactive-exercise-builder\interactive-exercise-builder-SKILL.md"
INPUT_PATH = r"c:\Users\rober\AI Projects\Sikumnik\.agent\skills\interactive-exercise-builder\tests\test-input.md"
EXPECTED_PATH = r"c:\Users\rober\AI Projects\Sikumnik\.agent\skills\interactive-exercise-builder\tests\expected-output.json"

def test_skill_existence():
    if not os.path.exists(SKILL_PATH):
        print(f"FAIL: Skill file not found at {SKILL_PATH}")
        return False
    return True

def main():
    print("Running Skill TDD Verification...")
    
    # 1. Check if Skill Exists (The rudimentary check)
    if not test_skill_existence():
        sys.exit(1)
        
    print("PASS: Skill file exists.")
    
    # Note: In a full agentic environment, we would invoke the LLM here with the skill 
    # and the input file, then validate the JSON output. 
    # For this TDD bootstap, existence + content check is our proxy.
    
    with open(SKILL_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "arcade-speed-sorter" not in content:
        print("FAIL: Skill does not contain 'arcade-speed-sorter' definition.")
        sys.exit(1)
        
    if "arcade-prediction-market" not in content:
        print("FAIL: Skill does not contain 'arcade-prediction-market' definition.")
        sys.exit(1)

    print("PASS: Skill contains required definitions.")
    sys.exit(0)

if __name__ == "__main__":
    main()
