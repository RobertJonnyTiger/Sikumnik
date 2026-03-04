import json
import argparse
import sys
from pathlib import Path
from google import genai
from google.genai import types
from pydantic import BaseModel, Field, ValidationError
from typing import Optional, List, Literal, Union, Any, Dict
try:
    from typing import Annotated
except ImportError:
    from typing_extensions import Annotated

PROJECT_ROOT = Path(__file__).parent.parent

class HookBlock(BaseModel):
    type: Literal["hook"]
    title: Optional[str] = None
    opener: str
    question: Optional[str] = None
    context: Optional[str] = None

class HeroFormulaBlock(BaseModel):
    type: Literal["hero-formula"]
    title: str
    katexString: str
    subtitle: Optional[str] = None
    description: Optional[str] = None
    streetNarrator: Optional[str] = None
    variables: Optional[List[Dict[str, Any]]] = None

class TextBlock(BaseModel):
    type: Literal["text"]
    title: Optional[str] = None
    formalText: str
    streetNarrator: str

class DefinitionBlock(BaseModel):
    type: Literal["definition"]
    term: str
    definition: str
    variant: Optional[str] = None
    title: Optional[str] = None

class FormulaBlock(BaseModel):
    type: Literal["formula", "formula-card"]
    title: str
    katexString: str
    subtitle: Optional[str] = None
    description: Optional[str] = None
    streetNarrator: Optional[str] = None
    variables: Optional[List[Dict[str, Any]]] = None

class ReferenceTableRow(BaseModel):
    ruleName: str
    generalForm: str
    numericExample: str
    streetExplanation: str

class ReferenceTableBlock(BaseModel):
    type: Literal["reference-table"]
    title: str
    rows: List[ReferenceTableRow]

class AnalogyBlock(BaseModel):
    type: Literal["analogy"]
    title: Optional[str] = None
    content: str
    icon: Optional[str] = None

class DeepDiveSection(BaseModel):
    title: str
    content: str

class DeepDiveBlock(BaseModel):
    type: Literal["deep-dive"]
    title: str
    sections: List[DeepDiveSection]

class AlertBlock(BaseModel):
    type: Literal["alert", "callout"]
    variant: Literal["tip", "warning", "prerequisite", "info"]
    title: Optional[str] = None
    content: str

class WorkedExampleBlock(BaseModel):
    type: Literal["worked-example", "real-world-example", "example"]
    title: str
    scenario: str
    solution: str

class CommonMistakeBlock(BaseModel):
    type: Literal["common-mistake"]
    mistake: str
    correction: Optional[str] = None

class GuidedExerciseStep(BaseModel):
    title: Optional[str] = None
    action: str
    result: str

class GuidedExerciseBlock(BaseModel):
    type: Literal["guided-exercise"]
    source: str
    difficulty: Optional[int] = None
    question: str
    thinkingDirection: Optional[str] = None
    steps: List[GuidedExerciseStep]
    finalAnswer: str

class ExamTipBlock(BaseModel):
    type: Literal["exam-tip"]
    source: Optional[str] = None
    content: str

class TopicSummaryBlock(BaseModel):
    type: Literal["topic-summary"]
    content: str

class ImageBlock(BaseModel):
    type: Literal["image"]
    src: str
    alt: str
    caption: Optional[str] = None

class StreetSmartBlock(BaseModel):
    type: Literal["street-smart"]
    title: Optional[str] = None
    content: str
    emoji: Optional[str] = None
    opener: Optional[str] = None

class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correctIndex: int
    explanation: Optional[str] = None

class CheckpointQuizBlock(BaseModel):
    type: Literal["checkpoint", "checkpoint-quiz"]
    questions: List[QuizQuestion]

# Need to set an alias generator to allow reading arbitrary types? 
# We'll rely on correct json formats but fallback on ignoring exact discriminator match if it errors.
# Actually, Pydantic handles discrimination.
LessonBlock = Annotated[Union[
    HookBlock,
    HeroFormulaBlock,
    TextBlock,
    DefinitionBlock,
    FormulaBlock,
    ReferenceTableBlock,
    AnalogyBlock,
    DeepDiveBlock,
    AlertBlock,
    WorkedExampleBlock,
    CommonMistakeBlock,
    GuidedExerciseBlock,
    ExamTipBlock,
    TopicSummaryBlock,
    ImageBlock,
    StreetSmartBlock,
    CheckpointQuizBlock,
], Field(discriminator="type")]

