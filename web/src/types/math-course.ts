export interface DualLanguageText {
    /** The rigorous, academic definition or formula (Lecturer Language) */
    formalText: string;
    /** A running street-language narrator - a separate tutor voice that escorts the student through the formal content */
    streetNarrator: string;
}

export type MathTermType = 'variable' | 'constant' | 'coefficient' | 'exponent' | 'operator' | 'function';

export interface ColoredMathTerm {
    /** Unique ID used for Framer Motion layoutId to animate terms moving */
    id: string;
    /** The literal string representing this term (e.g., '10X', '50', '=') */
    value: string;
    /** Mathematical categorization for thematic CSS coloring */
    type: MathTermType;
    /** CSS custom property or Tailwind class for color (e.g., 'text-blue-500' or 'var(--term-constant)') */
    colorClass?: string;
}

export interface EquationStep {
    id: string;
    /** Explanation of what happened in this specific step */
    explanation: DualLanguageText;
    /** The visual representation of the equation at this step, broken into moving terms */
    terms: ColoredMathTerm[];
}

export type ConceptBlockType =
    | 'text'
    | 'definition'
    | 'example'
    | 'theorem'
    | 'colored-equation'
    | 'equation'
    | 'interactive-graph'
    | 'step-by-step'
    | 'street-narrator-block'
    | 'reference-table'
    | 'formula-card'
    | 'hero-formula'
    | 'exam-tip'
    | 'guided-exercise'
    | 'checkpoint-quiz'
    | 'worked-example';

export interface HeroFormulaBlock extends BaseConceptBlock {
    type: 'hero-formula';
    title: string;
    subtitle?: string;
    katexString: string;
    streetNarrator: string;
}

export interface FormulaCardBlock extends BaseConceptBlock {
    type: 'formula-card';
    title: string;
    formula: string;
    description?: string;
    variables?: {
        symbol: string;
        name: string;
    }[];
}

export interface ReferenceTableRow {
    id: string;
    /** Rule name (e.g., "Power Rule", "Zero Exponent") */
    ruleName: string;
    /** Algebraic form using variables a, b, n — rendered via KaTeX */
    generalForm: string;
    /** Concrete numeric example — rendered via KaTeX */
    numericExample: string;
    /** Street-language description of what the rule actually means */
    streetExplanation: string;
}

export interface BaseConceptBlock {
    id: string;
    type: ConceptBlockType;
    title?: string;
}

export interface StandardConceptBlock extends BaseConceptBlock {
    type: 'text' | 'equation' | 'step-by-step' | 'interactive-graph' | 'definition';
    /** The core teaching content for this block */
    content: DualLanguageText;
    /** Present if type is 'step-by-step' (e.g., solving a limit) */
    equationSteps?: EquationStep[];
    /** Present if type is 'equation' for static rendering via KaTeX */
    katexString?: string;
}

export interface StreetNarratorBlock extends BaseConceptBlock {
    type: 'street-narrator-block';
    /** A standalone block that can appear anywhere as a pure tutor-voice moment */
    standaloneNarration: string;
}

export interface ReferenceTableBlock extends BaseConceptBlock {
    type: 'reference-table';
    /** Category label (e.g., "Exponent Rules", "Derivative Formulas", "Limit Edge Cases") */
    tableCategory: string;
    rows: ReferenceTableRow[];
}

export type ConceptBlock = StandardConceptBlock | StreetNarratorBlock | ReferenceTableBlock | HeroFormulaBlock | FormulaCardBlock;

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    /** Flag to mark lessons where the street narrator escort mode is active */
    hasStreetNarrator?: boolean;
    /** Ordered sequence of teaching blocks */
    blocks: ConceptBlock[];
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface MathCourse {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
}
