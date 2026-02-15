"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Book, GraduationCap, Glasses, BookOpen, Search } from "lucide-react";

interface Definition {
    term: string;
    definition: string;
}

interface DefinitionBlockProps {
    title?: string;
    term?: string;
    definition?: string;
    definitions?: Definition[];
    className?: string;
}

export const DefinitionBlock: React.FC<DefinitionBlockProps> = ({ title, term, definition, definitions = [], className }) => {
    const allDefinitions = definitions.length > 0 ? definitions : (term && definition ? [{ term, definition }] : []);

    return (
        <div className={cn("relative group", className)}>
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500/10 to-teal-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-4xl p-8 md:p-10 shadow-2xl overflow-hidden">

                {/* Academic Watermarks Wallpaper */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
                    <GraduationCap size={140} className="absolute -top-10 -left-10 rotate-[-15deg]" />
                    <Glasses size={100} className="absolute bottom-10 right-1/4 rotate-10" />
                    <BookOpen size={120} className="absolute top-1/2 -right-10 rotate-[-20deg]" />
                    <Search size={160} className="absolute -bottom-20 -left-20" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Book size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">
                            {title || "מילון מושגים"}
                        </h3>
                    </div>

                    <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-teal-500 rounded-full mb-8" />

                    <div className="space-y-8">
                        {allDefinitions.map((def, idx) => (
                            <div key={idx}>
                                {def.term && (
                                    <h4 className="text-lg md:text-xl font-bold text-teal-400 mb-3 font-assistant">
                                        {def.term}
                                    </h4>
                                )}
                                <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl font-assistant">
                                    {def.definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

