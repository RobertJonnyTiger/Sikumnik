"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";

interface CommonMistakeProps {
    mistake: string;
    correction?: string;
}

export const CommonMistake: React.FC<CommonMistakeProps> = ({ mistake, correction }) => {
    return (
        <div dir="rtl" className="my-4 rounded-xl border-2 border-error/40 bg-error/5 p-4 space-y-2">
            <p className="font-black text-error text-sm flex items-center gap-2">
                ⚠️ טעות נפוצה
            </p>
            <LessonMarkdown className="text-sm text-foreground">
                {mistake}
            </LessonMarkdown>
            {correction && (
                <div className="border-t border-error/20 pt-2 mt-2">
                    <p className="font-bold text-success text-xs mb-1">✓ התיקון:</p>
                    <LessonMarkdown className="text-sm text-foreground">
                        {correction}
                    </LessonMarkdown>
                </div>
            )}
        </div>
    );
};
