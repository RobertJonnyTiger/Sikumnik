import { useState, useEffect } from "react";
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
    locked?: boolean;
    topics?: Topic[];
}

interface Degree {
    title: string;
    icon: any;
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
            { title: "סטטיסטיקה א'", courseId: "stat-a", href: "/courses/statistics", locked: true }
        ]
    }
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedCollapsed = localStorage.getItem("sikumnik_global_sidebar_collapsed");
        const savedTopics = localStorage.getItem("sikumnik_expanded_topics");

        if (savedCollapsed !== null) {
            setIsCollapsed(savedCollapsed === "true");
        }
        if (savedTopics) {
            try {
                setExpandedTopics(JSON.parse(savedTopics));
            } catch (e) {
                console.error("Failed to parse expanded topics", e);
            }
        }

        // Auto-expand topic containing current chapter
        navigationData.forEach(degree => {
            degree.items.forEach(course => {
                course.topics?.forEach(topic => {
                    if (topic.items.some(item => item.href === pathname)) {
                        setExpandedTopics(prev => prev.includes(topic.id) ? prev : [...prev, topic.id]);
                    }
                });
            });
        });

        setIsLoaded(true);
    }, [pathname]);

    // Save to localStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("sikumnik_global_sidebar_collapsed", String(isCollapsed));
        localStorage.setItem("sikumnik_expanded_topics", JSON.stringify(expandedTopics));
    }, [isCollapsed, expandedTopics, isLoaded]);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const toggleTopic = (topicId: string) => {
        setExpandedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    return (
        <aside
            className={cn(
                "bg-[#050b18]/95 backdrop-blur-xl border-l border-white/5 flex flex-col h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out shrink-0 z-50 shadow-2xl",
                isCollapsed ? "w-20" : "w-80",
                className
            )}
        >
            {/* Toggle Button - Premium Floating */}
            <button
                onClick={toggleCollapse}
                className="absolute -left-3 top-24 z-60 w-6 h-6 bg-primary rounded-full border border-white/10 hidden md:flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isCollapsed ? "rotate-90" : "-rotate-90")} />
            </button>

            {/* Brand / Logo */}
            <div className={cn("p-8 border-b border-white/5 bg-linear-to-b from-primary/2 to-transparent", isCollapsed && "px-4")}>
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                            <span className="font-black text-2xl text-foreground tracking-tight block leading-none mb-1">סיכומניק</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">PLATFORM V3</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation Tree */}
            <nav className={cn("flex-1 p-6 space-y-10 mt-6", isCollapsed && "p-3")}>

                {/* Dashboard Link */}
                <div className={cn("px-2", isCollapsed && "px-0")}>
                    <Link
                        href="/"
                        title={isCollapsed ? "לוח בקרה" : ""}
                        className={cn(
                            "flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-black transition-all group relative overflow-hidden",
                            pathname === "/"
                                ? "text-primary bg-primary/5 border border-primary/10 shadow-sm"
                                : "text-foreground/50 hover:text-primary hover:bg-primary/5",
                            isCollapsed && "px-0 justify-center h-12 w-12 mx-auto"
                        )}
                    >
                        {pathname === "/" && !isCollapsed && <div className="absolute inset-y-0 right-0 w-1.5 bg-primary rounded-l-full" />}
                        <LayoutDashboard className={cn("w-6 h-6 shrink-0", pathname === "/" ? "text-primary" : "text-foreground/30")} />
                        {!isCollapsed && <span className="animate-in fade-in duration-300">לוח בקרה</span>}
                    </Link>
                </div>

                {/* Degrees */}
                {navigationData.map((degree, i) => (
                    <div key={i} className="space-y-6">
                        {!isCollapsed && (
                            <h3 className="flex items-center gap-2 px-6 text-[11px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-4 animate-in fade-in">
                                {degree.title}
                            </h3>
                        )}

                        <div className="space-y-4">
                            {degree.items.map((course, j) => (
                                <div key={j} className="space-y-2 group/course">
                                    {/* Course Header */}
                                    <div
                                        title={isCollapsed ? course.title : ""}
                                        className={cn(
                                            "flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all relative overflow-hidden",
                                            course.locked ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-primary/5 text-foreground/70 hover:text-primary",
                                            isCollapsed && "px-0 justify-center h-12 w-12 mx-auto"
                                        )}>
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2.5 h-2.5 shrink-0 rounded-full", course.locked ? "bg-foreground/20" : "bg-primary shadow-sm shadow-primary/40")} />
                                            {!isCollapsed && <span className="font-black tracking-tight text-base animate-in fade-in">{course.title}</span>}
                                        </div>
                                    </div>

                                    {/* Topics Accordion */}
                                    {!course.locked && course.topics && !isCollapsed && (
                                        <div className="mr-4 space-y-2 animate-in fade-in slide-in-from-top-1">
                                            {course.topics.map((topic) => {
                                                const isExpanded = expandedTopics.includes(topic.id);
                                                const hasActiveChapter = topic.items.some(chapter => chapter.href === pathname);

                                                return (
                                                    <div key={topic.id} className="space-y-1">
                                                        <button
                                                            onClick={() => toggleTopic(topic.id)}
                                                            className={cn(
                                                                "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group/topic",
                                                                hasActiveChapter ? "text-primary font-bold bg-primary/5" : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded ? "rotate-0" : "-rotate-90")} />
                                                                <span className="truncate">{topic.title}</span>
                                                            </div>
                                                        </button>

                                                        <AnimatePresence initial={false}>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                    className="overflow-hidden mr-4 pr-4 border-r border-white/5 space-y-1"
                                                                >
                                                                    {topic.items.map((chapter, k) => {
                                                                        const isActive = pathname === chapter.href;
                                                                        return (
                                                                            <Link
                                                                                key={k}
                                                                                href={chapter.href}
                                                                                className={cn(
                                                                                    "block px-4 py-2 text-xs rounded-lg transition-all relative group/item",
                                                                                    isActive
                                                                                        ? "text-accent bg-accent/10 font-black"
                                                                                        : "text-foreground/40 hover:text-primary hover:bg-primary/5"
                                                                                )}
                                                                            >
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", isActive ? "bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" : "bg-white/10 group-hover/item:bg-primary/40")} />
                                                                                    <span className="truncate">{chapter.title}</span>
                                                                                </div>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
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

            {/* Progress (Optional/Contextual) */}
            {!isCollapsed && pathname.includes("/courses/accounting") && (
                <div className="px-8 py-6 border-t border-white/5 bg-primary/1">
                    <div className="flex justify-between mb-2 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                        <span>התקדמות בקורס</span>
                        <span>45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[45%] transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                    </div>
                </div>
            )}

            {/* AI Assistant Indicator */}
            {!isCollapsed && (
                <div className="px-8 pb-6">
                    <div className="p-6 rounded-3xl bg-linear-to-br from-primary/5 to-accent/5 border border-white/5 relative overflow-hidden group/ai shadow-sm">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl opacity-0 group-hover/ai:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-4 relative z-10">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">AI ASSISTANT READY</span>
                        </div>
                    </div>
                </div>
            )}

            {/* User Profile */}
            <div className={cn("p-8 border-t border-white/5 bg-primary/2", isCollapsed && "px-4")}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-linear-to-tr from-primary to-accent p-[2px] shadow-sm">
                        <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm font-black text-primary uppercase italic">
                                S
                            </div>
                        </div>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 animate-in fade-in duration-300">
                            <p className="text-base font-black text-foreground truncate tracking-tight">סטודנט עייף</p>
                            <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest truncate mt-0.5">שנה א׳ • ניהול</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
