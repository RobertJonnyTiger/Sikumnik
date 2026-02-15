"use client";

import React from "react";
import chapterData from "@/data/chapters/chapter-2.json";
import { Scale } from "lucide-react";

// Components
import { PageMap } from "@/components/accounting/PageMap";
import { Introduction } from "@/components/accounting/Introduction";
import { TeaserAnalogy } from "@/components/accounting/TeaserAnalogy";
import { FormalDefinitions } from "@/components/accounting/FormalDefinitions";
import { ToneBreak } from "@/components/accounting/ToneBreak";
import { DeepDive } from "@/components/accounting/DeepDive";
import { CommonMistakes } from "@/components/accounting/CommonMistakes";
import { ClassificationGame } from "@/components/accounting/ClassificationGame";
import { Checkpoint } from "@/components/accounting/Checkpoint";
import { StreetSummary } from "@/components/accounting/StreetSummary";
import { GuidedExercises } from "@/components/accounting/GuidedExercises";
import { IndependentExercises } from "@/components/accounting/IndependentExercises";
import { QuickReference } from "@/components/accounting/QuickReference";
import { Trivia } from "@/components/accounting/Trivia";
import { Bridge } from "@/components/accounting/Bridge";

export default function Chapter2Page() {
    // Cast data to any for easier access during the pilot phase
    // In strict mode, we should define a Zod schema or TS interface for the full JSON
    const data: any = chapterData;

    return (
        <div className="w-full px-6 lg:px-12 xl:px-16 py-8 max-w-[1600px] mx-auto">

            {/* [1] 🗺️ מפת הפרק — PAGE MAP */}
            <PageMap
                title={data.title}
                data={data.pageMap}
                currentChapter={data.chapterNumber}
                totalChapters={data.totalChapters}
            />

            <div className="max-w-5xl mx-auto space-y-16">

                {/* [2] 📖 הקדמה — INTRODUCTION */}
                <Introduction data={data.introduction} />

                {/* [3] 🌆 טיזר אנלוגי — TEASER ANALOGY */}
                <TeaserAnalogy data={data.teaserAnalogy} />

                {/* [4] 📚 הגדרות פורמליות — FORMAL DEFINITIONS */}
                <FormalDefinitions data={data.formalDefinitions} />

                {/* [5] 🔀 שבירת טון — TONE BREAK */}
                <ToneBreak data={data.toneBreak} />

                {/* [6] 🔬 העמקה — DEEP DIVE */}
                <DeepDive data={data.deepDive} />

                {/* [7] ⚠️ טעויות נפוצות — COMMON MISTAKES */}
                <CommonMistakes data={data.commonMistakes} />

                {/* [8] 🎮 אלמנט אינטראקטיבי — INTERACTIVE ELEMENT */}
                <ClassificationGame data={data.interactiveElement} />

                {/* [9] ✅ בדיקה מהירה — CHECKPOINT */}
                <Checkpoint data={data.checkpoint} />

                {/* [10] 🗣️ סיכום בגובה העיניים — STREET-LEVEL SUMMARY */}
                <StreetSummary data={data.streetSummary} />

                {/* [11] 📝 תרגילים מודרכים — GUIDED EXERCISES */}
                <GuidedExercises data={data.guidedExercises} />

                {/* [12] 💪 תרגילים עצמאיים — INDEPENDENT EXERCISES */}
                <IndependentExercises data={data.independentExercises} />

                {/* [13] 📋 כרטיס סיכום — QUICK REFERENCE CARD */}
                <QuickReference data={data.quickReference} />

                {/* [14] 🎲 טריוויה — DID YOU KNOW? */}
                <Trivia data={data.trivia} />

                {/* [15] ➡️ גשר לפרק הבא — BRIDGE */}
                <Bridge
                    data={data.bridge}
                    nextChapterLink={`/courses/accounting/${data.navigation.next.id}`}
                />

            </div>
        </div>
    );
}

