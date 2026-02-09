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
        <aside className={cn("bg-card border-l border-border flex flex-col h-screen sticky top-0 overflow-y-auto w-80 shrink-0 z-50 shadow-premium", className)}>

            {/* Brand / Logo */}
            <div className="p-8 border-b border-border bg-linear-to-b from-primary/[0.02] to-transparent">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-black text-2xl text-foreground tracking-tight block leading-none mb-1">סיכומניק</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">PLATFORM V3</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Tree */}
            <nav className="flex-1 p-6 space-y-10 mt-6">

                {/* Dashboard Link */}
                <div className="px-2">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-black transition-all group relative overflow-hidden",
                            pathname === "/"
                                ? "text-primary bg-primary/5 border border-primary/10 shadow-sm"
                                : "text-foreground/50 hover:text-primary hover:bg-primary/5"
                        )}
                    >
                        {pathname === "/" && <div className="absolute inset-y-0 right-0 w-1.5 bg-primary rounded-l-full" />}
                        <LayoutDashboard className={cn("w-6 h-6", pathname === "/" ? "text-primary" : "text-foreground/30")} />
                        <span>לוח בקרה</span>
                    </Link>
                </div>

                {/* Degrees */}
                {navigationData.map((degree, i) => (
                    <div key={i} className="space-y-6">
                        <h3 className="flex items-center gap-2 px-6 text-[11px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-4">
                            {degree.title}
                        </h3>

                        <div className="space-y-2">
                            {degree.items.map((course, j) => (
                                <div key={j} className="space-y-2 group/course">
                                    {/* Course Header */}
                                    <div className={cn(
                                        "flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all relative overflow-hidden",
                                        course.locked ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-primary/5 text-foreground/70 hover:text-primary"
                                    )}>
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2.5 h-2.5 rounded-full", course.locked ? "bg-foreground/20" : "bg-primary shadow-sm shadow-primary/40")} />
                                            <span className="font-black tracking-tight text-base">{course.title}</span>
                                        </div>
                                        {course.locked ? <Lock className="w-3 h-3 text-foreground/30" /> : <ChevronDown className="w-5 h-5 text-foreground/20 group-hover/course:text-primary transition-colors" />}
                                    </div>

                                    {/* Course Chapters */}
                                    {!course.locked && course.items && (
                                        <div className="mr-8 pr-6 space-y-2 border-r-2 border-border/50 mt-2">
                                            {course.items.map((chapter, k) => {
                                                const isActive = pathname === chapter.href;
                                                return (
                                                    <Link
                                                        key={k}
                                                        href={chapter.href}
                                                        className={cn(
                                                            "block px-4 py-3 text-sm rounded-xl transition-all relative group/item",
                                                            isActive
                                                                ? "text-accent bg-accent/5 font-black shadow-sm border border-accent/10"
                                                                : "text-foreground/50 hover:text-primary hover:bg-primary/5"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {isActive && <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
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
            <div className="px-8 pb-6">
                <div className="p-6 rounded-3xl bg-linear-to-br from-primary/5 to-accent/5 border border-border relative overflow-hidden group/ai shadow-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl opacity-0 group-hover/ai:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4 relative z-10">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">AI ASSISTANT READY</span>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-8 border-t border-border bg-primary/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-primary to-accent p-[2px] shadow-sm">
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm font-black text-primary uppercase italic">
                                S
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-base font-black text-foreground truncate tracking-tight">סטודנט עייף</p>
                        <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest truncate mt-0.5">שנה א׳ • ניהול</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}
