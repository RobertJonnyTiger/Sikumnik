
import React, { useState } from 'react';
import { ChevronDown, Box } from 'lucide-react';
import { ConceptItem } from '@/types/prototype';

interface ConceptAccordionProps {
    sectionTitle: string;
    items: ConceptItem[];
}

// Map of index/id to specific colors from the image
const THEME_COLORS: Record<number, { text: string; bg: string; border: string; glow: string }> = {
    1: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', glow: 'shadow-red-500/10' },
    2: { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', glow: 'shadow-orange-500/10' },
    3: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10' },
};

export const ConceptAccordion: React.FC<ConceptAccordionProps> = ({ sectionTitle, items }) => {
    const [openId, setOpenId] = useState<number | null>(items[0]?.id || null);

    return (
        <div className="w-full space-y-4 text-right" dir="rtl">
            {/* Section Header with Vertical Bar */}
            <div className="flex items-center justify-start gap-3 mb-6 px-2">
                <h3 className="text-xl font-black text-orange-500" style={{ fontFamily: 'var(--font-heading)' }}>
                    {sectionTitle}
                </h3>
                <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
                {items.map((concept, index) => {
                    const theme = THEME_COLORS[(index % 3) + 1];
                    const isActive = openId === concept.id;

                    return (
                        <div
                            key={concept.id}
                            className={`group transition-all duration-500 rounded-2xl border ${isActive
                                ? `bg-[#0a0f1d] border-slate-700/50 shadow-2xl ${theme.glow}`
                                : 'bg-[#0f172a]/40 border-slate-800/50 hover:border-slate-700/80'
                                }`}
                        >
                            {/* Header / Trigger */}
                            <button
                                onClick={() => setOpenId(isActive ? null : concept.id)}
                                className="w-full flex items-center justify-between p-4 md:p-6"
                            >
                                {/* Left Side: Chevron + Number */}
                                <div className="flex items-center gap-4">
                                    <ChevronDown
                                        size={20}
                                        className={`text-slate-600 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                                    />

                                    {/* Number Box */}
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg transition-all border ${isActive
                                        ? `${theme.bg} ${theme.text} ${theme.border}`
                                        : 'bg-slate-900/50 text-slate-700 border-slate-800'
                                        }`}>
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Center: Title */}
                                <span className={`flex-1 mx-6 font-bold text-lg md:text-xl transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                                    }`}>
                                    {concept.title}
                                </span>

                                {/* Right Side: Icon Box */}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${isActive
                                    ? `${theme.bg} ${theme.text} ${theme.border} scale-110`
                                    : 'bg-slate-900/50 text-slate-800 border-slate-800'
                                    }`}>
                                    <Box size={24} strokeWidth={2.5} />
                                </div>
                            </button>

                            {/* Content Area */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="px-8 pb-8 pt-2 mr-16 ml-8 border-r-2 border-slate-800/50">
                                    <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                                        {concept.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
