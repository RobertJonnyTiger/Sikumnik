"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

interface AnalogyProps {
    content: string;
    icon?: string;
}

export const Analogy: React.FC<AnalogyProps> = ({ content, icon }) => {
    return (
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 my-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-3xl -z-10" />
            <div className="flex items-start gap-4">
                <div className="shrink-0 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <p className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] mb-2">
                        {icon || "💡"} רגע של אנלוגיה
                    </p>
                    <p className="text-foreground/80 leading-relaxed text-base">{content}</p>
                </div>
            </div>
        </div>
    );
};
