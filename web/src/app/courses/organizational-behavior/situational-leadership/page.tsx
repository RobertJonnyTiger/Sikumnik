"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/organizational-behavior/chapters/situational-leadership.json";

export default function SituationalLeadershipPage() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
