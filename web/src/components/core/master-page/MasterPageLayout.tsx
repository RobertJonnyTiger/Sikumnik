"use client";

import React from "react";
import { ChapterTabs } from "./ChapterTabs";
import { ChapterProvider, useChapterContext } from "./ChapterContext";
import { ChapterNavigationFooter } from "./ChapterNavigationFooter";
import { cn } from "@/lib/utils";

import { ChapterTab, TabConfig } from "./useChapterState";

interface MasterPageLayoutProps {
    children: React.ReactNode;
    chapterTitle: string;
    tabs?: TabConfig[];
}

// Inner component to consume context
function MasterPageContent({ children, chapterTitle }: MasterPageLayoutProps) {
    const {
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        toggleSidebar,
    } = useChapterContext();

    return (
        <div className="min-h-screen bg-[#050b18] text-slate-200 flex" dir="rtl">

            {/* Sidebar is now handled globally by NavigationWrapper */}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Sticky Tabs */}
                <ChapterTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Content Container */}
                <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full pb-24">
                    {children}

                    {/* Navigation Footer */}
                    <ChapterNavigationFooter />
                </div>
            </main>
        </div>
    );
}

export function MasterPageLayout({ children, chapterTitle, tabs }: MasterPageLayoutProps) {
    return (
        <ChapterProvider tabs={tabs}>
            <MasterPageContent children={children} chapterTitle={chapterTitle} />
        </ChapterProvider>
    );
}
