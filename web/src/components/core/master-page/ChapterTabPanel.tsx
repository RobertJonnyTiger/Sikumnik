"use client";

import React from "react";
import { useChapterContext } from "./ChapterContext";
import { ChapterTab } from "./useChapterState";
import { cn } from "@/lib/utils";

interface ChapterTabPanelProps {
    id: ChapterTab;
    children: React.ReactNode;
    className?: string;
}

export const ChapterTabPanel: React.FC<ChapterTabPanelProps> = ({
    id,
    children,
    className,
}) => {
    const { activeTab } = useChapterContext();

    if (activeTab !== id) return null;

    return (
        <div
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            className={cn("animate-in fade-in slide-in-from-bottom-2 duration-300", className)}
        >
            {children}
        </div>
    );
};
