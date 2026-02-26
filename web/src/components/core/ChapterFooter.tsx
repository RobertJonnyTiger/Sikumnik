"use client";

import React from "react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface ChapterFooterProps {
    navigation?: {
        previous?: { id: string; title: string };
        next?: { id: string; title: string };
    };
    bridge?: {
        nextChapterTitle: string;
        content: string;
        nextChapter: string;
    };
    trivia?: { fact: string; source?: string }[];
}

export const ChapterFooter: React.FC<ChapterFooterProps> = ({
    navigation,
    bridge,
    trivia,
}) => {
    if (!navigation && !bridge && !trivia) return null;

    return (
        <footer className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            {/* Bridge to Next Chapter */}
            {bridge && (
                <div className="relative overflow-hidden border border-primary/20 rounded-2xl p-8">
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
                    <h3 className="text-lg font-bold text-sky-800 mb-3">
                        בפרק הבא: {bridge.nextChapterTitle}
                    </h3>
                    <p className="text-foreground leading-relaxed mb-4">{bridge.content}</p>
                </div>
            )}

            {/* Trivia */}
            {trivia && trivia.length > 0 && (
                <div className="bg-card/30 border border-border/30 rounded-2xl p-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">
                        <Sparkles className="w-4 h-4" />
                        הידעת?
                    </h3>
                    <div className="space-y-3">
                        {trivia.map((item, idx) => (
                            <p key={idx} className="text-foreground leading-relaxed">
                                {item.fact}
                                {item.source && (
                                    <span className="text-xs text-muted-foreground mr-2">({item.source})</span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            {navigation && (
                <div className="flex justify-between items-center pt-4 border-t border-border/30">
                    {navigation.previous ? (
                        <a
                            href={`/courses/${navigation.previous.id}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-sm">{navigation.previous.title}</span>
                        </a>
                    ) : <div />}
                    {navigation.next ? (
                        <a
                            href={`/courses/${navigation.next.id}`}
                            className="flex items-center gap-2 text-sky-800 hover:text-sky-800/80 transition-colors font-bold"
                        >
                            <span className="text-sm">{navigation.next.title}</span>
                            <ArrowLeft className="w-4 h-4" />
                        </a>
                    ) : <div />}
                </div>
            )}
        </footer>
    );
};
