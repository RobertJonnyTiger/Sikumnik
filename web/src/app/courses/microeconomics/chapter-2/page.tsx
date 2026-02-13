"use client";

import * as React from "react";
import chapterData from "../../../../data/chapters/micro-ch2.json";

// Core Master Page System
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { ChapterTabPanel } from "@/components/core/master-page/ChapterTabPanel";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";

// High-Fidelity Components
import { Introduction } from "@/components/core/master-page/Introduction";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { DeepDive } from "@/components/core/master-page/DeepDive";
import { CommonMistakes } from "@/components/core/master-page/CommonMistakes";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { StreetLevelSummary } from "@/components/core/master-page/StreetLevelSummary";
import { GuidedExercise } from "@/components/core/master-page/GuidedExercise";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import { ReferenceCard } from "@/components/core/master-page/ReferenceCard";
import { TriviaCard } from "@/components/core/master-page/TriviaCard";
import { ChapterBridge } from "@/components/core/master-page/ChapterBridge";

// Domain Specific
import { PPFGraph } from "@/components/microeconomics/PPFGraph";

export default function MicroChapter2Page() {
    const data: any = chapterData;

    const CHAPTER_TABS = [
        { id: "overview", label: "עלות וויתור" },
        { id: "ppf", label: "עקומת התמורה" },
        { id: "practice", label: "תרגול וחישוב" },
        { id: "summary", label: "סיכום הפרק" },
    ];

    return (
        <MasterPageLayout
            chapterTitle={data.title}
            tabs={CHAPTER_TABS}
        >
            <div className="space-y-12">

                {/* [TAB: Overview] */}
                <ChapterTabPanel id="overview">
                    <Introduction data={data.introduction} />
                    <TeaserAnalogy content={data.teaserAnalogy.content} />
                </ChapterTabPanel>

                {/* [TAB: PPF] */}
                <ChapterTabPanel id="ppf">
                    <SectionWrapper id="ppf-interactive" sectionNumber={6} title="המעבדה הכלכלית: עקומת התמורה">
                        <PPFGraph />
                    </SectionWrapper>

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

                    <DeepDive title="יעילות מול אבטלה">
                        <p>{data.deepDive.determinants[0].content}</p>
                    </DeepDive>
                </ChapterTabPanel>

                {/* [TAB: Practice] */}
                <ChapterTabPanel id="practice">
                    <CommonMistakes mistakes={data.commonMistakes} />

                    <CheckpointQuiz questions={data.checkpoint} />

                    <GuidedExercise
                        difficulty={data.guidedExercises[0].difficulty}
                        question={data.guidedExercises[0].question}
                        thinkingDirection="כדי לחשב עלות שולית, אנחנו בודקים כמה 'הפסדנו' (Y) חלקי כמה 'הרווחנו' (X). בפרק הזה אנחנו מתרכזים בויתור על היחידה הבאה."
                        steps={data.guidedExercises[0].steps}
                        finalAnswer={data.guidedExercises[0].finalAnswer}
                    />

                    <SectionWrapper id="independent-exercise" sectionNumber={12} title="אתגר למקצוענים">
                        <IndependentExercise
                            difficulty={3}
                            question={data.independentExercises[0].question}
                            hint={data.independentExercises[0].hint}
                            answer={data.independentExercises[0].answer}
                        />
                    </SectionWrapper>
                </ChapterTabPanel>

                {/* [TAB: Summary] */}
                <ChapterTabPanel id="summary">
                    <StreetLevelSummary
                        points={[{ title: "השורה התחתונה", content: data.streetSummary.content }]}
                    />

                    <ReferenceCard
                        formulas={data.quickReference.formulas}
                    />

                    <TriviaCard
                        fact={data.trivia[0].fact}
                        source={data.trivia[0].source}
                    />

                    <ChapterBridge
                        nextChapter={{
                            id: data.bridge.nextChapter,
                            title: data.bridge.nextChapterTitle,
                            description: data.bridge.content
                        }}
                    />
                </ChapterTabPanel>

            </div>
        </MasterPageLayout>
    );
}
