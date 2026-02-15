"use client";

import * as React from "react";
import chapterData from "../../../../data/chapters/micro-ch3.json";

// Core Master Page System
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { ChapterTabPanel } from "@/components/core/master-page/ChapterTabPanel";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";

// High-Fidelity Components
import { PageMap } from "@/components/core/enhanced/PageMap";
import { Introduction } from "@/components/core/master-page/Introduction";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { DeepDive } from "@/components/core/enhanced/DeepDive";
import { CommonMistakes } from "@/components/core/enhanced/CommonMistakes";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { StreetLevelSummary } from "@/components/core/master-page/StreetLevelSummary";
import { GuidedExercises } from "@/components/core/master-page/GuidedExercises";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import { ReferenceCard } from "@/components/core/master-page/ReferenceCard";
import { TriviaCard } from "@/components/core/master-page/TriviaCard";
import { ChapterBridge } from "@/components/core/master-page/ChapterBridge";
import { SummaryDashboard } from "@/components/core/master-page/SummaryDashboard";

export default function MicroChapter3Page() {
    const data: any = chapterData;

    const CHAPTER_TABS = [
        { id: "overview", label: "יתרון יחסי" },
        { id: "deep-dive", label: "התמחות" },
        { id: "practice", label: "תרגול" },
        { id: "summary", label: "סיכום" },
    ];

    return (
        <MasterPageLayout
            chapterTitle={data.title}
            tabs={CHAPTER_TABS}
        >
            {/* [TAB: Overview] */}
            <ChapterTabPanel id="overview">
                <PageMap
                    title={data.title}
                    data={data.pageMap}
                    currentChapter={3}
                    totalChapters={12}
                    courseName="מיקרו כלכלה"
                />

                <Introduction data={data.introduction} />
                <TeaserAnalogy content={data.teaserAnalogy.content} />
            </ChapterTabPanel>

            {/* [TAB: Deep Dive] */}
            <ChapterTabPanel id="deep-dive">
                <SectionWrapper id="definitions" sectionNumber={4}>
                    <DefinitionBlock
                        definitions={data.formalDefinitions.concepts.map((c: any) => ({
                            term: c.title,
                            definition: c.content
                        }))}
                    />
                </SectionWrapper>

                <ToneBreak
                    opener={data.toneBreak.opener}
                    content={data.toneBreak.content}
                />

                <DeepDive
                    data={data.deepDive}
                    domain="microeconomics"
                    title="מבט לעומק: יתרון יחסי ומוחלט"
                />
            </ChapterTabPanel>

            {/* [TAB: Practice] */}
            <ChapterTabPanel id="practice">
                <CommonMistakes data={data.commonMistakes} />

                <CheckpointQuiz questions={data.checkpoint} />

                <GuidedExercises data={data.guidedExercises} />

                {data.independentExercises && data.independentExercises.length > 0 && (
                    <SectionWrapper id="independent-exercise" sectionNumber={12} title="אתגר למקצוענים">
                        <IndependentExercise
                            title="אתגר למקצוענים"
                            difficulty={3}
                            question={data.independentExercises[0].question}
                            hint={data.independentExercises[0].hint}
                            answer={data.independentExercises[0].answer}
                        />
                    </SectionWrapper>
                )}
            </ChapterTabPanel>

            {/* [TAB: Summary] */}
            <ChapterTabPanel id="summary">
                <SummaryDashboard data={data} courseId="microeconomics" />
            </ChapterTabPanel>
        </MasterPageLayout>
    );
}
