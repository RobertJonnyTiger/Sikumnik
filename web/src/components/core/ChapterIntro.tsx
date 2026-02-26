import React from 'react';
import {
    Clock,
    Target,
    ChevronLeft,
    HelpCircle,
    PlayCircle
} from 'lucide-react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ConceptAccordion } from './interactive/ConceptAccordion';
import { ChapterData } from '@/types/chapter';

interface ChapterIntroProps {
    data: ChapterData;
    onStart: () => void;
}

export const ChapterIntro: React.FC<ChapterIntroProps> = ({ data, onStart }) => {
    const description = data.introduction?.content || '';
    const motivationText = data.introduction?.whyItMatters;

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 pb-32">
            {/* Breadcrumb Header */}
            {/* ... */}

            {/* Hero Heading */}
            {/* ... */}

            {/* Intro Description */}
            <div className="space-y-6 mb-10 text-lg leading-relaxed text-muted-foreground">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
            </div>

            {/* ... (Keep Quick Stats, Objectives, Concepts) */}

            {/* Motivation Section */}
            {motivationText && (
                <div className="mb-16">
                    <div className="relative p-8 rounded-3xl bg-primary/5 border-r-4 border-primary">
                        <div className="flex items-center gap-2 mb-3 text-sky-800 font-black text-sm uppercase tracking-widest">
                            <HelpCircle size={16} />
                            <span>למה זה חשוב?</span>
                        </div>
                        <div className="text-foreground font-bold leading-relaxed">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{motivationText}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

            {/* Call to Action */}
            <div className="flex justify-center">
                <button
                    onClick={onStart}
                    className="group flex items-center gap-4 bg-secondary hover:bg-teal-400 text-foreground font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-sm active:scale-95"
                >
                    <PlayCircle size={24} />
                    <span className="text-lg">התחל ללמוד את הפרק</span>
                    <ChevronLeft className="group-hover:-translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
    );
};