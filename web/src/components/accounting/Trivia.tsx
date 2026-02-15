"use client";

import React from "react";
import { Lightbulb, Sparkles } from "lucide-react";

interface TriviaProps {
    data: Array<{
        fact: string;
        type: "historical" | "funFact";
    }>;
}

export const Trivia: React.FC<TriviaProps> = ({ data }) => {
    return (
        <div className="w-full my-12 grid gap-6 md:grid-cols-2">
            {data.map((item, idx) => (
                <div key={idx} className="bg-linear-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-950/20 p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-24 h-24 text-yellow-600" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 text-yellow-700 dark:text-yellow-400 font-bold text-sm uppercase tracking-wider">
                            <Lightbulb className="w-4 h-4" />
                            {item.type === "historical" ? "פינת ההיסטוריה" : "הידעת?"}
                        </div>
                        <p className="text-yellow-900 dark:text-yellow-100 font-medium leading-relaxed">
                            {item.fact}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
