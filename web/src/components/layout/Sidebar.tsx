"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ChevronLeft,
    GraduationCap,
    LayoutDashboard,
    Settings,
    Calendar,
    BookOpen,
    Sparkles,
    LogOut,
    Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface ChapterItem {
    title: string;
    href: string;
}

interface Topic {
    id: string;
    title: string;
    items: ChapterItem[];
}

interface Course {
    title: string;
    courseId: string;
    href: string;
    topics?: Topic[];
}

interface Degree {
    title: string;
    icon: React.ElementType;
    items: Course[];
}

// --- Navigation Data ---
const navigationData: Degree[] = [
    {
        title: "בית הספר לניהול (B.A)",
        icon: GraduationCap,
        items: [
            {
                title: "חשבונאות א'",
                courseId: "accounting-a",
                href: "/courses/accounting",
                topics: [
                    {
                        id: "foundations",
                        title: "יסודות החשבונאות",
                        items: [
                            { title: "פרק 0: מבוא ומושגי יסוד", href: "/courses/accounting/chapter-0" },
                            { title: "פרק 2: עריכת מאזן", href: "/courses/accounting/chapter-2" },
                        ]
                    },
                    {
                        id: "financial-statements",
                        title: "דוחות כספיים",
                        items: [
                            { title: "פרק 3: דוח רווח והפסד", href: "/courses/accounting/chapter-3" },
                            { title: "פרק 4: פקודות יומן", href: "/courses/accounting/chapter-4" },
                            { title: "פרק 5: מאזן בוחן", href: "/courses/accounting/chapter-5" },
                        ]
                    },
                    {
                        id: "accounting-cycle",
                        title: "התהליך החשבונאי",
                        items: [
                            { title: "פרק 6: התהליך החשבונאי", href: "/courses/accounting/chapter-6" },
                            { title: "פרק 7: כרטיסי חתך", href: "/courses/accounting/chapter-7" },
                        ]
                    },
                    {
                        id: "inventory",
                        title: "מלאי",
                        items: [
                            { title: "פרק 8: חישובי מלאי", href: "/courses/accounting/chapter-8" },
                            { title: "פרק 9: שיטות מלאי (FIFO)", href: "/courses/accounting/chapter-9" },
                        ]
                    },
                    {
                        id: "long-term-assets",
                        title: "רכוש קבוע",
                        items: [
                            { title: "פרק 10: רכוש קבוע", href: "/courses/accounting/chapter-10" },
                        ]
                    },
                    {
                        id: "receivables",
                        title: "חייבים ולקוחות",
                        items: [
                            { title: "פרק 11: לקוחות וחומ\"ס", href: "/courses/accounting/chapter-11" },
                            { title: "פרק 12: גיול חובות", href: "/courses/accounting/chapter-12" },
                        ]
                    }
                ]
            },
            {
                title: "מיקרו כלכלה", courseId: "micro", href: "/courses/microeconomics",
                topics: [
                    {
                        id: "foundations",
                        title: "יסודות",
                        items: [
                            { title: "פרק 1: מדע הכלכלה", href: "/courses/microeconomics/chapter-1" },
                            { title: "פרק 2: עלות אלטרנטיבית", href: "/courses/microeconomics/chapter-2" },
                            { title: "פרק 3: גורמי ייצור ויתרון יחסי", href: "/courses/microeconomics/chapter-3" },
                            { title: "פרק 4: צמיחה ומענקים", href: "/courses/microeconomics/chapter-4" },
                            { title: "פרק 5: מסחר בינלאומי א'", href: "/courses/microeconomics/chapter-5" },
                        ]
                    }
                ]
            },
            { title: "סטטיסטיקה א'", courseId: "stat-a", href: "/courses/statistics" },
            {
                title: "התנהגות ארגונית",
                courseId: "organizational-behavior",
                href: "/courses/organizational-behavior",
                topics: [
                    {
                        id: "ob-foundations",
                        title: "יסודות (הפרט)",
                        items: [
                            { title: "פרק 1: מבוא והתנהגות ארגונית", href: "/courses/organizational-behavior/chapter-1" },
                            { title: "פרק 2: הפרט בארגון", href: "/courses/organizational-behavior/chapter-2" },
                            { title: "פרק 3: תפיסה וקבלת החלטות", href: "/courses/organizational-behavior/chapter-3" },
                            { title: "פרק 4: מוטיבציה", href: "/courses/organizational-behavior/chapter-4" },
                        ]
                    },
                    {
                        id: "ob-groups",
                        title: "התנהגות קבוצתית",
                        items: [
                            { title: "פרק 5: התנהגות קבוצתית", href: "/courses/organizational-behavior/chapter-5" },
                        ]
                    },
                    {
                        id: "ob-leadership",
                        title: "מנהיגות וסיכום",
                        items: [
                            { title: "פרק 6: מנהיגות", href: "/courses/organizational-behavior/chapter-6" },
                            { title: "כלי עזר: מנהיגות מצבית", href: "/courses/organizational-behavior/situational-leadership" },
                            { title: "פרק 7: תרגול וסיכום", href: "/courses/organizational-behavior/chapter-7" },
                        ]
                    },
                    {
                        id: "ob-exam-prep",
                        title: "הכנה למבחן",
                        items: [
                            { title: "מבחן סימולציה", href: "/courses/organizational-behavior/exam-simulation" },
                            { title: "סדנת אבחון מקרים", href: "/courses/organizational-behavior/diagnostic-workshop" },
                            { title: "סיום וסטטיסטיקות", href: "/courses/organizational-behavior/summary" },
                        ]
                    }
                ]
            }
        ]
    }
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
    const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load
    useEffect(() => {
        const savedCollapsed = localStorage.getItem("sikumnik_sidebar_collapsed");
        const savedCourses = localStorage.getItem("sikumnik_expanded_courses");
        const savedTopics = localStorage.getItem("sikumnik_expanded_topics");

        if (savedCollapsed) setIsCollapsed(savedCollapsed === "true");
        if (savedCourses) setExpandedCourses(safeJSONParse(savedCourses));
        if (savedTopics) setExpandedTopics(safeJSONParse(savedTopics));

        // Auto-expand active path
        expandActivePath();
        setIsLoaded(true);
    }, [pathname]);

    // Persist state
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("sikumnik_sidebar_collapsed", String(isCollapsed));
        localStorage.setItem("sikumnik_expanded_courses", JSON.stringify(expandedCourses));
        localStorage.setItem("sikumnik_expanded_topics", JSON.stringify(expandedTopics));
    }, [isCollapsed, expandedCourses, expandedTopics, isLoaded]);

    const safeJSONParse = (str: string) => {
        try { return JSON.parse(str); } catch { return []; }
    };

    const expandActivePath = () => {
        navigationData.forEach(degree => {
            degree.items.forEach(course => {
                // Check if course contains current path
                if (pathname.startsWith(course.href)) {
                    setExpandedCourses(prev => Array.from(new Set([...prev, course.courseId])));
                }
                course.topics?.forEach(topic => {
                    if (topic.items.some(item => item.href === pathname)) {
                        setExpandedTopics(prev => Array.from(new Set([...prev, topic.id])));
                    }
                });
            });
        });
    };

    const toggleCourse = (courseId: string) => {
        if (isCollapsed) setIsCollapsed(false);
        setExpandedCourses(prev =>
            prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
        );
    };

    const toggleTopic = (topicId: string) => {
        setExpandedTopics(prev =>
            prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
        );
    };

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-md rounded-full border border-border shadow-sm md:hidden"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 right-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border transition-all duration-300 ease-in-out shadow-2xl md:relative md:translate-x-0",
                    isCollapsed ? "w-20" : "w-80",
                    !isMobileOpen && "translate-x-full md:translate-x-0",
                    className
                )}
            >
                {/* Header */}
                <div className={cn("flex items-center gap-3 p-6 h-20 border-b border-border/50", isCollapsed && "justify-center p-0")}>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col animate-in fade-in slide-in-from-right-4">
                                <span className="text-xl font-black tracking-tight leading-none">סיכומניק</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">LMS Platform</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Toggle Button (Desktop) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -left-3 top-24 w-6 h-6 bg-card border border-border rounded-full items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-sm hidden md:flex z-50"
                >
                    <ChevronLeft className={cn("w-3 h-3 transition-transform", isCollapsed ? "rotate-180" : "")} />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">

                    {/* Main Navigation */}
                    <nav className="px-4 space-y-1">
                        <NavItem
                            href="/"
                            icon={LayoutDashboard}
                            label="לוח בקרה"
                            isCollapsed={isCollapsed}
                            isActive={pathname === "/"}
                        />
                        <NavItem
                            href="/schedule"
                            icon={Calendar}
                            label="מערכת שעות"
                            isCollapsed={isCollapsed}
                            isActive={pathname === "/schedule"}
                        />
                        <NavItem
                            href="/library"
                            icon={BookOpen}
                            label="ספריית ידע"
                            isCollapsed={isCollapsed}
                            isActive={pathname === "/library"}
                        />
                    </nav>

                    {/* Courses Section */}
                    <div className="px-4">
                        {!isCollapsed && (
                            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2 mb-4">
                                הקורסים שלי
                            </h3>
                        )}

                        <div className="space-y-4">
                            {navigationData.map((degree) => (
                                <div key={degree.title} className="space-y-2">
                                    {degree.items.map(course => {
                                        const isExpanded = expandedCourses.includes(course.courseId);
                                        const isActive = pathname.startsWith(course.href);

                                        return (
                                            <div key={course.courseId} className="space-y-1">
                                                {/* Course Header */}
                                                <button
                                                    onClick={() => toggleCourse(course.courseId)}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 p-2 rounded-xl transition-all group relative overflow-hidden",
                                                        isActive ? "bg-primary/5 text-primary" : "text-foreground/70 hover:bg-muted/50 hover:text-foreground",
                                                        isCollapsed && "justify-center p-3"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                                        isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
                                                    )}>
                                                        <GraduationCap className="w-4 h-4" />
                                                    </div>

                                                    {!isCollapsed && (
                                                        <>
                                                            <span className="flex-1 text-sm font-bold truncate text-right">{course.title}</span>
                                                            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", isExpanded ? "rotate-180" : "")} />
                                                        </>
                                                    )}
                                                </button>

                                                {/* Topics & Chapters (Accordion) */}
                                                <AnimatePresence>
                                                    {isExpanded && !isCollapsed && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pr-11 pl-2 space-y-4 pt-2 pb-4">
                                                                {course.topics?.map(topic => {
                                                                    const isTopicExpanded = expandedTopics.includes(topic.id);
                                                                    const hasActiveItem = topic.items.some(i => i.href === pathname);

                                                                    return (
                                                                        <div key={topic.id} className="space-y-1">
                                                                            <button
                                                                                onClick={() => toggleTopic(topic.id)}
                                                                                className={cn(
                                                                                    "w-full flex items-center justify-between text-xs font-semibold py-1 hover:text-primary transition-colors",
                                                                                    hasActiveItem ? "text-primary" : "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                <span>{topic.title}</span>
                                                                                <ChevronDown className={cn("w-3 h-3 transition-transform", isTopicExpanded ? "rotate-180" : "")} />
                                                                            </button>

                                                                            <AnimatePresence>
                                                                                {isTopicExpanded && (
                                                                                    <motion.div
                                                                                        initial={{ height: 0 }}
                                                                                        animate={{ height: "auto" }}
                                                                                        exit={{ height: 0 }}
                                                                                        className="overflow-hidden border-r border-border/50 mr-1 pr-3 space-y-1"
                                                                                    >
                                                                                        {topic.items.map(chapter => (
                                                                                            <Link
                                                                                                key={chapter.href}
                                                                                                href={chapter.href}
                                                                                                className={cn(
                                                                                                    "block text-[11px] py-1.5 transition-colors line-clamp-1",
                                                                                                    pathname === chapter.href
                                                                                                        ? "text-primary font-bold"
                                                                                                        : "text-muted-foreground hover:text-foreground"
                                                                                                )}
                                                                                            >
                                                                                                {chapter.title}
                                                                                            </Link>
                                                                                        ))}
                                                                                    </motion.div>
                                                                                )}
                                                                            </AnimatePresence>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer / User */}
                <div className={cn("p-4 border-t border-border/50 bg-background/50", isCollapsed && "flex justify-center")}>
                    <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-accent p-[2px]">
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                <span className="font-black text-xs text-primary">S</span>
                            </div>
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold truncate">סטודנט עייף</p>
                                <button className="text-[10px] text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                                    <LogOut className="w-3 h-3" />
                                    התנתק
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    isCollapsed: boolean;
    isActive: boolean;
}

function NavItem({ href, icon: Icon, label, isCollapsed, isActive }: NavItemProps) {
    return (
        <Link
            href={href}
            title={isCollapsed ? label : ""}
            className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all group",
                isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                isCollapsed && "justify-center"
            )}
        >
            <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary-foreground" : "text-current")} />
            {!isCollapsed && <span className="font-bold text-sm">{label}</span>}
        </Link>
    );
}
