"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, ChevronDown, Filter, BookOpen, Calculator, TrendingUp, Landmark, Brain, MessageSquare, Settings, Bookmark, Sparkles, Menu, X, GraduationCap } from "lucide-react";

export default function CoursesPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0f172a] font-sans text-white pb-24 relative overflow-hidden" dir="rtl">

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end">
                    <div className="w-80 h-full bg-[#1e293b] border-r border-white/10 shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <span className="text-xl font-bold">תפריט</span>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="p-6 space-y-4">
                            <Link
                                href="/"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all text-white/70 hover:text-white"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <span className="font-bold text-lg">דף הבית</span>
                            </Link>
                            <Link
                                href="/courses"
                                className="flex items-center gap-4 p-4 rounded-xl bg-[#3b82f6]/20 border border-[#3b82f6]/40 text-white hover:bg-[#3b82f6]/30 transition-all group"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#3b82f6] flex items-center justify-center shadow-lg shadow-[#3b82f6]/30">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-lg">כל הקורסים</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Background Ambient Glows */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 bg-[#3b82f6]/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#fbbf24]/20 rounded-full blur-[120px]" />
            </div>

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
                            <div className="bg-[#3b82f6] p-2.5 rounded-xl flex items-center justify-center shadow-lg shadow-[#3b82f6]/30 scale-90 group-hover:scale-100 transition-transform">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-black tracking-tight text-white font-sans">Discovery Sanctuary</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <Search className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <User className="w-7 h-7 text-white" />
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#3b82f6] px-5 text-white shadow-lg shadow-[#3b82f6]/20">
                        <span className="text-sm font-semibold">הכל</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white/5 border border-white/10 px-4 text-white/80 hover:bg-white/10 whitespace-nowrap">
                        <span className="text-sm font-medium">פקולטה</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white/5 border border-white/10 px-4 text-white/80 hover:bg-white/10 whitespace-nowrap">
                        <span className="text-sm font-medium">רמת קושי</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white/5 border border-white/10 px-4 text-white/80 hover:bg-white/10 whitespace-nowrap">
                        <span className="text-sm font-medium">פופולריות</span>
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <main className="p-4 space-y-8 relative z-10">
                <section className="space-y-1">
                    <h2 className="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.4em] font-sans">Digital Knowledge Base</h2>
                    <p className="text-2xl font-black text-white font-sans">איזה ידע נכבוש היום?</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/courses/accounting/intro" className="group">
                        <div className="relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-[#3b82f6]/30 p-6 rounded-2xl hover:border-[#3b82f6] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-[#3b82f6]/20 p-3 rounded-xl border border-[#3b82f6]/30 group-hover:bg-[#3b82f6]/30 transition-colors">
                                    <Calculator className="w-6 h-6 text-[#93c5fd]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#fbbf24] px-2 py-1 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20">מומלץ לך</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#93c5fd] transition-colors">חשבונאות א'</h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                איך לנהל את הכיסים שלך כששכר הדירה בפלורנטין חונק והבירה בבר התייקרה.
                                <br />
                                מושג מפתח: <span className="text-[#fbbf24] border-b border-dashed border-[#fbbf24]/40 cursor-help">אינפלציה</span>
                            </p>

                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-pink-500/20 flex items-center justify-center text-[10px] font-bold text-pink-400">AJ</div>
                                    <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">RS</div>
                                </div>
                                <div className="flex items-center gap-1 text-[#3b82f6] text-sm font-bold group-hover:gap-2 transition-all">
                                    <span>לצפייה בסילבוס</span>
                                    <span>←</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl opacity-60 hover:opacity-100 transition-opacity flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-full bg-white/5 border border-white/10">בינוני</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">סטטיסטיקה א'</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            להבין למה המרצה אומר שיש סיכוי של 95% שתכשל, ואיך להוכיח לו שהוא טועה בעזרת התפלגות נורמלית.
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800" />
                            </div>
                            <div className="text-slate-500 text-sm font-bold">בקרוב...</div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl opacity-60 hover:opacity-100 transition-opacity flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                                <Landmark className="w-6 h-6 text-emerald-400" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-full bg-white/5 border border-white/10">מתקדם</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">מימון חברות</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            איך להחליט אם שווה להשקיע בסטארטאפ של חבר שלך או פשוט לשים הכל על S&P 500 וללכת לישון בשקט.
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800" />
                            </div>
                            <div className="text-slate-500 text-sm font-bold">בקרוב...</div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 p-6 rounded-2xl opacity-60 hover:opacity-100 transition-opacity flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-pink-500/10 p-3 rounded-xl border border-pink-500/20">
                                <Brain className="w-6 h-6 text-pink-400" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-full bg-white/5 border border-white/10">קל</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">מבוא לפסיכולוגיה</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            למה אנחנו עושים את מה שאנחנו עושים, ואיך להשתמש בזה כדי לשכנע את אמא שלך שאתה לא עצלן.
                        </p>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800" />
                            </div>
                            <div className="text-slate-500 text-sm font-bold">בקרוב...</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating AI Bubble */}
            <div className="fixed bottom-24 left-6 z-40">
                <button className="w-16 h-16 rounded-full bg-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 group relative">
                    <Sparkles className="w-8 h-8" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#fbbf24] rounded-full border-2 border-[#0f172a]" />
                </button>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0f172a]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 pb-4 z-50">
                <button className="flex flex-col items-center gap-1 text-[#3b82f6]">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-[10px] font-bold">קורסים</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
                    <Bookmark className="w-6 h-6" />
                    <span className="text-[10px] font-medium">שמורים</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-[10px] font-medium">צ'אט</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors">
                    <Settings className="w-6 h-6" />
                    <span className="text-[10px] font-medium">הגדרות</span>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </nav>
        </div>
    );
}
