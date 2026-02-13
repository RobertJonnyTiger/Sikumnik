"use client";

import { useState, useCallback, useEffect } from "react";

export type ChapterTab = string;

export interface TabConfig {
    id: ChapterTab;
    label: string;
}

export const DEFAULT_TABS: TabConfig[] = [
    { id: "overview", label: "מבוא" },
    { id: "concepts", label: "מושגים" },
    { id: "practice", label: "תרגול" },
    { id: "summary", label: "סיכום" },
];

export function useChapterState(tabs: TabConfig[] = DEFAULT_TABS) {
    const [activeTab, setActiveTab] = useState<ChapterTab>(tabs[0]?.id || "overview");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedTab = localStorage.getItem("sikumnik_active_tab");
        const savedSidebar = localStorage.getItem("sikumnik_sidebar_collapsed");

        if (savedTab && tabs.some(t => t.id === savedTab)) {
            setActiveTab(savedTab);
        }
        if (savedSidebar !== null) {
            setIsSidebarCollapsed(savedSidebar === "true");
        }
        setIsLoaded(true);
    }, [tabs]);

    // Save to localStorage when state changes
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("sikumnik_active_tab", activeTab);
        localStorage.setItem("sikumnik_sidebar_collapsed", String(isSidebarCollapsed));
    }, [activeTab, isSidebarCollapsed, isLoaded]);

    const toggleSidebar = useCallback(() => {
        setIsSidebarCollapsed((prev) => !prev);
    }, []);

    return {
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
        tabs,
    };
}

