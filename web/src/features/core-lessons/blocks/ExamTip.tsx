"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";

interface ExamTipProps {
    content: string;
    source?: string;
}

export const ExamTip: React.FC<ExamTipProps> = ({ content, source }) => {
    return (
        <div dir="rtl" className="my-4 rounded-xl border-2 border-warning bg-warning/10 p-4 space-y-1">
            <p className="font-black text-warning-foreground text-sm flex items-center gap-2">
                🎯 טיפ למבחן
                {source && (
                    <span className="font-normal text-xs text-muted-foreground">
                        ({source})
                    </span>
                )}
            </p>
            <LessonMarkdown className="text-sm text-foreground">
                {content}
            </LessonMarkdown>
        </div>
    );
};
