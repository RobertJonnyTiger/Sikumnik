"use client";

import React from "react";
import type { ChapterData } from "@/types/chapter";
import { TopicTab } from "./TopicTab";
import { BlockRenderer } from "./BlockRenderer";

import { CheckpointQuiz } from "./blocks/CheckpointQuiz";
import { TopicSummary } from "./blocks/TopicSummary";
import { AiLecturer } from "@/components/ai/AiLecturer";
import { ChapterLanding } from "./ChapterLanding";
import { ChapterProgressionBar } from "./ChapterProgressionBar";
import { LessonFooter } from "./LessonFooter";
import { CourseBreadcrumb } from "./CourseBreadcrumb";
import { NarrativeSummary } from "./blocks/NarrativeSummary";

interface ChapterTemplateProps {
    data: ChapterData;
    interactiveRegistry?: Record<string, React.ReactNode>;
}

export const ChapterTemplate: React.FC<ChapterTemplateProps> = ({
    data,
    interactiveRegistry,
}) => {
    const [activeTab, setActiveTab] = React.useState(-1);

    // Build tabs: intro (if exists) + topics + wrap-up (if exists)
    const hasWrapUp = !!(data.checkpoint || data.independentExercises || data.quickReference || data.narrativeSummary);

    const tabs = [
        ...data.topics.map((t) => ({ id: t.id, title: t.title })),
        ...(hasWrapUp ? [{ id: "wrap-up", title: "סיכום ותרגול" }] : []),
    ];

    // Handle Scroll to top on tab change
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrevious = () => {
        if (activeTab > -1) {
            handleTabChange(activeTab - 1);
        }
    };

    const handleNext = () => {
        if (activeTab < tabs.length - 1) {
            handleTabChange(activeTab + 1);
        } else if (data.navigation?.next) {
            // Navigate to next chapter
            window.location.href = data.navigation.next.href; // Or use router.push if available
        }
    };

    const currentTabTitle = activeTab === -1 ? 'הקדמה' : tabs[activeTab]?.title;

    return (
        <div className="min-h-screen bg-background text-foreground font-main" dir="rtl">

            {/* Header: Breadcrumbs (Visible on all tabs) */}
            <CourseBreadcrumb
                courseName={data.course}
                chapterTitle={data.title}
                currentTabTitle={currentTabTitle}
                currentTabIndex={activeTab === -1 ? 0 : activeTab + 1}
                totalTabs={tabs.length}
            />

            {/* Chapter Intro/Lobby - Only on Intro State (-1) */}
            {activeTab === -1 && (
                <ChapterLanding
                    data={data}
                    onStart={() => handleTabChange(0)}
                />
            )}

            {/* Content Area */}
            {activeTab >= 0 && (
                <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
                    {/* Topic Tabs */}
                    {data.topics.map((topic, idx) => (
                        <TopicTab key={topic.id} isActive={activeTab === idx}>
                            {topic.blocks.map((block, blockIdx) => (
                                <BlockRenderer
                                    key={blockIdx}
                                    block={block}
                                    interactiveRegistry={interactiveRegistry}
                                />
                            ))}
                        </TopicTab>
                    ))}

                    {/* Wrap-Up Tab */}
                    {hasWrapUp && activeTab === tabs.length - 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                            {/* Narrative Summary (The "Bird's Eye" View) */}
                            {data.narrativeSummary && (
                                <NarrativeSummary
                                    data={data.narrativeSummary}
                                    nextChapter={data.navigation?.next}
                                />
                            )}

                            {/* Legacy Topic Summary (Fallback if no narrative) */}
                            {data.quickReference && !data.narrativeSummary && (
                                <TopicSummary
                                    content="סיכום הנושאים המרכזיים"
                                    keyPoints={data.quickReference.definitions.map(d => `${d.term}: ${d.definition}`)}
                                />
                            )}
                            {data.checkpoint && (
                                <CheckpointQuiz questions={data.checkpoint} />
                            )}
                        </div>
                    )}

                    {/* Lesson Footer: Trivia + Prev/Next Buttons */}
                    <LessonFooter
                        currentTabIndex={activeTab}
                        tabs={tabs}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        facts={data.trivia?.map((item) => ({
                            category: item.source || "הידעת?",
                            fact: item.fact,
                        }))}
                        topicData={activeTab >= 0 && activeTab < data.topics.length ? {
                            title: data.topics[activeTab].title,
                            blocks: data.topics[activeTab].blocks // Just for trivia context if needed
                        } : undefined}
                        courseName={data.course}
                        nextChapterTitle={activeTab === tabs.length - 1 ? data.navigation?.next?.title : undefined}
                    />
                </main>
            )}

            {/* AI Lecturer Chat */}
            <AiLecturer context={data} />

            {/* Global Chapter Progression Bar */}
            {/* Global Chapter Progression Bar */}
            <ChapterProgressionBar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                course={data.course}
                chapterTitle={data.title}
                nextChapter={data.bridge ? {
                    title: data.bridge.nextChapterTitle,
                    id: data.bridge.nextChapter
                } : undefined}
            />
        </div>
    );
};
