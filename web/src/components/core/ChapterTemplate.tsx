"use client";

import React from "react";
import type { ChapterData } from "@/types/chapter";
import { TopicTab } from "./TopicTab";
import { BlockRenderer } from "./BlockRenderer";
import { ChapterHeader } from "./ChapterHeader";
import { ChapterFooter } from "./ChapterFooter";
import { CheckpointQuiz } from "./blocks/CheckpointQuiz";
import { TopicSummary } from "./blocks/TopicSummary";
import { AiLecturer } from "@/components/ai/AiLecturer";

interface ChapterTemplateProps {
    data: ChapterData;
    interactiveRegistry?: Record<string, React.ReactNode>;
}

export const ChapterTemplate: React.FC<ChapterTemplateProps> = ({
    data,
    interactiveRegistry,
}) => {
    const [activeTab, setActiveTab] = React.useState(0);

    // Build tabs: intro (if exists) + topics + wrap-up (if exists)
    const hasWrapUp = !!(data.checkpoint || data.independentExercises || data.quickReference);

    const tabs = [
        ...data.topics.map((t) => ({ id: t.id, label: t.title })),
        ...(hasWrapUp ? [{ id: "wrap-up", label: "סיכום ותרגול" }] : []),
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-main" dir="rtl">
            {/* Chapter Header - Only show on first tab */}
            {activeTab === 0 && (
                <ChapterHeader
                    title={data.title}
                    course={data.course}
                    chapterNumber={data.chapterNumber}
                    totalChapters={data.totalChapters}
                    pageMap={data.pageMap}
                    introduction={data.introduction}
                />
            )}

            {/* Topic Tabs Navigation */}
            <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
                        {tabs.map((tab, idx) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(idx)}
                                className={`
                  px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap
                  transition-all duration-300 shrink-0
                  ${activeTab === idx
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <main className="max-w-4xl mx-auto px-4 py-8">
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
                    <div className="space-y-8">
                        {data.quickReference && (
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
            </main>

            {/* Chapter Footer */}
            <ChapterFooter
                navigation={data.navigation}
                bridge={data.bridge}
                trivia={data.trivia}
            />

            {/* AI Lecturer Chat */}
            <AiLecturer context={data} />
        </div>
    );
};
