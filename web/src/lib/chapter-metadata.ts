import type { Metadata } from "next";

/**
 * Creates chapter-specific metadata from imported JSON data.
 * Used by per-chapter layout.tsx files.
 */
export function createChapterMetadata(chapterData: {
    title: string;
    summary: string;
    chapterNumber: number;
}): Metadata {
    return {
        title: chapterData.title,
        description: chapterData.summary,
        openGraph: {
            title: chapterData.title,
            description: chapterData.summary,
            type: "article",
            locale: "he_IL",
        },
    };
}
