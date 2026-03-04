"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";

interface ListProps {
    items: string[];
}

export const List: React.FC<ListProps> = ({ items }) => {
    return (
        <div className="group my-4 space-y-2 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-muted-foreground/20">
            {items.map((item, idx) => (
                <LessonMarkdown className="flex items-start gap-3 markdown-content">{item}</LessonMarkdown>
            ))}
        </div>
    );
};
