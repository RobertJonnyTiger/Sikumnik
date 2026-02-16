"use client";

import React from "react";
import chapterData from "@/data/chapters/micro-ch5-v2.json";
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";

export default function MicroChapter5V2Page() {
    const data = chapterData as unknown as ChapterData;

    return <ChapterTemplate data={data} />;
}
