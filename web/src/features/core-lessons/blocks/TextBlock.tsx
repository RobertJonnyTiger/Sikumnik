"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";

interface TextBlockProps {
    formalText?: string;
    streetNarrator?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({ formalText, streetNarrator }) => {
    return (
        <div dir="rtl" className="space-y-4 my-4">
            {formalText && (
                <div className="text-base text-foreground leading-relaxed">
                    <LessonMarkdown>{formalText}</LessonMarkdown>
                </div>
            )}
            {streetNarrator && (
                <div className="border-r-4 border-primary pr-4 bg-primary/5 rounded-l-xl py-3 px-4 italic text-sm text-foreground/80">
                    <LessonMarkdown>{streetNarrator}</LessonMarkdown>
                </div>
            )}
        </div>
    );
};
