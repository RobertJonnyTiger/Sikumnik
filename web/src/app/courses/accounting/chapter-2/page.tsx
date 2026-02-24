"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/accounting/chapters/chapter-2.json";

export default function Chapter2Page() {
  // Type assertion needed because JSON imports infer wide types
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
