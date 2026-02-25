"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/organizational-behavior/chapters/chapter-1.json";

export default function Chapter1Page() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
