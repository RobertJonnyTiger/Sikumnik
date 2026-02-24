"use client";

import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Lock, Play } from "lucide-react";

export default function AccountingLanding() {
    const chapters = [
        { num: 0, title: "מבוא ומושגי יסוד", href: "/courses/accounting/chapter-0", status: "locked" },
        { num: 2, title: "עריכת מאזן", href: "/courses/accounting/chapter-2", status: "locked" },
        { num: 3, title: "דוח רווח והפסד", href: "/courses/accounting/chapter-3", status: "locked" },
        { num: 4, title: "פקודות יומן", href: "/courses/accounting/chapter-4", status: "locked" },
        { num: 5, title: "מאזן בוחן", href: "/courses/accounting/chapter-5", status: "locked" },
        { num: 6, title: "התהליך החשבונאי", href: "/courses/accounting/chapter-6", status: "locked" },
        { num: 7, title: "כרטיסי חתך", href: "/courses/accounting/chapter-7", status: "locked" },
        { num: 8, title: "חישובי מלאי", href: "/courses/accounting/chapter-8", status: "locked" },
        { num: 9, title: "שיטות מלאי (FIFO)", href: "/courses/accounting/chapter-9", status: "locked" },
        { num: 10, title: "רכוש קבוע", href: "/courses/accounting/chapter-10", status: "locked" },
        { num: 11, title: "לקוחות וחומ\"ס", href: "/courses/accounting/chapter-11", status: "locked" },
        { num: 12, title: "גיול חובות", href: "/courses/accounting/chapter-12", status: "locked" },
    ];

    return (
        <div className="min-h-screen bg-[#050b18] text-slate-200 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                            <Calculator className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-5xl font-black text-white">חשבונאות פיננסית א'</h1>
                    </div>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        השער לעולם העסקים. שליטה בשפת הדיווח הכספי, הבנת דוחות, וניתוח המצב הפיננסי של פירמות.
                    </p>
                </div>

                {/* Status Banner */}
                <div className="mb-12 p-6 bg-slate-900/50 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200">הקורס נעול כרגע</h3>
                        <p className="text-sm text-slate-400">התכנים יהיו זמינים בקרוב לסטודנטים רשומים.</p>
                    </div>
                </div>

                {/* Chapters List */}
                <div className="space-y-4">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.num}
                            className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${chapter.status === "locked"
                                    ? "border-white/5 bg-slate-900/30 opacity-50 cursor-not-allowed"
                                    : "border-white/10 bg-slate-900/50 hover:border-blue-500/50 hover:bg-slate-800/50 cursor-pointer"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${chapter.status === "current" ? "bg-blue-500 text-white" :
                                        chapter.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                                            "bg-slate-800 text-slate-500"
                                    }`}>
                                    {chapter.status === "locked" ? <Lock size={20} /> : chapter.num}
                                </div>
                                <span className="text-lg font-bold">{chapter.title}</span>
                            </div>
                            {chapter.status === "locked" && <Lock className="text-slate-600" size={24} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
