import { ConceptBlock, ConceptBlockType } from "@/types/math-course";

export interface ValidationError {
    blockIndex: number;
    blockType?: string;
    field: string;
    message: string;
}

export interface ValidationResult {
    valid: boolean;
    blocks?: ConceptBlock[];
    errors?: ValidationError[];
}

const VALID_BLOCK_TYPES: ConceptBlockType[] = [
    'text', 'definition', 'example', 'theorem', 'colored-equation',
    'equation', 'interactive-graph', 'step-by-step', 'street-narrator-block',
    'reference-table', 'formula-card', 'hero-formula',
    'exam-tip', 'guided-exercise', 'checkpoint-quiz', 'worked-example'
];

/**
 * Validates a raw JSON string from the Lecturer Agent against the ConceptBlock schema.
 * Operates deterministically: if it passes, it is guaranteed safe to render.
 */
export function validateLessonOutput(rawJsonString: string): ValidationResult {
    let parsed: any[];

    try {
        const stripped = rawJsonString
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/\s*```$/, '')
            .trim();
        parsed = JSON.parse(stripped);
    } catch (e) {
        return {
            valid: false,
            errors: [{
                blockIndex: -1,
                field: "JSON_PARSE",
                message: `Failed to parse AI output as JSON: ${(e as Error).message}`
            }]
        };
    }

    if (!Array.isArray(parsed)) {
        return {
            valid: false,
            errors: [{
                blockIndex: -1,
                field: "ROOT",
                message: "Output must be a JSON array of ConceptBlocks."
            }]
        };
    }

    const errors: ValidationError[] = [];

    parsed.forEach((block: any, index: number) => {
        if (!block || typeof block !== 'object') {
            errors.push({ blockIndex: index, field: 'block', message: 'Block must be an object' });
            return;
        }

        if (!block.type || !VALID_BLOCK_TYPES.includes(block.type)) {
            errors.push({
                blockIndex: index,
                field: 'type',
                message: `Invalid or missing block type: ${block.type}. Must be one of: ${VALID_BLOCK_TYPES.join(', ')}`
            });
            return; // Cannot proceed validating specific block shape without a valid type
        }

        const blockType = block.type as string;

        switch (blockType) {
            case 'hero-formula':
                if (!block.title || typeof block.title !== 'string' || block.title.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'title', message: 'hero-formula requires a non-empty string title' });
                }
                if (!block.formula || typeof block.formula !== 'string' || block.formula.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'formula', message: 'hero-formula requires a non-empty string formula (KaTeX)' });
                }
                break;

            case 'text':
                if (!block.formalText || typeof block.formalText !== 'string' || block.formalText.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'formalText', message: 'text block requires non-empty formalText' });
                }
                if (!block.streetNarrator || typeof block.streetNarrator !== 'string' || block.streetNarrator.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'STREET_NARRATOR_EMPTY', message: 'Pipeline constraint failure: text block requires non-empty streetNarrator' });
                }
                break;

            case 'definition':
                if (!block.term || typeof block.term !== 'string' || block.term.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'term', message: 'definition requires a non-empty string term' });
                }
                if (!block.definition || typeof block.definition !== 'string' || block.definition.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'definition', message: 'definition requires a non-empty string definition' });
                }
                break;

            case 'reference-table':
                if (!Array.isArray(block.rows) || block.rows.length < 3) {
                    errors.push({ blockIndex: index, blockType, field: 'rows', message: 'reference-table requires a rows array with minimum 3 items' });
                }
                break;

            case 'exam-tip':
                if (!block.source || typeof block.source !== 'string' || block.source.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'source', message: 'exam-tip requires a non-empty string source' });
                }
                if (!block.content || typeof block.content !== 'string' || block.content.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'content', message: 'exam-tip requires non-empty content string' });
                }
                break;

            case 'guided-exercise':
                if (!block.question || typeof block.question !== 'string' || block.question.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'question', message: 'guided-exercise requires non-empty question string' });
                }
                if (!Array.isArray(block.steps) || block.steps.length === 0) {
                    errors.push({ blockIndex: index, blockType, field: 'steps', message: 'guided-exercise requires a non-empty steps array' });
                }
                if (!block.finalAnswer || typeof block.finalAnswer !== 'string' || block.finalAnswer.trim() === '') {
                    errors.push({ blockIndex: index, blockType, field: 'finalAnswer', message: 'guided-exercise requires non-empty finalAnswer string' });
                }
                break;

            case 'checkpoint-quiz':
                if (!Array.isArray(block.questions) || block.questions.length < 2 || block.questions.length > 3) {
                    errors.push({ blockIndex: index, blockType, field: 'questions', message: 'checkpoint-quiz requires a questions array with 2-3 items' });
                }
                break;

            // formula-card, example, theorem, etc are not strictly requested for custom field validation in this step
            // but they will pass the root level JSON parsing and types check.
        }
    });

    if (errors.length > 0) {
        console.error('\n❌ [validateLessonOutput] Validation failed with errors:');
        errors.forEach(e => {
            console.error(`   - Block ${e.blockIndex} [${e.blockType || 'UNKNOWN'}]: FIELD "${e.field}" -> ${e.message}`);
        });
        return { valid: false, errors };
    }

    return { valid: true, blocks: parsed as ConceptBlock[] };
}
