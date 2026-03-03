"use client";

import { ChapterTemplate } from "@/features/core-lessons/renderers/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/organizational-behavior/chapters/chapter-2.json";

export default function Chapter2Page() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
