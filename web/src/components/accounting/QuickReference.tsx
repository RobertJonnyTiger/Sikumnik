"use client";

import React from "react";
import { ClipboardList, Sigma, BookA } from "lucide-react";

interface QuickReferenceProps {
    data: {
        formulas: Array<{ name: string; formula: string }>;
        definitions: Array<{ term: string; definition: string }>;
    };
}

export const QuickReference: React.FC<QuickReferenceProps> = ({ data }) => {
    return (
        <div className="w-full my-24 bg-card/60 backdrop-blur-3xl border-2 border-primary/20 rounded-[3rem] p-10 md:p-16 shadow-premium relative overflow-hidden group">
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <h2 className="flex items-center gap-6 text-3xl md:text-4xl font-black mb-16 uppercase tracking-[0.3em] text-white font-main relative z-10">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                    <ClipboardList className="w-8 h-8" />
                </div>
                כרטיס סיכום מהיר
            </h2>

            <div className="grid md:grid-cols-2 gap-16 relative z-10 font-main">
                {/* Formulas Column */}
                <div className="space-y-10">
                    <h3 className="flex items-center gap-4 font-black text-lg mb-8 text-primary uppercase tracking-[0.2em] border-r-4 border-primary/40 pr-4">
                        <Sigma className="w-6 h-6" />
                        נוסחאות מפתח
                    </h3>
                    <div className="space-y-8">
                        {data.formulas.map((f, i) => (
                            <div key={i} className="flex flex-col gap-3 py-4 border-b border-border/20 last:border-0 group/item transition-all hover:bg-primary/5 px-4 rounded-2xl">
                                <span className="text-2xl font-black text-white group-hover/item:text-primary transition-colors">{f.name}</span>
                                <div className="text-2xl md:text-3xl font-black text-white bg-primary/5 px-6 py-4 rounded-2xl border-2 border-primary/20 shadow-sm w-full text-center group-hover/item:border-primary/40 transition-colors" dir="ltr">
                                    {f.formula.split(' ').map((term, idx) => (
                                        <span key={idx} className={idx % 2 === 0 ? "text-primary font-black" : ""}>{term} </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Definitions Column */}
                <div className="space-y-10">
                    <h3 className="flex items-center gap-4 font-black text-lg mb-8 text-accent uppercase tracking-[0.2em] border-r-4 border-accent/40 pr-4">
                        <BookA className="w-6 h-6" />
                        מושגים קריטיים
                    </h3>
                    <div className="space-y-8">
                        {data.definitions.map((def, i) => (
                            <div key={i} className="flex flex-col gap-3 py-4 border-b border-border/20 last:border-0 group/item transition-all hover:bg-accent/5 px-4 rounded-2xl">
                                <span className="text-2xl font-black text-white group-hover/item:text-accent transition-colors">{def.term}</span>
                                <p className="text-xl md:text-2xl font-black text-foreground leading-relaxed bg-accent/5 p-6 rounded-2xl border-2 border-accent/10 group-hover/item:border-accent/30 transition-all">
                                    {def.definition.split(' ').map((word, idx) => (
                                        <span key={idx} className={idx % 6 === 0 ? "text-accent font-black" : ""}>{word} </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
