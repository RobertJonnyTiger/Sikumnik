export type ContentBlockType = 'concept' | 'calculation' | 'journal_entry' | 'case_study' | 'pitfalls';

export interface BaseBlock {
    type: ContentBlockType;
    title: string;
}

export interface ConceptBlock extends BaseBlock {
    type: 'concept';
    academic_text: string;
    analogy_text: string;
}

export interface Variable {
    name: string;
    value: string;
    desc: string;
}

export interface CalculationBlock extends BaseBlock {
    type: 'calculation';
    formula_visual: string;
    variables: Variable[];
    steps: (string | { text: string; type?: 'pnl' | 'bs' | 'info'; isJournal?: boolean })[];
    analogy_note: string; // Made optional to handle cases where it might be missing
    data?: { // For custom visualizations like P&L tables
        rows: Array<{
            label: string;
            amount: number;
            type: 'revenue' | 'expense' | 'subtotal' | 'total';
            highlight?: boolean;
        }>;
    };
}

export interface JournalLine {
    account: string;
    debit: number;
    credit: number;
}

export interface JournalEntryBlock extends BaseBlock {
    type: 'journal_entry';
    date?: string;
    entries: JournalLine[];
    explanation: string;
}

export interface CaseStudyBlock extends BaseBlock {
    type: 'case_study';
    story: string;
    questions: { q: string; a: string }[];
}

export interface CommonMistakesBlock extends BaseBlock {
    type: 'pitfalls';
    mistakes: string[];
    tips: string[];
    traps: string[];
}

export type ContentBlock = ConceptBlock | CalculationBlock | JournalEntryBlock | CaseStudyBlock | CommonMistakesBlock;

export interface Section {
    id: string;
    title: string;
    summary: string;
    sections: ContentBlock[];
}

export interface Exercise {
    question: string;
    solution: string;
    tip?: string;
}

export interface Tab {
    id: string;
    title: string;
    content: ContentBlock[];
}

export interface Chapter {
    id: string;
    title: string;
    summary: string;
    tabs?: Tab[];
    sections?: Section[]; // Note: In the JSON, the top level array contains "Sections" which actually act like "Sub-Chapters" or "Topics"
    exercises?: Exercise[];
    worked_example?: any; // Keeping the existing structure for now to avoid breaking too much
    pageMap?: any;
}
