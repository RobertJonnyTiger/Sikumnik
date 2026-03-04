"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { LessonMarkdown } from "./LessonMarkdown";

interface AnalogyProps {
    content: string;
    icon?: string;
}

export const Analogy: React.FC<AnalogyProps> = ({ content, icon }) => {
    return (
        <div className="street-callout group" dir="rtl">
            <div className="flex items-start gap-5 relative z-10">
                <div className="shrink-0 bg-secondary p-3 rounded-2xl shadow-inner transform group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-secondary-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                        {icon || "🧠"} רגע של אנלוגיה
                    </h4>
                    <LessonMarkdown className="narrator-voice markdown-content text-foreground">{content}</LessonMarkdown>
                </div>
            </div>
        </div>
    );
};
