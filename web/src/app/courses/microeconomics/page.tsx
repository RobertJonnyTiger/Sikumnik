"use client";

import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle, Play } from "lucide-react";

export default function MicroeconomicsLanding() {
  const chapters = [
    { num: 1, title: "מהו מדע הכלכלה?", href: "/courses/microeconomics/chapter-1", status: "completed" },
    { num: 2, title: "עלות אלטרנטיבית", href: "/courses/microeconomics/chapter-2", status: "completed" },
    { num: 3, title: "גורמי ייצור ועקומת התמורה", href: "/courses/microeconomics/chapter-3", status: "current" },
    { num: 4, title: "היצע וביקוש", href: "/courses/microeconomics/chapter-4" },
    { num: 5, title: "שיווי משקל", href: "/courses/microeconomics/chapter-5" },
    { num: 6, title: "גמישות", href: "/courses/microeconomics/chapter-6" },
  ];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-4">מיקרו כלכלה</h1>
          <p className="text-xl text-slate-400">
            הכלכלה שמאחורי החיים שלך. מה זו עלות אלטרנטיבית, למה אין ארוחות חינם, ואיך לקבל החלטות כלכליות טובות יותר.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12 p-6 bg-slate-900/50 rounded-2xl border border-white/5">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-slate-400">התקדמות בקורס</span>
            <span className="text-sm font-bold text-teal-400">33%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[33%] bg-linear-to-r from-teal-500 to-emerald-500 rounded-full" />
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.num}
              href={chapter.href}
              className="flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-slate-900/50 hover:border-teal-500/50 hover:bg-slate-800/50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${chapter.status === "current" ? "bg-teal-500 text-white" :
                  chapter.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-slate-800 text-slate-500"
                  }`}>
                  {chapter.num}
                </div>
                <span className="text-lg font-bold">{chapter.title}</span>
              </div>
              {chapter.status === "completed" && <CheckCircle className="text-emerald-400" size={24} />}
              {chapter.status === "current" && <ArrowRight className="text-teal-400" size={24} />}
            </Link>
          ))}
        </div>

        {/* Start CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/courses/microeconomics/chapter-1"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-full transition-all"
          >
            <Play size={20} fill="currentColor" />
            התחל ללמוד
          </Link>
        </div>
      </div>
    </div>
  );
}
