// ============================================================
// Sikumnik Teaching-First Chapter Schema v2
// ============================================================
// Every chapter is a sequence of Topics rendered as tabs.
// Every topic is a sequence of ContentBlocks rendered in order.
// The template renders what the data provides — nothing more.
// ============================================================

// ── Content Block Types (Discriminated Union) ──────────────

export type ContentBlock =
    | ExplanationBlock
    | AnalogyBlock
    | DefinitionBlock
    | FormulaBlock
    | ExampleBlock
    | DeepDiveBlock
    | GuidedExerciseBlock
    | InteractiveBlock
    | AlertBlock
    | ImageBlock
    | CheckpointBlock
    | HookBlock
    | RealWorldExampleBlock
    | ListBlock
    | MaslowPyramidBlock
    | ExamQuestionBlock
    | AttributionFlowchartBlock
    | DiagnosticCaseStudyBlock
    | SituationalLeadershipGuideBlock
    | StreetSmartBlock;

export interface ListBlock {
    type: "list";
    items: string[];
}

export interface RealWorldExampleBlock {
    type: "real-world-example";
    title: string;
    scenario: string;
    connection: string;
    source?: string;
}

export interface ExplanationBlock {
    type: "explanation";
    content: string;
    highlight?: string;
}

export interface AnalogyBlock {
    type: "analogy";
    content: string;
    icon?: string;
}

export interface DefinitionBlock {
    type: "definition";
    variant?: "academic" | "simple";
    term: string;
    content: string;
    source?: string;
    subject?: string;
    tooltips?: Record<string, string>;
}

export interface FormulaBlock {
    type: "formula";
    title: string;
    formula: string; // LaTeX
    variables?: Variable[];
}

export interface ExampleBlock {
    type: "example";
    title: string;
    scenario: string;
    solution: string;
    calculation?: string;
}

export interface DeepDiveBlock {
    type: "deep-dive";
    title: string;
    sections: { title: string; content: string; example?: string }[];
}

export interface GuidedExercisePhase {
    type: "i-do" | "we-do" | "you-do";
    content: string;
}

export interface GuidedExerciseBlock {
    type: "guided-exercise";
    difficulty: number;
    question: string;
    thinkingDirection: string;
    steps: Step[];
    finalAnswer: string;
    phases?: GuidedExercisePhase[];
}

export interface InteractiveBlock {
    type: "interactive";
    componentId: string;
    config?: Record<string, unknown>;
}

export interface AlertBlock {
    type: "alert";
    variant: "tip" | "warning" | "prerequisite";
    title?: string;
    content: string;
}

export interface ImageBlock {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
}

export interface CheckpointBlock {
    type: "checkpoint";
    questions: QuizQuestion[];
}

export interface HookBlock {
    type: "hook";
    opener: string;
    question?: string;
    context?: string;
}

export interface StreetSmartBlock {
    type: "street-smart";
    title: string;
    content: string;
    emoji?: string;
}

export interface MaslowPyramidBlock {
    type: "maslow-pyramid";
}

export interface ExamQuestion {
    id: string;
    number: number;
    type: "multiple-choice" | "open-ended" | "multiple-select";
    question: string;
    points: number;
    options?: string[];
    correctIndex?: number; // For single choice
    correctIndices?: number[]; // For multiple select
    modelAnswer?: string; // For open ended
    gradingCriteria?: string[]; // For open ended
}

export interface ExamQuestionBlock {
    type: "exam-questions";
    questions: ExamQuestion[];
    showAnswersAtEnd?: boolean;
}

export interface AttributionFlowchartBlock {
    type: "attribution-flowchart";
    mode?: "reference" | "quiz";
}

export interface DiagnosticCaseStudyBlock {
    type: "diagnostic-case-study";
    title: string;
    subtitle: string;
    scenario: string;
    sections: Array<{
        id: string;
        title: string;
        icon?: string;
        theory: string;
        analysis: string;
        evidence: string[];
        questions: Array<{
            question: string;
            options: string[];
            correctIndex: number;
            explanation: string;
            feedback?: {
                correct: string;
                wrong: Record<number, string>;
            };
        }>;
    }>;
    conclusion: string;
    keyTakeaways: string[];
}

export interface SituationalLeadershipGuideBlock {
    type: "situational-leadership-guide";
}

// ── Supporting Types ──────────────────────────────────────

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface Step {
    title: string;
    action: string;
    reasoning: string;
    calculation: string;
    result: string;
}

export interface Variable {
    symbol: string;
    name: string;
    desc: string;
}

export interface Exercise {
    difficulty: number;
    question: string;
    hint: string;
    answer: string;
    options?: string[];
    isExamStyle?: boolean;
}

// ── Topic (one tab) ───────────────────────────────────────

export interface Topic {
    id: string;
    title: string;
    blocks: ContentBlock[];
}

// ── Chapter (the full page) ───────────────────────────────

export interface ChapterData {
    // Required
    id: string;
    title: string;
    chapterNumber: number;
    totalChapters: number;
    course: string;

    // Navigation
    navigation?: {
        previous?: { href: string; title: string };
        next?: { href: string; title: string };
    };

    // Chapter-level preamble
    pageMap?: {
        learningObjectives: string[];
        prerequisites?: { chapterId: string; title: string }[];
        estimatedTime: string;
    };

    introduction?: {
        content: string;
        whyItMatters?: string;
        hook?: string;
    };

    // THE CORE: topics → tabs
    topics: Topic[];

    // Chapter-level wrap-up
    checkpoint?: QuizQuestion[];
    independentExercises?: Exercise[];
    quickReference?: {
        formulas: { name: string; formula: string }[];
        definitions: { term: string; definition: string }[];
    };
    trivia?: { fact: string; source?: string }[];
    bridge?: {
        nextChapterTitle: string;
        content: string;
        nextChapter: string;
    };
    narrativeSummary?: {
        content: string;
        tip: { title: string; content: string };
        pitfall: { title: string; content: string };
    };
}
