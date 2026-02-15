export interface ChapterData {
    id: string;
    chapterNumber: number;
    totalChapters: number;
    title: string;
    navigation: {
        previous?: { id: string; title: string };
        next?: { id: string; title: string };
    };
    pageMap: {
        learningObjectives: string[];
        prerequisites?: { chapterId: string; title: string; description: string }[];
        estimatedTime: string;
    };
    prerequisiteReview?: {
        content: string;
        items: { term: string; description: string }[];
    };
    introduction: {
        content: string;
        whyItMatters: string;
        realWorldConnection?: string;
    };
    teaserAnalogy: {
        content: string;
    };
    formalDefinitions: {
        concepts: {
            title: string;
            content: string;
            tooltips?: Record<string, string>;
        }[];
        formulas?: {
            title: string;
            formula: string;
            alternativeForm?: string;
            variables?: { symbol: string; name: string; desc: string }[];
            benchmark?: string;
        }[];
    };
    toneBreak: {
        opener: string;
        content: string;
        academicTitle?: string;
        academicContent?: string;
    };
    deepDive: any; // Using any for flexibility until strict deep dive schema is consolidated
    commonMistakes: {
        mistake: string;
        correct: string;
        why: string;
    }[];
    interactiveElement?: any; // Slot for dynamic data
    checkpoint: {
        id?: string;
        type: "multipleChoice" | "trueFalse";
        text?: string;
        question?: string;
        options?: string[];
        correctIndex?: number;
        correct?: boolean;
        explanation: string;
    }[];
    streetSummary: {
        content: string;
    };
    guidedExercises: any[];
    independentExercises: {
        difficulty: number;
        question: string;
        options?: string[]; // Added strict options array
        hint: string;
        answer: string;
        isExamStyle?: boolean;
    }[];
    quickReference: {
        formulas: {
            name: string;
            formula: string;
            label?: string; // Enhanced display
            subtext?: string; // Enhanced display
        }[];
        definitions: { term: string; definition: string }[];
    };
    trivia: {
        fact: string;
        type: string;
        source?: string;
    }[];
    bridge: {
        nextChapterTitle: string;
        content: string;
        nextChapter: string; // ID
    };
}
