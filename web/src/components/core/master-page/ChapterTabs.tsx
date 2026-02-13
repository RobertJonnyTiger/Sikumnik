"use client";

import React from "react";
import { ChapterTab, TabConfig } from "./useChapterState";
import { useChapterContext } from "./ChapterContext";
import { cn } from "@/lib/utils";

interface ChapterTabsProps {
    activeTab: ChapterTab;
    onTabChange: (tab: ChapterTab) => void;
}

export const ChapterTabs: React.FC<ChapterTabsProps> = ({
    activeTab,
    onTabChange,
}) => {
    const { tabs } = useChapterContext();

    return (
        // Fixed Height 72px
        <div className="sticky top-0 z-40 w-full h-[72px] bg-[#050b18]/95 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6">

            {/* Scrollable Tabs Container - w-full to allow flex-1 children to expand */}
            <div className="flex items-center w-full h-full overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                // Added flex-1 to expand tabs, text-center for alignment
                                "relative flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-400 px-4 min-w-[100px]",
                                isActive
                                    ? "text-teal-400"
                                    : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            {tab.label}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-teal-400 rounded-t-full shadow-[0_-2px_6px_rgba(45,212,191,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
