"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BridgeProps {
    data: {
        nextChapterTitle: string;
        content: string;
        nextChapterId?: string;
    };
    nextChapterLink?: string;
}

export const Bridge: React.FC<BridgeProps> = ({ data, nextChapterLink }) => {
    return (
        <div className="w-full my-16 text-center">
            <div className="inline-block max-w-2xl mx-auto">
                <h3 className="text-sm font-black text-muted-foreground mb-4 uppercase tracking-[0.3em] font-sans">
                    בפרק הבא...
                </h3>
                <p className="text-2xl md:text-4xl font-handwriting text-foreground mb-8 leading-tight italic">
                    {data.content}
                </p>

                {nextChapterLink && (
                    <Link
                        href={nextChapterLink}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20 font-sans"
                    >
                        המשך לפרק הבא: {data.nextChapterTitle}
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                )}
            </div>
        </div>
    );
};
