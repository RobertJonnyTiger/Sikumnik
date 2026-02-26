"use client";

import React, { useEffect, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
    formula: string;
    className?: string;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ formula, className }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [html, setHtml] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [debugInfo, setDebugInfo] = useState<string>("");

    useEffect(() => {
        setIsMounted(true);
        try {
            // Debug: Check if katex is defined
            const katexVersion = (katex as any).version || "unknown";

            // Debug: Try rendering a simple string
            const testRender = katex.renderToString("c", { throwOnError: false });

            console.log(`[LatexRenderer] KaTeX Version: ${katexVersion}, Test Render Length: ${testRender.length}`);

            const rendered = katex.renderToString(formula, {
                displayMode: true,
                throwOnError: false,
                trust: true,
                strict: false
            });

            setHtml(rendered);
            setError(false);
            setDebugInfo(`Ver: ${katexVersion}, Len: ${rendered.length}, First 20: ${rendered.substring(0, 20)}`);

        } catch (e: any) {
            console.error("KaTeX rendering error:", e);
            setError(true);
            setDebugInfo(`Error: ${e.message}`);
        }
    }, [formula]);

    if (!isMounted) {
        return <div className="animate-pulse h-8 bg-slate-700/50 rounded w-full" />;
    }

    if (error) {
        // Render the error state BUT also show the debug info
        return (
            <div className="flex flex-col gap-1">
                <code className="text-red-700 text-sm break-all">Error: {formula}</code>
                <div className="text-[10px] text-yellow-500 font-mono">{debugInfo}</div>
            </div>
        );
    }

    return (
        <div className={className}>
            {/* Visual Debug Layer */}
            <div className="flex flex-col gap-1 mb-2 border-b border-border pb-2">
                <div className="text-[10px] text-yellow-400 font-mono">
                    <span className="font-bold">Input:</span> {formula}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                    <span className="font-bold">Debug:</span> {debugInfo}
                </div>
            </div>

            {/* The Real Render */}
            <div dangerouslySetInnerHTML={{ __html: html }} />

            {/* Control Element - Should always render if KaTeX works */}
            <div className="mt-4 border-t border-border pt-2">
                <div className="text-[10px] text-green-400 font-mono mb-1">Control (\sqrt...):</div>
                <div dangerouslySetInnerHTML={{
                    __html: katex.renderToString("c = \\sqrt{a^2+b^2}", { displayMode: true, throwOnError: false })
                }} />
            </div>
        </div>
    );
};
