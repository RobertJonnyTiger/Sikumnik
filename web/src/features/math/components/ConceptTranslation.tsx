import React from 'react';
import { StandardConceptBlock } from '@/types/math-course';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { renderMathText } from '@/utils/renderMathText';

interface ConceptTranslationProps {
    block: StandardConceptBlock;
    /**
     * If false, the street narrator layer is hidden entirely,
     * regardless of whether `streetNarrator` data exists within the block.
     */
    hasStreetNarrator?: boolean;
}

export const ConceptTranslation: React.FC<ConceptTranslationProps> = ({
    block,
    hasStreetNarrator = true
}) => {
    // We only render this layer if the flag is true AND the data exists
    const showNarrator = hasStreetNarrator && !!block.content.streetNarrator;

    return (
        <div className="group my-8 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-400/20 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-indigo-500/50 dark:hover:shadow-indigo-500/20" dir="rtl">

            {/* Optional Title Block */}
            {block.title && (
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 dark:border-gray-800/60 dark:bg-gray-900/40">
                    <h4 className="text-sm font-semibold tracking-tight text-gray-700 dark:text-gray-300">
                        {block.title}
                    </h4>
                </div>
            )}

            {/* Layer 1: Formal Lecturer Text */}
            <div className="px-6 py-5">
                <div className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                    {block.katexString ? (
                        <div className="flex justify-center py-4 text-xl text-blue-900 dark:text-blue-100" dir="ltr">
                            <BlockMath math={block.katexString} />
                        </div>
                    ) : (
                        renderMathText(block.content.formalText)
                    )}
                </div>
            </div>

            {/* Layer 2: Street Narrator Voice (Conditionally rendered) */}
            {showNarrator && (
                <div className="border-t border-indigo-100 bg-indigo-50/30 px-6 py-5 dark:border-indigo-900/30 dark:bg-indigo-950/20">
                    <div className="border-r-4 border-indigo-400 pr-4 text-base leading-relaxed text-indigo-800 dark:text-indigo-300">
                        {renderMathText(block.content.streetNarrator!)}
                    </div>
                </div>
            )}
        </div>
    );
};
