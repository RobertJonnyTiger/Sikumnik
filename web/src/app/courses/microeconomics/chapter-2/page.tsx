"use client";

import * as React from "react";
import chapterData from "../../../../data/chapters/micro-ch2.json";
import { MasterChapterTemplate } from "@/components/core/master-page/MasterChapterTemplate";
import { ChapterData } from "@/types/chapter";

// Domain Specific
import { PPFGraph } from "@/components/core/interactive/PPFGraph";

export default function MicroChapter2Page() {
    // Cast strict type
    const data = chapterData as unknown as ChapterData;

    return (
        <MasterChapterTemplate
            data={data}
            interactiveComponent={<PPFGraph />}
            interactiveTitle="המעבדה הכלכלית: עקומת התמורה"
        />
    );
}
