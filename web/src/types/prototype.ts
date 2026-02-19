export interface ConceptItem {
    id: number;
    title: string;
    description: string;
}

export interface PrototypeChapterIntroData {
    courseTitle: string;
    chapterNumber: number;
    totalChapters: number;
    title: string;
    description: string;
    readingTime: string;
    objectives: { id: number; text: string }[];
    concepts: ConceptItem[];
    motivationTitle: string;
    motivationText: string;
    subTopics: { id: string; title: string; isActive: boolean }[];
}
