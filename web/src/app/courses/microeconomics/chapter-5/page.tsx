"use client";

import React from "react";
import chapterData from "@/data/chapters/micro-ch5.json";
import { MasterChapterTemplate } from "@/components/core/master-page/MasterChapterTemplate";
import { ChapterData } from "@/types/chapter";
import { TradeBalanceVisualizer } from "@/components/micro/TradeBalanceVisualizer";

export default function MicroChapter5Page() {
    const data = chapterData as unknown as ChapterData;

    return (
        <MasterChapterTemplate
            data={data}
            interactiveComponent={<TradeBalanceVisualizer />}
            interactiveTitle="המעבדה: קו המאזן המסחרי"
        />
    );
}
