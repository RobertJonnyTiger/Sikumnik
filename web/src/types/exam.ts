export interface ExamQuestion {
    id: string;
    number: number;
    type: 'multiple-choice';
    question: string;
    points: number;
    options: string[];
    correctIndex: number;
    hint?: string;
    reasoning: {
        correct: string;
        wrong: {
            [key: string]: string;
        };
    };
}

export interface ExamData {
    id: string;
    title: string;
    courseId: string;
    totalQuestions: number;
    passingScore: number;
    timeLimitMinutes?: number;
    questions: ExamQuestion[];
}
