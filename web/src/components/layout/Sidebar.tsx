"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ChevronLeft,
    Book,
    GraduationCap,
    FileText,
    LayoutDashboard
} from "lucide-react";

// --- Mock Navigation Data ---
type NavItem = {
    title: string;
    href: string;
    expanded?: boolean;
    locked?: boolean;
    items?: NavItem[];
};

const navigationData: { title: string; icon: any; items: NavItem[] }[] = [
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
            {
                title: "מיקרו כלכלה",
                href: "/courses/microeconomics",
                locked: true,
                items: []
            },
            {
                title: "סטטיסטיקה",
                href: "/courses/statistics",
                locked: true,
                items: []
            }
        ]
    }
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn("bg-slate-950 border-l border-slate-800 flex flex-col h-screen sticky top-0 overflow-y-auto", className)}>

            {/* Brand */}
            <div className="p-6 border-b border-slate-900/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                        <GraduationCap className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="font-bold text-slate-200 group-hover:text-white transition-colors">Sikumnik</span>
                </Link>
            </div>

            {/* Navigation Tree */}
            <nav className="flex-1 p-4 space-y-8">

                {/* Dashboard Link */}
                <div>
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                            pathname === "/"
                                ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                        )}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>לוח בקרה</span>
                    </Link>
                </div>

                {/* Degrees */}
                {navigationData.map((degree, i) => (
                    <div key={i}>
                        <h3 className="flex items-center gap-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                            <degree.icon className="w-3 h-3" />
                            {degree.title}
                        </h3>

                        <div className="space-y-1">
                            {degree.items.map((course, j) => (
                                <div key={j} className="space-y-1">
                                    {/* Course Header */}
                                    <div className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group select-none",
                                        course.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-slate-900"
                                    )}>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Book className="w-4 h-4 text-indigo-500" />
                                            <span className="font-bold">{course.title}</span>
                                        </div>
                                        {!course.locked && <ChevronDown className="w-3 h-3 text-slate-600" />}
                                    </div>

                                    {/* Course Chapters */}
                                    {!course.locked && course.items && (
                                        <div className="pr-9 space-y-0.5 border-r border-slate-800 mr-4">
                                            {course.items.map((chapter, k) => {
                                                const isActive = pathname === chapter.href;
                                                return (
                                                    <Link
                                                        key={k}
                                                        href={chapter.locked ? "#" : chapter.href}
                                                        className={cn(
                                                            "block px-3 py-2 text-sm rounded-lg transition-all border-r-2 border-transparent -mr-[1px]",
                                                            isActive
                                                                ? "text-pink-400 bg-pink-500/5 border-pink-500 font-medium"
                                                                : "text-slate-500 hover:text-slate-300",
                                                            chapter.locked && "opacity-50 cursor-not-allowed hover:text-slate-500"
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span>{chapter.title}</span>
                                                            {chapter.locked && <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">נעול</span>}
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

            {/* User / Footer */}
            <div className="p-4 border-t border-slate-900/50">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">סטודנט עייף</p>
                        <p className="text-xs text-slate-500 truncate">שנה א' • ניהול</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}
