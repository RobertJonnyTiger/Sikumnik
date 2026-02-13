"use client";

import React from "react";
import { useChapterContext } from "./ChapterContext";
import { TABS } from "./useChapterState";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ChapterNavigationFooter: React.FC = () => {
    const { activeTab, setActiveTab } = useChapterContext();

    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    const nextTab = TABS[currentIndex + 1];
    const prevTab = TABS[currentIndex - 1];

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId as any);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Reset scroll
    };

    return (
        <div className="mt-12 flex items-center justify-between">
            {/* Previous Button (Right Side in RTL) */}
            <button
                onClick={() => prevTab && handleTabChange(prevTab.id)}
                disabled={!prevTab}
                className={cn(
                    "group flex items-center gap-3 pr-4 pl-6 py-4 rounded-full transition-all duration-300 border",
                    prevTab
                        ? "bg-slate-900 border-slate-800 hover:border-teal-500/50 hover:bg-slate-800 cursor-pointer"
                        : "bg-slate-900/50 border-slate-800/50 opacity-50 cursor-not-allowed"
                )}
            >
                <div className={cn(
                    "p-2 rounded-full transition-all shadow-lg",
                    prevTab
                        ? "bg-slate-800 text-teal-500 group-hover:bg-teal-500 group-hover:text-white"
                        : "bg-slate-800/50 text-slate-600"
                )}>
                    <ChevronRight size={20} />
                </div>
                <div className="text-right">
                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                        חזור
                    </span>
                    <span className={cn(
                        "block text-lg font-bold transition-colors",
                        prevTab
                            ? "text-slate-200 group-hover:text-teal-400"
                            : "text-slate-600"
                    )}>
                        {prevTab ? prevTab.label : "התחלה"}
                    </span>
                </div>
            </button>


            {/* Next Button (Left Side in RTL) */}
            {nextTab ? (
                <button
                    onClick={() => handleTabChange(nextTab.id)}
                    className="group flex items-center gap-3 pl-4 pr-6 py-4 bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800 rounded-full transition-all duration-300"
                >
                    <div className="text-left">
                        <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                            המשך
                        </span>
                        <span className="block text-lg font-bold text-slate-200 group-hover:text-teal-400 transition-colors">
                            {nextTab.label}
                        </span>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-full group-hover:bg-teal-500 text-teal-500 group-hover:text-white transition-all shadow-lg">
                        <ChevronLeft size={20} />
                    </div>
                </button>
            ) : (
                /* Placeholder to keep spacing if no next tab (last tab) */
                <div className="w-[140px]" />
            )}
        </div>
    );
};
