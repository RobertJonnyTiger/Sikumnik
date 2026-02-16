"use client";

import React from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface MistakeCardProps {
    mistake: string;
    correct: string;
    why: string;
}

export const MistakeCard: React.FC<MistakeCardProps> = ({ mistake, correct, why }) => {
    return (
        <div className="bg-card/30 border border-border/40 rounded-2xl overflow-hidden my-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-red-500/5 border-b border-border/20">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-xs font-black text-red-400 uppercase tracking-wider">טעות נפוצה</p>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-foreground/80"><span className="font-bold text-red-400">טעות: </span>{mistake}</p>
                </div>
                <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-foreground/80"><span className="font-bold text-emerald-400">נכון: </span>{correct}</p>
                </div>
                <div className="bg-muted/20 border-r-2 border-amber-500/40 px-4 py-3 rounded-l-lg">
                    <p className="text-sm text-foreground/60"><span className="font-bold text-amber-400">למה? </span>{why}</p>
                </div>
            </div>
        </div>
    );
};