class LessonPage(BaseModel):
    pageTitle: str
    blocks: List[LessonBlock]

def generate_lesson(course: str, topic: str, extracted_md_path: Path, api_key: str, api_key_2: str = None) -> Path:
    print("📖 Reading extracted content...")
    
    if not extracted_md_path.exists():
        print(f"❌ ERROR: Extracted markdown file not found: {extracted_md_path}")
        sys.exit(1)
        
    extracted_md = extracted_md_path.read_text(encoding="utf-8")
    
    prompt_path = PROJECT_ROOT / "web" / "src" / "prompts" / "lecturer-agent.md"
    if not prompt_path.exists():
        print(f"❌ ERROR: System prompt not found: {prompt_path}")
        sys.exit(1)
        
    system_instruction = prompt_path.read_text(encoding="utf-8")
    user_message = f"{extracted_md}\n\nGenerate a complete lesson for topic {topic}. Output only a valid JSON array of ConceptBlocks as specified in your instructions."
    
    print("🤖 Calling Gemini API...")
    
    def try_api_call(key):
        client = genai.Client(api_key=key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2, # Low temperature for more deterministic outputs
                response_mime_type="application/json", 
            )
        )
        return response.text
        
    try:
        response_text = try_api_call(api_key)
    except Exception as e:
        error_msg = str(e).lower()
        if ("429" in error_msg or "quota" in error_msg or "rate" in error_msg) and api_key_2:
            print("⚠️ Primary key rate limited, switching to fallback key...")
            try:
                response_text = try_api_call(api_key_2)
            except Exception as e2:
                raise Exception(f"API generation failed on fallback key: {e2}")
        else:
            raise Exception(f"API generation failed: {e}")
            
    # Validate JSON shape with Pydantic
    try:
        data = json.loads(response_text)
        try:
            from pydantic import TypeAdapter
            adapter = TypeAdapter(List[LessonPage])
            adapter.validate_python(data)
        except ImportError:
            from pydantic import parse_obj_as
            parse_obj_as(List[LessonPage], data)
        
        print("✅ Pydantic validation passed! JSON shape is correct.")
    except ValidationError as e:
        print("❌ Validation errors found in AI output:")
        for error in e.errors():
            print(f"  Location {error['loc']}: {error['msg']}")
        # Option A: Raise and stop (Safe, requires manual fix or prompt fix)
        # We enforce "Raise and stop" to surface the exact LLM hallucinations to the developer.
        raise Exception("Pydantic Validation Error during generation.") from e
    except Exception as e:
        first_chars = response_text[:200].replace('\n', '\\n')
        raise Exception(f"Invalid JSON returned from Gemini: {e}\n--- First 200 chars: {first_chars}")

    print(f"💾 Writing chapter-{topic}.json...")
    
    output_dir = PROJECT_ROOT / "web" / "src" / "data" / "chapters" / course
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / f"chapter-{topic}.json"
    output_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    
    return output_file

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate lessons strictly from extracted markdown")
    parser.add_argument("--course", required=True, choices=['math', 'micro', 'acct', 'orgbh'], help="Course name")
    parser.add_argument("--topic", required=True, help="Topic number (e.g., 03)")
    parser.add_argument("--extracted", required=True, help="Path to extracted markdown file")
    parser.add_argument("--key", required=True, help="Gemini API Key")
    parser.add_argument("--key2", help="Optional fallback Gemini API Key")
    
    args = parser.parse_args()
    
    output_path = generate_lesson(
        course=args.course, 
        topic=args.topic, 
        extracted_md_path=Path(args.extracted), 
        api_key=args.key, 
        api_key_2=args.key2
    )
    
    print(f"🎉 Successfully generated: {output_path}")
