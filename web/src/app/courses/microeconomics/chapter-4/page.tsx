"use client";

import React from "react";
import chapterData from "@/data/chapters/micro-ch4.json";
import { MasterChapterTemplate } from "@/components/core/master-page/MasterChapterTemplate";
import { ChapterData } from "@/types/chapter";
import { PPCShifter } from "@/components/core/interactive/PPCShifter";

export default function MicroChapter4Page() {
    const data = chapterData as unknown as ChapterData;

    return (
        <MasterChapterTemplate
            data={data}
            interactiveComponent={<PPCShifter />}
            interactiveTitle="המעבדה: צמיחה ושיפור טכנולוגי"
        />
    );
}
