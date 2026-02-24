"use client";

import React from "react";
import chapterData from "@/data/accounting/chapters/chapter-10.json";
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";

export default function AccountingChapter10Page() {
    const data = chapterData as unknown as ChapterData;

    return <ChapterTemplate data={data} />;
}
