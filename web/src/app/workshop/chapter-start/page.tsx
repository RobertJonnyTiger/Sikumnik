"use client";

import React, { useState } from "react";
import { WorkshopNav } from "../_components/WorkshopNav";
import { MOCK_CHAPTER_DATA, MOCK_TABS, SHELL_STYLE_DNA } from "../_data/mockChapter";
import { ChapterLanding } from "@/features/core-lessons/renderers/ChapterLanding";
import { ChapterProgressionBar } from "@/features/core-lessons/renderers/ChapterProgressionBar";
import { CourseBreadcrumb } from "@/features/core-lessons/renderers/CourseBreadcrumb";

// ═══════════════════════════════════════════════════════════════════
// Style Inspector (reused pattern from main workshop)
// ═══════════════════════════════════════════════════════════════════

function StyleRow({ label, value, color }: { label: string; value: string; color: string }) {
    const colorMap: Record<string, string> = {
        bg: "text-blue-400", text: "text-green-400", size: "text-yellow-400",
        weight: "text-orange-400", border: "text-purple-400", radius: "text-pink-400",
        spacing: "text-cyan-400", dir: "text-red-400", anim: "text-emerald-400",
    };
    return (
        <div className="flex gap-3">
            <span className="text-zinc-500 w-28 shrink-0">{label}</span>
            <span className={colorMap[color] || "text-zinc-300"}>{value || "—"}</span>
        </div>
    );
}

function ShellStyleInspector({ componentName }: { componentName: string }) {
    const [open, setOpen] = useState(false);
    const dna = SHELL_STYLE_DNA[componentName];

    if (!dna) {
        return (
            <div className="py-2">
                <span className="text-xs text-zinc-500 font-mono">⚠️ No Style DNA for &quot;{componentName}&quot;</span>
            </div>
        );
    }

    return (
        <div className="border-t border-zinc-800/50 py-3">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-mono cursor-pointer w-full text-left"
            >
                <span className="transition-transform duration-200" style={{ display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <span>🔍 {componentName}</span>
                <span className="ml-auto text-zinc-600 truncate max-w-[180px]">{dna.filePath}</span>
            </button>

            {open && (
                <div className="mt-2 bg-zinc-950/80 rounded-lg p-3 text-xs font-mono space-y-1.5 border border-zinc-800/50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <StyleRow label="Background" value={dna.background} color="bg" />
                    <StyleRow label="Text Color" value={dna.textColor} color="text" />
                    <StyleRow label="Font Size" value={dna.fontSize} color="size" />
                    <StyleRow label="Font Weight" value={dna.fontWeight} color="weight" />
                    <StyleRow label="Border" value={dna.border} color="border" />
                    <StyleRow label="Border Radius" value={dna.borderRadius} color="radius" />
                    <StyleRow label="Padding" value={dna.padding} color="spacing" />
                    <StyleRow label="Direction" value={dna.direction} color="dir" />
                    <StyleRow label="Animation" value={dna.animation} color="anim" />
                    {dna.notes && (
                        <div className="mt-1.5 pt-1.5 border-t border-zinc-800/50 text-zinc-500">
                            💡 {dna.notes}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════

export default function ChapterStartPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const COMPONENTS_ON_PAGE = ["CourseBreadcrumb", "ChapterLanding", "ChapterProgressionBar"];

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            <WorkshopNav />

            {/* Debug Banner */}
            <div className="fixed top-[52px] left-0 right-0 z-40 bg-emerald-950/90 backdrop-blur-sm border-b border-emerald-800/50 px-6 py-1.5 flex items-center justify-between" dir="ltr">
                <span className="text-emerald-400 text-xs font-mono font-bold">
                    🔬 Workshop: Chapter Start Simulation
                </span>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-emerald-500 text-xs font-mono hover:text-emerald-300 transition-colors cursor-pointer"
                >
                    {sidebarOpen ? "◂ Hide Inspector" : "▸ Show Inspector"}
                </button>
            </div>

            <div className="flex w-full">
                {/* Main Content — the actual simulation */}
                <main className={`flex-1 pt-[88px] transition-all duration-300 ${sidebarOpen ? "lg:pl-80" : ""}`}>

                    {/* CourseBreadcrumb — exactly as in ChapterTemplate */}
                    <CourseBreadcrumb
                        courseName={MOCK_CHAPTER_DATA.course}
                        chapterTitle={MOCK_CHAPTER_DATA.title}
                        currentTabTitle="הקדמה"
                        currentTabIndex={0}
                        totalTabs={MOCK_TABS.length}
                    />

                    {/* ChapterLanding — full width, real render */}
                    <ChapterLanding
                        data={MOCK_CHAPTER_DATA}
                        onStart={() => alert("🎯 Workshop: Start button clicked! In production this would navigate to the first topic tab.")}
                    />

                    {/* Spacer for progression bar */}
                    <div className="h-32" />

                    {/* ChapterProgressionBar — fixed bottom dock, pre-start state */}
                    <ChapterProgressionBar
                        tabs={MOCK_TABS}
                        activeTab={-1}
                        onTabChange={(idx) => alert(`🔬 Workshop: Tab ${idx + 1} clicked (${MOCK_TABS[idx]?.title || "הקדמה"})`)}
                        course={MOCK_CHAPTER_DATA.course}
                        chapterTitle={MOCK_CHAPTER_DATA.title}
                    />
                </main>

                {/* Style Inspector Sidebar — LEFT side (since page is RTL, left = visual right) */}
                {sidebarOpen && (
                    <aside className="fixed top-[88px] left-0 w-80 h-[calc(100vh-88px)] z-30 bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800 hidden lg:block overflow-hidden transition-all duration-300" dir="ltr">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-4 border-b border-zinc-800">
                                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">
                                    🔬 Shell Components
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1">
                                    {COMPONENTS_ON_PAGE.length} components on this page
                                </p>
                            </div>

                            {/* Component Inspectors */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600">
                                {COMPONENTS_ON_PAGE.map((name) => (
                                    <ShellStyleInspector key={name} componentName={name} />
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-3 border-t border-zinc-800 bg-zinc-950">
                                <p className="text-[10px] text-center text-zinc-600 font-mono">
                                    Chapter Start • Pre-entry State
                                </p>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}
