"use client";

import React from "react";
import chapterData from "@/data/chapters/micro-ch1.json";

// Core Master Page System
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { ChapterTabPanel } from "@/components/core/master-page/ChapterTabPanel";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";

// High-Fidelity Components
import { PageMap } from "@/components/core/master-page/PageMap";
import { Introduction } from "@/components/core/master-page/Introduction";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { DeepDive } from "@/components/core/master-page/DeepDive";
import { CommonMistakes } from "@/components/core/master-page/CommonMistakes";
import { ClassificationGame } from "@/components/core/master-page/ClassificationGame";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { StreetLevelSummary } from "@/components/core/master-page/StreetLevelSummary";
import { GuidedExercise } from "@/components/core/master-page/GuidedExercise";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import { ReferenceCard } from "@/components/core/master-page/ReferenceCard";
import { TriviaCard } from "@/components/core/master-page/TriviaCard";
import { ChapterBridge } from "@/components/core/master-page/ChapterBridge";

export default function MicroChapter1Page() {
    const data: any = chapterData;

    // Define Dynamic Topics (Tabs) for this Chapter
    const MICRO_CH1_TABS = [
        { id: "overview", label: "מהו מדע הכלכלה?" },
        { id: "concepts", label: "מחסור וגורמי יצור" },
        { id: "practice", label: "תרגול ואתגר" },
        { id: "summary", label: "סיכום וגשר" },
    ];

    // Map JSON sections to PageMap items
    const pageMapItems = [
        { id: "1", title: "מבוא למדע הכלכלה", status: "completed" as const },
        { id: "2", title: "תופעת המחסור", status: "current" as const },
        { id: "3", title: "גורמי יצור", status: "upcoming" as const },
        { id: "4", title: "מוצרים כלכליים", status: "upcoming" as const }
    ];

    return (
        <MasterPageLayout
            chapterTitle={data.title}
            tabs={MICRO_CH1_TABS}
        >
            <div className="space-y-12">

                {/* [TAB: Overview] */}
                <ChapterTabPanel id="overview">
                    <SectionWrapper id="page-map" sectionNumber={1}>
                        <PageMap items={pageMapItems} />
                    </SectionWrapper>

                    <Introduction data={data.introduction} />

                    <TeaserAnalogy content={data.teaserAnalogy.content} />
                </ChapterTabPanel>

                {/* [TAB: Concepts] */}
                <ChapterTabPanel id="concepts">
                    <SectionWrapper id="definitions" sectionNumber={4}>
                        <DefinitionBlock
                            definitions={data.formalDefinitions.concepts.map((c: any) => ({
                                term: c.title,
                                definition: c.content
                            }))}
                        />
                    </SectionWrapper>

                    <SectionWrapper id="tone-break" sectionNumber={5}>
                        <ToneBreak
                            opener={data.toneBreak.opener}
                            content={data.toneBreak.content}
                        />
                    </SectionWrapper>

                    <SectionWrapper id="deep-dive" sectionNumber={6}>
                        <DeepDive title="צלילה עמוקה: מה הופך מוצר לכלכלי?">
                            <div className="space-y-4">
                                <p>{data.deepDive.determinants[0].content}</p>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 mt-4">
                                    <h5 className="font-bold text-teal-400 mb-2">טיפ למבחן:</h5>
                                    <ul className="list-disc pr-6 space-y-2 text-sm">
                                        {data.deepDive.examAppearance.tips.map((tip: string, i: number) => (
                                            <li key={i}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </DeepDive>
                    </SectionWrapper>

                    <CommonMistakes mistakes={data.commonMistakes} />
                </ChapterTabPanel>

                {/* [TAB: Practice] */}
                <ChapterTabPanel id="practice">
                    <SectionWrapper id="interactive-game" sectionNumber={8}>
                        <ClassificationGame data={data.interactiveElement} />
                    </SectionWrapper>

                    <CheckpointQuiz questions={data.checkpoint} />

                    <GuidedExercise
                        difficulty={1}
                        question={data.guidedExercises[0].question}
                        thinkingDirection="כדי לסווג גורמי יצור, עלינו לשאול: האם זה בן אדם (עבודה), האם זה משאב גולמי מהטבע (טבע), או האם זה מוצר שיוצר בעבר כדי לעזור לנו לייצר עכשיו (הון פיזי)?"
                        steps={data.guidedExercises[0].steps.map((s: any) => ({
                            title: s.title,
                            action: "סווג את המרכיבים לפי ההגדרות שלמדנו.",
                            reason: s.reasoning,
                            calculation: s.calculation,
                            result: s.reasoning // Using reasoning as result for this qualitative exercise
                        }))}
                        finalAnswer={data.guidedExercises[0].finalAnswer}
                    />

                    <SectionWrapper id="independent-exercise" sectionNumber={12} title="תרגול עצמאי">
                        <IndependentExercise
                            difficulty={3}
                            question={data.independentExercises[0].question}
                            hint="תחשבו על המשאב הכי יקר של כל בן אדם, בלי קשר לכמה כסף יש לו בבנק."
                            answer={data.independentExercises[0].finalAnswer}
                        />
                    </SectionWrapper>
                </ChapterTabPanel>

                {/* [TAB: Summary] */}
                <ChapterTabPanel id="summary">
                    <SectionWrapper id="street-summary" sectionNumber={10}>
                        <StreetLevelSummary
                            points={[{ title: "השורה התחתונה", content: data.streetSummary.content }]}
                        />
                    </SectionWrapper>

                    <SectionWrapper id="reference-card" sectionNumber={13}>
                        <ReferenceCard
                            formulas={data.quickReference.definitions.map((d: any) => ({
                                label: d.term,
                                formula: d.definition
                            }))}
                        />
                    </SectionWrapper>

                    <TriviaCard
                        fact={data.trivia[0].fact}
                    />

                    <ChapterBridge
                        nextChapter={{
                            id: data.navigation.next.id,
                            title: data.navigation.next.title,
                            description: "מה מחיר הוויתור על הבחירות שלנו?"
                        }}
                    />
                </ChapterTabPanel>

            </div>
        </MasterPageLayout>
    );
}
