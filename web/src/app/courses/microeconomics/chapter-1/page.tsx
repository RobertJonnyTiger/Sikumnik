"use client";

import * as React from "react";
import chapterData from "../../../../data/chapters/micro-ch1.json";
import { MasterChapterTemplate } from "@/components/core/master-page/MasterChapterTemplate";
import { ChapterData } from "@/types/chapter";
import { ClassificationGame } from "@/components/core/master-page/ClassificationGame";

export default function MicroChapter1Page() {
    const data = chapterData as unknown as ChapterData;

    return (
        <MasterChapterTemplate
            data={data}
            interactiveComponent={
                <ClassificationGame
                    data={chapterData.interactiveElement}
                />
            }
            interactiveTitle="המעבדה הכלכלית: סיווג מוצרים"
        />
    );
}
