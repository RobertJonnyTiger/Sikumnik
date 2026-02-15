"use client";

import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { DualPersonaCard } from "./DualPersonaCard";

interface ToneBreakProps {
    opener: string; // "אבל מה זה אומר תכלס?"
    content: string | string[]; // Single string or array of paragraphs
    academicTitle?: string; // Optional for now, to support legacy
    academicContent?: string;
}

export const ToneBreak: React.FC<ToneBreakProps> = ({
    opener,
    content,
    academicTitle = "ההסבר הפורמלי",
    academicContent = "הטקסט האקדמי המקביל להסבר זה. (חסר בנתונים כרגע)" // Fallback
}) => {
    const textContent = Array.isArray(content) ? content.join('\n\n') : content;

    return (
        <SectionWrapper id="tone-break" sectionNumber={5}>
            <DualPersonaCard
                streetOpener={opener}
                streetContent={textContent}
                academicTitle={academicTitle}
                academicContent={academicContent}
            />
        </SectionWrapper>
    );
};
