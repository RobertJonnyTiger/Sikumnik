"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useChapterState, ChapterTab, TabConfig } from "./useChapterState";

interface ChapterContextType {
    activeTab: ChapterTab;
    setActiveTab: (tab: ChapterTab) => void;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    tabs: TabConfig[];
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export function ChapterProvider({ children, tabs }: { children: ReactNode; tabs?: TabConfig[] }) {
    const state = useChapterState(tabs);

    return (
        <ChapterContext.Provider value={state}>
            {children}
        </ChapterContext.Provider>
    );
}

export function useChapterContext() {
    const context = useContext(ChapterContext);
    if (context === undefined) {
        throw new Error("useChapterContext must be used within a ChapterProvider");
    }
    return context;
}
