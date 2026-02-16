"use client";

import React from "react";
import { BookOpen } from "lucide-react";

interface DefinitionCardProps {
    term: string;
    content: string;
    tooltips?: Record<string, string>;
}

export const DefinitionCard: React.FC<DefinitionCardProps> = ({ term, content }) => {
    return (
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 my-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-sky-500/10 p-2 rounded-lg border border-sky-500/20">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                </div>
                <h4 className="text-sm font-black text-sky-400 uppercase tracking-wider">הגדרה</h4>
            </div>
            <p className="text-xl font-bold text-foreground mb-2">{term}</p>
            <p className="text-foreground/70 leading-relaxed">{content}</p>
        </div>
    );
};
