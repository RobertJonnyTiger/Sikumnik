"use client";

import React from "react";
import { ChapterData } from "@/types/chapter";

// Core Master Page System
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { ChapterTabPanel } from "@/components/core/master-page/ChapterTabPanel";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";

// High-Fidelity Components
import { Introduction } from "@/components/core/master-page/Introduction";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { DeepDive } from "@/components/core/enhanced/DeepDive";
import { CommonMistakes } from "@/components/core/enhanced/CommonMistakes";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { StreetLevelSummary } from "@/components/core/master-page/StreetLevelSummary";
import { GuidedExercises } from "@/components/core/enhanced/GuidedExercises";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import { ReferenceCard } from "@/components/core/master-page/ReferenceCard";
import { TriviaCard } from "@/components/core/master-page/TriviaCard";
import { ChapterBridge } from "@/components/core/master-page/ChapterBridge";
import { SummaryDashboard } from "@/components/core/master-page/SummaryDashboard";

interface MasterChapterTemplateProps {
    data: ChapterData;
    /**
     * Optional slot for a domain-specific interactive component (Graph, Game, Simulation).
     * This will be rendered in the Concept/Lab tab.
     */
    interactiveComponent?: React.ReactNode;
    /**
     * Title for the interactive section. Defaults to "המעבדה"
     */
    interactiveTitle?: string;
}

export const MasterChapterTemplate: React.FC<MasterChapterTemplateProps> = ({
    data,
    interactiveComponent,
    interactiveTitle = "המעבדה"
}) => {
    // Standard Tab Configuration
    const CHAPTER_TABS = [
        { id: "overview", label: "מושגים והגדרה" },
        { id: "concepts", label: "המעבדה והעמקה" },
        { id: "practice", label: "תרגול וחישוב" },
        { id: "summary", label: "סיכום הפרק" },
    ];

    return (
        <MasterPageLayout
            chapterTitle={data.title}
            tabs={CHAPTER_TABS}
        >
            {/* [TAB 1: Overview] */}
            <ChapterTabPanel id="overview">
                {/* 1. Introduction */}
                <Introduction data={data.introduction} />

                {/* 2. Teaser/Analogy */}
                <TeaserAnalogy content={data.teaserAnalogy.content} />

                {/* 3. Formal Definitions */}
                <SectionWrapper id="definitions" sectionNumber={1} title="הגדרות פורמליות">
                    <DefinitionBlock
                        definitions={data.formalDefinitions.concepts.map((c: any) => ({
                            term: c.title,
                            definition: c.content
                        }))}
                    />
                </SectionWrapper>
            </ChapterTabPanel>

            {/* [TAB 2: Concepts & Lab] */}
            <ChapterTabPanel id="concepts">
                {/* 4. Interactive Slot (The Lab) */}
                {interactiveComponent && (
                    <SectionWrapper id="interactive-lab" sectionNumber={2} title={interactiveTitle}>
                        {interactiveComponent}
                    </SectionWrapper>
                )}

                {/* 5. Tone Break (The Street Smart) */}
                <ToneBreak
                    opener={data.toneBreak.opener}
                    content={data.toneBreak.content}
                    academicTitle={data.toneBreak.academicTitle}
                    academicContent={data.toneBreak.academicContent}
                />

                {/* 6. Deep Dive (The Professor) */}
                <DeepDive
                    data={data.deepDive}
                    domain="accounting" // Default domain, can be dynamic if needed
                    title="מבט לעומק"
                />
            </ChapterTabPanel>

            {/* [TAB 3: Practice] */}
            <ChapterTabPanel id="practice">
                {/* 7. Common Mistakes */}
                <CommonMistakes data={data.commonMistakes} />

                {/* 8. Checkpoint Quiz */}
                <CheckpointQuiz
                    questions={data.checkpoint.map((q, i) => ({
                        id: q.id || `q${i}`,
                        text: q.text || q.question || "",
                        options: q.options || [],
                        correctIndex: q.correctIndex ?? (q.correct !== undefined ? (q.correct ? 0 : 0) : 0),
                        correct: q.correct,
                        explanation: q.explanation
                    }))}
                />

                {/* 9. Guided Exercises */}
                <GuidedExercises data={data.guidedExercises} />

                {/* 10. Independent Exercises */}
                <SectionWrapper id="independent-exercise" sectionNumber={10} title="תרגול עצמאי (אתגר למקצוענים)">
                    <div className="space-y-8">
                        {data.independentExercises.map((ex, idx) => (
                            <IndependentExercise
                                key={idx}
                                title={`תרגיל ${idx + 1}`} // Added title prop
                                difficulty={ex.difficulty}
                                question={ex.question}
                                options={ex.options}
                                hint={ex.hint}
                                answer={ex.answer}
                                isExamStyle={ex.isExamStyle}
                            />
                        ))}
                    </div>
                </SectionWrapper>
            </ChapterTabPanel>

            {/* [TAB 4: Summary] */}
            <ChapterTabPanel id="summary">
                <SummaryDashboard
                    data={data}
                    // TODO: Pass courseId properly. For now deriving or hardcoding based on context if strictly necessary, 
                    // but ideally MasterPageProps should have it. 
                    // Assuming 'microeconomics' for now as per previous hardcode, or we need to add courseId to props.
                    courseId="microeconomics"
                />
            </ChapterTabPanel>
        </MasterPageLayout>
    );
}
