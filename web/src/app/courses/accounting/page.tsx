"use client";

import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Play } from "lucide-react";

export default function AccountingLanding() {
    const chapters = [
        { num: 0, title: "מבוא ומושגי יסוד", href: "/courses/accounting/chapter-0", status: "current" },
        { num: 2, title: "עריכת מאזן", href: "/courses/accounting/chapter-2", status: "completed" },
        { num: 3, title: "דוח רווח והפסד", href: "/courses/accounting/chapter-3" },
        { num: 4, title: "פקודות יומן", href: "/courses/accounting/chapter-4" },
        { num: 5, title: "מאזן בוחן", href: "/courses/accounting/chapter-5" },
        { num: 6, title: "התהליך החשבונאי", href: "/courses/accounting/chapter-6" },
        { num: 7, title: "כרטיסי חתך", href: "/courses/accounting/chapter-7" },
        { num: 8, title: "חישובי מלאי", href: "/courses/accounting/chapter-8" },
        { num: 9, title: "שיטות מלאי (FIFO)", href: "/courses/accounting/chapter-9" },
        { num: 10, title: "רכוש קבוע", href: "/courses/accounting/chapter-10" },
        { num: 11, title: "לקוחות וחומ\"ס", href: "/courses/accounting/chapter-11" },
        { num: 12, title: "גיול חובות", href: "/courses/accounting/chapter-12" },
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


                <div className="space-y-4">
                    {chapters.map((chapter) => (
                        <Link
                            key={chapter.num}
                            href={chapter.href}
                            className="flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-slate-900/50 hover:border-blue-500/50 hover:bg-slate-800/50 cursor-pointer transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${chapter.status === "current" ? "bg-blue-500 text-white" :
                                    chapter.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                                        "bg-slate-800 text-slate-500"
                                    }`}>
                                    {chapter.num}
                                </div>
                                <span className="text-lg font-bold">{chapter.title}</span>
                            </div>
                            {chapter.status === "completed" && <CheckCircle className="text-emerald-400" size={24} />}
                            {chapter.status === "current" && <ArrowRight className="text-blue-400" size={24} />}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
