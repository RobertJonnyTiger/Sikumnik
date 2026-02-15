"use client";

import { ReactNode } from "react";

interface AcademicProps {
    children: ReactNode;
}

export function Academic({ children }: AcademicProps) {
    return (
        <div className="text-2xl md:text-3xl font-medium text-foreground/90 leading-tight pr-10 border-r-8 border-primary/20 py-6 font-main prose-strong:text-white prose-strong:font-black prose-strong:decoration-primary/50 prose-strong:decoration-4 prose-strong:underline-offset-8 prose-strong:underline">
            {children}
        </div>
    );
}
