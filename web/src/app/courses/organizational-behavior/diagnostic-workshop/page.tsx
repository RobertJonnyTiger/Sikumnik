"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/organizational-behavior/chapters/diagnostic-workshop.json";

export default function DiagnosticWorkshopPage() {
    const data = chapterData as unknown as ChapterData;
    return <ChapterTemplate data={data} />;
}
