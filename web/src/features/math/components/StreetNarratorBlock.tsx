import React from 'react';
import { StreetNarratorBlock as IStreetNarratorBlock } from '@/types/math-course';
import { renderMathText } from '@/utils/renderMathText';

interface StreetNarratorBlockProps {
    block: IStreetNarratorBlock;
}

export const StreetNarratorBlock: React.FC<StreetNarratorBlockProps> = ({ block }) => {
    return (
        <div
            className="group my-8 w-full overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/30 px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-400/20 dark:border-indigo-900/30 dark:bg-indigo-950/20 dark:hover:border-indigo-500/50 dark:hover:shadow-indigo-500/20"
            dir="rtl"
        >
            <div className="flex items-start gap-4">
                <div
                    className="mt-[0.1rem] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}
                >
                    💬
                </div>
                <div className="flex-1 border-r-[3px] border-indigo-400/60 pr-4">
                    <div className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-indigo-500 dark:text-indigo-400">
                        הסבר רחוב
                    </div>
                    <div className="text-base font-medium leading-relaxed text-indigo-900 dark:text-indigo-200">
                        {renderMathText(block.standaloneNarration)}
                    </div>
                </div>
            </div>
        </div>
    );
};