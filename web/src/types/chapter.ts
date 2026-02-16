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
    | ToneBreakBlock
    | MistakeBlock
    | GuidedExerciseBlock
    | InteractiveBlock
    | CalloutBlock
    | ImageBlock
    | CheckpointBlock
    | SummaryBlock
    | HookBlock
    | PrerequisiteBlock;

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
    term: string;
    content: string;
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

export interface ToneBreakBlock {
    type: "tone-break";
    opener: string;
    content: string;
}

export interface MistakeBlock {
    type: "common-mistake";
    mistake: string;
    correct: string;
    why: string;
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

export interface CalloutBlock {
    type: "callout";
    variant: "tip" | "warning" | "note";
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

export interface SummaryBlock {
    type: "summary";
    content: string;
    keyPoints?: string[];
}

export interface HookBlock {
    type: "hook";
    opener: string;
    question?: string;
    context?: string;
}

export interface PrerequisiteBlock {
    type: "prerequisite";
    concept: string;
    briefReview: string;
    whyNeeded: string;
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
        previous?: { id: string; title: string };
        next?: { id: string; title: string };
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
}
