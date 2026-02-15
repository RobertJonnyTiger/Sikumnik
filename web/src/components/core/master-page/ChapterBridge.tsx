"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

interface ChapterBridgeProps {
    nextChapter?: {
        id: string;
        title: string;
        description: string;
        isLocked?: boolean;
    };
    prevChapter?: {
        id: string;
        title: string;
    };
    courseId?: string; // e.g., 'microeconomics', 'accounting'
    className?: string;
}

export const ChapterBridge: React.FC<ChapterBridgeProps> = ({ nextChapter, prevChapter, courseId = "accounting", className }) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 mt-12", className)}>
            {/* PREVIOUS CHAPTER */}
            {prevChapter ? (
                <Link
                    href={`/courses/${courseId}/${prevChapter.id}`}
                    className="group bg-slate-900/30 border border-slate-800 rounded-xl p-6 hover:bg-slate-900/50 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                    <div className="flex items-center gap-2 text-slate-500 mb-4 group-hover:text-slate-400 transition-colors">
                        <ArrowRight size={16} /> {/* RTL Arrow points Right for Back */}
                        <span className="text-xs font-bold uppercase tracking-wider">הפרק הקודם</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">
                            {prevChapter.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-emerald-500/80 text-xs">
                            <CheckCircle2 size={12} />
                            <span>הושלם (Completed)</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <div /> // Spacer
            )}

            {/* NEXT CHAPTER */}
            {nextChapter ? (
                <Link
                    href={nextChapter.isLocked ? "#" : ((typeof nextChapter.id === 'string' && nextChapter.id.startsWith('/')) ? nextChapter.id : `/courses/${courseId}/${nextChapter.id}`)}
                    className={cn(
                        "group relative overflow-hidden rounded-xl p-6 border transition-all flex flex-col justify-between",
                        nextChapter.isLocked
                            ? "bg-slate-900/20 border-slate-800 opacity-70 cursor-not-allowed"
                            : "bg-linear-to-br from-teal-900/20 to-slate-900/50 border-teal-500/30 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5"
                    )}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-teal-500/80">
                            <span className="text-xs font-bold uppercase tracking-wider">הפרק הבא</span>
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> {/* RTL Arrow points Left for Next */}
                        </div>
                        {nextChapter.isLocked && <Lock size={16} className="text-slate-600" />}
                    </div>

                    <div>
                        <h3 className={cn("text-xl font-bold transition-colors", nextChapter.isLocked ? "text-slate-500" : "text-white")}>
                            {nextChapter.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                            {nextChapter.description}
                        </p>
                    </div>
                </Link>
            ) : null}
        </div>
    );
};
