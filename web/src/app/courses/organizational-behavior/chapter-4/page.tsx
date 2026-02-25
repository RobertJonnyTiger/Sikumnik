"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/organizational-behavior/chapters/chapter-4.json";

export default function Chapter4Page() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
