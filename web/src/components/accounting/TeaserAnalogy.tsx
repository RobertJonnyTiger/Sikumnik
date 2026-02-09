"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface TeaserAnalogyProps {
    data: {
        content: string;
    };
}

export const TeaserAnalogy: React.FC<TeaserAnalogyProps> = ({ data }) => {
    return (
        <div className="w-full my-12">
            <div className="relative overflow-hidden rounded-2xl bg-secondary p-1">
                <div className="bg-card backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border h-full relative overflow-hidden">
                    {/* Visual Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -z-10" />

                    <div className="flex items-start gap-4">
                        <div className="shrink-0 p-3 bg-card border border-border rounded-full shadow-sm mt-1">
                            <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-primary uppercase tracking-[0.3em] mb-4 font-sans flex items-center gap-2">
                                <div className="h-4 w-1 bg-accent rounded-full" />
                                הזווית התל אביבית 🍺 🏖️ 💃 🚲
                            </div>
                            <p className="text-xl md:text-2xl font-handwriting text-foreground leading-relaxed pr-6 border-r-4 border-primary/30 py-2 whitespace-pre-wrap">
                                {data.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
