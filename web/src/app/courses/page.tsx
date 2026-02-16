"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, ChevronDown, Filter, BookOpen, Calculator, TrendingUp, Landmark, Brain, MessageSquare, Settings, Bookmark, Sparkles, Menu, X, GraduationCap, LayoutDashboard, ChevronLeft, Lock } from "lucide-react";

export default function CoursesPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-24 relative overflow-hidden" dir="rtl">

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen ? (
                <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex justify-end">
                    <div className="w-80 h-full bg-card border-r border-border shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-8 border-b border-border flex justify-between items-center bg-primary/[0.02]">
                            <span className="text-xl font-black text-primary">תפריט</span>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-primary/10 rounded-2xl transition-colors text-foreground/50 hover:text-primary">
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <nav className="p-8 space-y-6">
                            <Link
                                href="/"
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all text-foreground/70 hover:text-primary font-black"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <LayoutDashboard className="w-6 h-6" />
                                <span className="text-lg">לוח בקרה</span>
                            </Link>
                            <Link
                                href="/courses"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all font-black"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <BookOpen className="w-6 h-6" />
                                <span className="text-lg">כל הקורסים</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            ) : null}

            {/* Background Ambient Glows (Subtle) */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-40 left-10 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[150px]" />
            </div>

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-foreground/40 hover:text-primary lg:hidden"
                        >
                            <Menu className="w-8 h-8" />
                        </button>
                        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-all group">
                            <div className="bg-primary p-3 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground font-sans">סיכומניק</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-3 rounded-2xl hover:bg-primary/5 transition-colors text-foreground/40 hover:text-primary shadow-sm border border-transparent hover:border-border">
                            <Search className="w-6 h-6" />
                        </button>
                        <button className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] hover:shadow-primary/30">
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="max-w-7xl mx-auto flex gap-4 px-6 pb-6 overflow-x-auto no-scrollbar scroll-smooth">
                    <button className="flex h-11 shrink-0 items-center justify-center gap-x-3 rounded-2xl bg-primary px-8 text-white shadow-lg shadow-primary/20 font-black text-sm">
                        <span className="">הכל</span>
                    </button>
                    <button className="flex h-11 shrink-0 items-center justify-center gap-x-3 rounded-2xl bg-white border border-border px-6 text-foreground/70 hover:bg-primary/5 hover:text-primary transition-all font-black text-sm shadow-sm group">
                        <span>פקולטה</span>
                        <ChevronDown className="w-5 h-5 text-foreground/20" />
                    </button>
                    <button className="flex h-11 shrink-0 items-center justify-center gap-x-3 rounded-2xl bg-white border border-border px-6 text-foreground/70 hover:bg-primary/5 hover:text-primary transition-all font-black text-sm shadow-sm group">
                        <span>רמת קושי</span>
                        <ChevronDown className="w-5 h-5 text-foreground/20" />
                    </button>
                    <button className="flex h-11 shrink-0 items-center justify-center gap-x-3 rounded-2xl bg-white border border-border px-6 text-foreground/70 hover:bg-primary/5 hover:text-primary transition-all font-black text-sm shadow-sm group">
                        <span>פופולריות</span>
                        <Filter className="w-5 h-5 text-foreground/20" />
                    </button>
                </div>
            </header>

            <main className="px-6 py-12 max-w-7xl mx-auto space-y-12 relative z-10">
                <section className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-16 bg-primary rounded-full" />
                        <h2 className="text-[12px] font-black text-primary uppercase tracking-[0.5em] font-sans">Knowledge Sanctuary</h2>
                    </div>
                    <p className="text-4xl md:text-5xl font-black text-foreground font-sans tracking-tight">איזה ידע נכבוש היום?</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
                    <Link href="/courses/accounting/chapter-0" className="group">
                        <div className="relative overflow-hidden bg-card border border-border p-10 rounded-[3rem] hover:border-primary/40 hover:shadow-premium transition-all flex flex-col h-full group-hover:translate-y-[-8px] duration-500">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />

                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div className="bg-primary/10 p-4 rounded-2xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Calculator className="w-8 h-8" />
                                </div>
                                <span className="text-[11px] font-black text-accent px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 uppercase tracking-widest shadow-sm">מומלץ לך</span>
                            </div>

                            <h3 className="text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors font-sans tracking-tight">חשבונאות א'</h3>
                            <p className="text-foreground/60 text-lg leading-relaxed mb-10 font-medium">
                                איך לנהל את הכיסים שלך כששכר הדירה בפלורנטין חונק והבירה בבר התייקרה.
                                <br />
                                <span className="inline-block mt-4 text-accent font-black underline underline-offset-8 decoration-accent/30 decoration-2 italic">מה בתכל'ס.. אינפלציה</span>
                            </p>

                            <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-2xl border-4 border-card bg-primary text-[11px] font-black text-white flex items-center justify-center shadow-sm">AJ</div>
                                    <div className="w-10 h-10 rounded-2xl border-4 border-card bg-accent text-[11px] font-black text-white flex items-center justify-center shadow-sm">RS</div>
                                </div>
                                <div className="flex items-center gap-3 text-primary text-base font-black group-hover:gap-5 transition-all">
                                    <span>לסילבוס</span>
                                    <ChevronLeft className="w-6 h-6 rotate-180" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Placeholder Cards with Airy styling */}
                    {[
                        { title: "סטטיסטיקה א'", icon: TrendingUp, desc: "להבין למה המרצה אומר שיש סיכוי של 95% שתכשל, ואיך להוכיח לו שהוא טועה בעזרת התפלגות נורמלית.", color: "indigo" },
                        { title: "מימון חברות", icon: Landmark, desc: "איך להחליט אם שווה להשקיע בסטארטאפ של חבר שלך או פשוט לשים הכל על S&P 500 וללכת לישון בשקט.", color: "emerald" },
                        { title: "מבוא לפסיכולוגיה", icon: Brain, desc: "למה אנחנו עושים את מה שאנחנו עושים, ואיך להשתמש בזה כדי לשכנע את אמא שלך שאתה לא עצלן.", color: "pink" }
                    ].map((course, idx) => (
                        <div key={idx} className="relative overflow-hidden bg-card/40 border border-border p-10 rounded-[3rem] opacity-60 hover:opacity-100 transition-all flex flex-col h-full group hover:bg-card">
                            <div className="flex justify-between items-start mb-10">
                                <div className="bg-foreground/5 p-4 rounded-2xl border border-border">
                                    <course.icon className="w-8 h-8 text-foreground/30" />
                                </div>
                                <span className="text-[11px] font-black text-foreground/40 px-4 py-2 rounded-xl bg-foreground/5 border border-border uppercase tracking-widest">בקרוב</span>
                            </div>

                            <h3 className="text-3xl font-black text-foreground/60 mb-4 font-sans tracking-tight">{course.title}</h3>
                            <p className="text-foreground/40 text-lg leading-relaxed mb-10 font-medium">{course.desc}</p>

                            <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                                <span className="text-foreground/20 text-sm font-black uppercase tracking-widest">In Development</span>
                                <Lock className="w-6 h-6 text-foreground/20" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Floating AI Bubble (Refined) */}
            <div className="fixed bottom-24 left-10 z-40">
                <button className="w-20 h-20 rounded-[2rem] bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group relative border-4 border-card">
                    <Sparkles className="w-10 h-10" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full border-4 border-card shadow-sm" />
                </button>
            </div>

            {/* Bottom Navigation (Mobile) */}
            <nav className="fixed bottom-0 left-0 right-0 h-24 bg-background/80 backdrop-blur-2xl border-t border-border flex items-center justify-around px-8 pb-8 z-50 lg:hidden shadow-premium">
                <button className="flex flex-col items-center gap-2 text-primary font-black">
                    <BookOpen className="w-8 h-8" />
                    <span className="text-[10px] uppercase tracking-widest">קורסים</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-foreground/30 hover:text-primary transition-colors font-black">
                    <Bookmark className="w-8 h-8" />
                    <span className="text-[10px] uppercase tracking-widest">שמורים</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-foreground/30 hover:text-primary transition-colors font-black">
                    <MessageSquare className="w-8 h-8" />
                    <span className="text-[10px] uppercase tracking-widest">צ'אט</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-foreground/30 hover:text-primary transition-colors font-black">
                    <Settings className="w-8 h-8" />
                    <span className="text-[10px] uppercase tracking-widest">הגדרות</span>
                </button>
            </nav>
        </div>
    );
}
