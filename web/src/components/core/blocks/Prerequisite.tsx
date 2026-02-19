"use client";

import React from "react";
import { RotateCcw } from "lucide-react";

interface PrerequisiteProps {
    concept: string;
    briefReview: string;
    whyNeeded: string;
}

export const Prerequisite: React.FC<PrerequisiteProps> = ({ concept, briefReview, whyNeeded }) => {
    return (
        <div className="bg-gradient-to-r from-slate-950/20 to-zinc-950/20 border border-slate-500/15 rounded-2xl p-6 my-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-slate-500/10 p-2 rounded-lg border border-slate-500/20">
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">לפני שנמשיך</p>
            </div>
            <p className="text-sm font-bold text-foreground/70 mb-2">{concept}</p>
            <p className="text-foreground/80 leading-relaxed mb-3">{briefReview}</p>
            <div className="bg-slate-500/10 rounded-xl p-3 mt-3 border border-slate-500/20">
                <p className="text-xs text-slate-400">
                    <span className="font-bold">למה זה נחוץ:</span> {whyNeeded}
                </p>
            </div>
        </div>
    );
};
