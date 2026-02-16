"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/accounting/chapter-0.json";

export default function Chapter0Page() {
  // Type assertion needed because JSON imports infer wide types
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
