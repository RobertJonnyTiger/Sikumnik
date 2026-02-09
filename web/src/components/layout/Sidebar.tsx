"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    Book,
    GraduationCap,
    LayoutDashboard,
    Lock,
    Sparkles
} from "lucide-react";

// --- Navigation Data ---
const navigationData = [
    {
        title: "בית הספר לניהול (B.A)",
        icon: GraduationCap,
        items: [
            {
                title: "חשבונאות א'",
                href: "/courses/accounting",
                expanded: true,
                items: [
                    { title: "פרק 1: מבוא ומושגי יסוד", href: "/courses/accounting/intro" },
                    { title: "פרק 2: עריכת מאזן", href: "/courses/accounting/chapter-2" },
                    { title: "פרק 3: דוח רווח והפסד", href: "/courses/accounting/chapter-3" },
                    { title: "פרק 4: פקודות יומן", href: "/courses/accounting/chapter-4" },
                    { title: "פרק 5: מאזן בוחן", href: "/courses/accounting/chapter-5" },
                    { title: "פרק 6: התהליך החשבונאי", href: "/courses/accounting/chapter-6" },
                    { title: "פרק 7: כרטיסי חתך", href: "/courses/accounting/chapter-7" },
                    { title: "פרק 8: חישובי מלאי", href: "/courses/accounting/chapter-8" },
                    { title: "פרק 9: שיטות מלאי (FIFO)", href: "/courses/accounting/chapter-9" },
                    { title: "פרק 10: רכוש קבוע", href: "/courses/accounting/chapter-10" },
                    { title: "פרק 11: לקוחות וחומ\"ס", href: "/courses/accounting/chapter-11" },
                    { title: "פרק 12: גיול חובות", href: "/courses/accounting/chapter-12" },
                ]
            },
            { title: "מיקרו כלכלה", href: "/courses/microeconomics", locked: true },
            { title: "סטטיסטיקה א'", href: "/courses/statistics", locked: true }
        ]
    }
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn("bg-[#0f172a] border-l border-white/5 flex flex-col h-screen sticky top-0 overflow-y-auto w-72 shrink-0 z-50", className)}>

            {/* Brand / Logo */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-[#3b82f6] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-105 transition-transform duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-black text-xl text-white tracking-tight block">Sikumnik</span>
                        <span className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest">Inner Sanctum</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Tree */}
            <nav className="flex-1 p-4 space-y-8 mt-4">

                {/* Dashboard Link */}
                <div className="px-2">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group relative overflow-hidden",
                            pathname === "/"
                                ? "text-white bg-[#3b82f6]/10 border border-[#3b82f6]/30"
                                : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                        )}
                    >
                        {pathname === "/" && <div className="absolute inset-y-0 right-0 w-1 bg-[#3b82f6]" />}
                        <LayoutDashboard className={cn("w-5 h-5", pathname === "/" ? "text-[#3b82f6]" : "text-slate-600")} />
                        <span>לוח בקרה</span>
                    </Link>
                </div>

                {/* Degrees */}
                {navigationData.map((degree, i) => (
                    <div key={i} className="space-y-4">
                        <h3 className="flex items-center gap-2 px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">
                            {degree.title}
                        </h3>

                        <div className="space-y-1">
                            {degree.items.map((course, j) => (
                                <div key={j} className="space-y-1 group/course">
                                    {/* Course Header */}
                                    <div className={cn(
                                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all relative overflow-hidden",
                                        course.locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-white/5 text-slate-300 hover:text-white"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-2 h-2 rounded-full", course.locked ? "bg-slate-700" : "bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)]")} />
                                            <span className="font-bold tracking-tight">{course.title}</span>
                                        </div>
                                        {course.locked ? <Lock className="w-3 h-3 text-slate-800" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                                    </div>

                                    {/* Course Chapters */}
                                    {!course.locked && course.items && (
                                        <div className="mr-6 pr-4 space-y-1 border-r border-white/5 mt-1">
                                            {course.items.map((chapter, k) => {
                                                const isActive = pathname === chapter.href;
                                                return (
                                                    <Link
                                                        key={k}
                                                        href={chapter.href}
                                                        className={cn(
                                                            "block px-3 py-2 text-xs rounded-lg transition-all relative group/item",
                                                            isActive
                                                                ? "text-[#fbbf24] bg-[#fbbf24]/5 font-bold"
                                                                : "text-slate-500 hover:text-slate-300"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {isActive && <div className="w-1 h-1 rounded-full bg-[#fbbf24] animate-pulse" />}
                                                            <span>{chapter.title}</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* AI Assistant Indicator */}
            <div className="px-6 pb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-[#fbbf24]/10 border border-white/5 relative overflow-hidden group/ai">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#3b82f6]/10 blur-xl opacity-0 group-hover/ai:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-3 relative z-10">
                        <Sparkles className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Sanctum Active</span>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#fbbf24] p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-[#3b82f6]/20 flex items-center justify-center text-xs font-bold text-white uppercase italic">
                                S
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white truncate tracking-tight">סטודנט עייף</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate">שנה א׳ • ניהול</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}
