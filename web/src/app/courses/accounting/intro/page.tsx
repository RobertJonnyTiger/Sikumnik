"use client";

import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/chapters/accounting/intro.json";

export default function AccountingIntroPage() {
  // Type assertion needed because JSON imports infer wide types
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
