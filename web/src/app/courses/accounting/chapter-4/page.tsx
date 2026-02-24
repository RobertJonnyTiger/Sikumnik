"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/accounting/chapters/chapter-4.json";

export default function Chapter4Page() {
  // Type assertion needed because JSON imports infer wide types
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
