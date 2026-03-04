"use client";

import React from "react";
import type { ChapterData } from "@/types/chapter";
import { TopicTab } from "./TopicTab";
import { BlockRenderer } from "./BlockRenderer";

import { CheckpointQuiz } from "../blocks/CheckpointQuiz";
import { TopicSummary } from "../blocks/TopicSummary";
import { AiLecturer } from "@/components/ai/AiLecturer";
import { ChapterLanding } from "./ChapterLanding";
import { ChapterProgressionBar } from "./ChapterProgressionBar";
import { LessonFooter } from "./LessonFooter";
import { CourseBreadcrumb } from "./CourseBreadcrumb";
import { NarrativeSummary } from "../blocks/NarrativeSummary";

interface ChapterTemplateProps {
    data: ChapterData;
    interactiveRegistry?: Record<string, React.ReactNode>;
}

export const ChapterTemplate: React.FC<ChapterTemplateProps> = ({
    data,
    interactiveRegistry,
}) => {
    // Enrich data if introduction.hook is missing
    const enrichedData = React.useMemo(() => {
        const newData = { ...data };
        if (!newData.introduction?.hook) {
            // Find first block of type hook
            let hookBlock: any = null;
            for (const topic of newData.topics || []) {
                hookBlock = topic.blocks?.find(b => b.type === "hook");
                if (hookBlock) break;
            }

            if (hookBlock) {
                newData.introduction = {
                    ...newData.introduction,
                    content: newData.introduction?.content || "",
                    hook: hookBlock.opener || hookBlock.title || "",
                    whyItMatters: hookBlock.context || "",
                    reveal: hookBlock.reveal || "",
                };
            }
        }
        return newData;
    }, [data]);

    const [activeTab, setActiveTab] = React.useState(-1);

    // Build tabs: intro (if exists) + topics + wrap-up (if exists)
    const hasWrapUp = !!(enrichedData.checkpoint || enrichedData.independentExercises || enrichedData.quickReference || enrichedData.narrativeSummary);

    const tabs = [
        ...enrichedData.topics.map((t) => ({ id: t.id, title: t.title })),
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
        } else if (enrichedData.navigation?.next) {
            // Navigate to next chapter - try data.navigation.next.href first, 
            // then construct a robust fallback to avoid /undefined
            const nextId = (enrichedData.navigation.next as any).id?.replace("chapter-", "") || (enrichedData.navigation.next as any).chapterId || "";
            const href = enrichedData.navigation.next.href || `/courses/math/chapter-${nextId}`;

            window.location.href = href;
        }
    };

    const currentTabTitle = activeTab === -1 ? 'הקדמה' : tabs[activeTab]?.title;

    return (
        <div className="min-h-screen bg-background text-foreground font-main" dir="rtl">

            {/* Header: Breadcrumbs (Visible on all tabs) */}
            <CourseBreadcrumb
                courseName={enrichedData.course}
                chapterTitle={enrichedData.title}
                currentTabTitle={currentTabTitle}
                currentTabIndex={activeTab === -1 ? 0 : activeTab + 1}
                totalTabs={tabs.length}
            />

            {/* Chapter Intro/Lobby - Only on Intro State (-1) */}
            {activeTab === -1 && (
                <ChapterLanding
                    data={enrichedData}
                    onStart={() => handleTabChange(0)}
                />
            )}

            {/* Content Area */}
            {activeTab >= 0 && (
                <main className="max-w-4xl mx-auto px-4 py-8 pb-32">
                    {/* Topic Tabs */}
                    {enrichedData.topics.map((topic, idx) => (
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
                            {enrichedData.narrativeSummary && (
                                <NarrativeSummary
                                    data={enrichedData.narrativeSummary}
                                    nextChapter={enrichedData.navigation?.next}
                                />
                            )}

                            {/* Legacy Topic Summary (Fallback if no narrative) */}
                            {enrichedData.quickReference && !enrichedData.narrativeSummary && (
                                <TopicSummary
                                    content="סיכום הנושאים המרכזיים"
                                    keyPoints={enrichedData.quickReference.definitions.map(d => `${d.term}: ${d.definition}`)}
                                />
                            )}
                            {enrichedData.checkpoint && (
                                <CheckpointQuiz questions={enrichedData.checkpoint} />
                            )}
                        </div>
                    )}

                    {/* Lesson Footer: Trivia + Prev/Next Buttons */}
                    <LessonFooter
                        currentTabIndex={activeTab}
                        tabs={tabs}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        facts={enrichedData.trivia?.map((item) => ({
                            category: item.source || "הידעת?",
                            fact: item.fact,
                        }))}
                        topicData={activeTab >= 0 && activeTab < enrichedData.topics.length ? {
                            title: enrichedData.topics[activeTab].title,
                            blocks: enrichedData.topics[activeTab].blocks // Just for trivia context if needed
                        } : undefined}
                        courseName={enrichedData.course}
                        nextChapterTitle={activeTab === tabs.length - 1 ? enrichedData.navigation?.next?.title : undefined}
                    />
                </main>
            )}

            {/* AI Lecturer Chat */}
            <AiLecturer context={enrichedData} />

            {/* Global Chapter Progression Bar */}
            {/* Global Chapter Progression Bar */}
            <ChapterProgressionBar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                course={enrichedData.course}
                chapterTitle={enrichedData.title}
                nextChapter={enrichedData.bridge ? {
                    title: enrichedData.bridge.nextChapterTitle,
                    id: enrichedData.bridge.nextChapter
                } : undefined}
            />
        </div>
    );
};
