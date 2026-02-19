"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/organizational-behavior/situational-leadership.json";

export default function SituationalLeadershipPage() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
