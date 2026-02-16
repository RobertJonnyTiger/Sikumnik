"use client";

import React from "react";

interface ExplanationProps {
    content: string;
    highlight?: string;
}

export const Explanation: React.FC<ExplanationProps> = ({ content, highlight }) => {
    return (
        <div className="py-4">
            {highlight && (
                <div className="bg-primary/5 border-r-4 border-primary px-4 py-2 rounded-l-lg mb-4">
                    <p className="text-primary font-bold text-sm">{highlight}</p>
                </div>
            )}
            <div className="text-lg text-foreground/85 leading-[1.9] whitespace-pre-line">
                {content}
            </div>
        </div>
    );
};
