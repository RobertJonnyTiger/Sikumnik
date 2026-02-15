"use client";

import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Coffee } from "lucide-react"; // Default icon, can be overridden

interface TeaserAnalogyProps {
    content: string;
    analogyTitle?: string;
}

export const TeaserAnalogy: React.FC<TeaserAnalogyProps> = ({
    content,
    analogyTitle = "בואו נדבר תכל'ס",
}) => {
    return (
        <SectionWrapper id="teaser-analogy" sectionNumber={3}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/20 p-6 md:p-8">
                {/* Decorative background blur */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    {/* Icon / Visual */}
                    <div className="flex-shrink-0 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                        <Coffee size={32} />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-indigo-300">
                            {analogyTitle}
                        </h4>
                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
                            {content}
                        </p>
                        <div className="pt-2">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                                ...ועכשיו בואו נראה את זה בצורה מסודרת
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
