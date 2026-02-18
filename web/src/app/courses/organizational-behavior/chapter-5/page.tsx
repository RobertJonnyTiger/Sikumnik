"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/organizational-behavior/chapter-5.json";

export default function Chapter4Page() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
