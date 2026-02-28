"use client";

import React, { useState, useEffect } from "react";
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import { notFound } from "next/navigation";

export default function DynamicChapterPage({
    params,
}: {
    params: Promise<{ courseId: string; chapterId: string }>;
}) {
    // Next.js 15+ async params
    const resolvedParams = React.use(params);
    const { courseId, chapterId } = resolvedParams;

    const [chapterData, setChapterData] = useState<ChapterData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChapter = async () => {
            try {
                // Dynamically import the required JSON from the new feature-sliced layout
                const data = await import(`@/data/${courseId}/chapters/chapter-${chapterId}.json`);
                setChapterData(data.default as unknown as ChapterData);
            } catch (error) {
                console.error("Failed to load chapter:", error);
                setChapterData(null);
            } finally {
                setLoading(false);
            }
        };

        loadChapter();
    }, [courseId, chapterId]);

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground font-medium">טוען פרק...</p>
                </div>
            </div>
        );
    }

    if (!chapterData) {
        notFound();
    }

    return <ChapterTemplate data={chapterData} />;
}
