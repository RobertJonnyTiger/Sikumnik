"use client";

import { ReactNode } from "react";

interface ConceptSectionProps {
    title: string;
    index: string | number;
    children: ReactNode;
    id?: string;
}

export function ConceptSection({ title, index, children, id }: ConceptSectionProps) {
    return (
        <section id={id} className="space-y-8 group scroll-mt-32 mb-24">
            <header className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <span className="text-primary font-black text-7xl md:text-9xl opacity-[0.08] leading-none select-none group-hover:opacity-20 group-hover:scale-105 transition-all duration-1000 font-main">
                        {String(index).padStart(2, '0')}
                    </span>
                    <div className="h-2 w-24 bg-gradient-to-r from-primary/40 to-transparent rounded-full shadow-lg" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight font-main -mt-12 relative z-10 px-2">
                    {title}
                </h3>
            </header>

            <div className="flex flex-col gap-8">
                {children}
            </div>
        </section>
    );
}
