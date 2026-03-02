"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";

interface ExplanationProps {
    content: string;
    highlight?: string;
}

export const Explanation: React.FC<ExplanationProps> = ({ content, highlight }) => {
    return (
        <div className="group py-6 transition-all duration-300" dir="rtl">
            {highlight && (
                <div className="academic-card border-r-4 border-r-primary mb-6 bg-primary/5">
                    <p className="text-primary font-bold italic text-sm">{highlight}</p>
                </div>
            )}
            <div className="text-lg leading-relaxed">
                <LessonMarkdown>{content}</LessonMarkdown>
            </div>
        </div>
    );
};
