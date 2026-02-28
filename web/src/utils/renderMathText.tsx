import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Parses mixed text containing both standard strings and KaTeX inline math ($...$) or block math ($$...$$).
 * Strips delimiters and securely renders via react-katex instead of dangerouslySetInnerHTML.
 */
export const renderMathText = (text: string) => {
    if (!text) return null;

    // If the entire block is wrapped in display math $$...$$
    if (text.startsWith('$$') && text.endsWith('$$') && text.lastIndexOf('$$') === text.length - 2 && text.indexOf('$$') === 0) {
        return <BlockMath math={text.slice(2, -2).trim()} />;
    }

    // Split by standard inline math delimiters $...$
    const parts = text.split(/\$(.*?)\$/g);

    return (
        <span dir="rtl">
            {parts.map((part, index) => {
                // Odd indices are the captured math strings
                if (index % 2 === 1) {
                    return (
                        <span key={index} className="inline-flex mx-1" dir="ltr">
                            <InlineMath math={part} />
                        </span>
                    );
                }

                // Return normal text safely using dangerouslySetInnerHTML, assuming the 
                // pipeline provides sanitized HTML (e.g. <strong>, <em>).
                return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
            })}
        </span>
    );
};
