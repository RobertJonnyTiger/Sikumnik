import { GlassCard } from "@/components/ui/glass-card";
import { AnalogyBlock } from "./AnalogyBlock";
import { BookOpen, Quote } from "lucide-react";
import { TermTooltip } from "@/components/ui/term-tooltip";

interface ConceptCardProps {
    title: string;
    academicText: string;
    analogyText: string;
    index: number;
}

export function ConceptCard({ title, academicText, analogyText, index }: ConceptCardProps) {

    // Custom Parser to replace <b> tags with Tooltips
    const renderAcademicText = () => {
        const parts = academicText.split(/(<b>.*?<\/b>)/g);

        return parts.map((part, i) => {
            if (part.startsWith("<b>") && part.endsWith("</b>")) {
                const term = part.replace(/<\/?b>/g, "");
                // In a real app, we'd look up the definition from a dictionary. 
                // For now, we use a generic placeholder or the term itself as the tooltip title.
                return (
                    <TermTooltip key={i} term={term} definition="מושג חשבונאי מרכזי. לחץ לפרטים נוספים (בקרוב).">
                        {term}
                    </TermTooltip>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <GlassCard className="group hover:neon-glow transition-all duration-500">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h3 className="text-2xl font-black text-white group-hover:text-pink-500 transition-colors">
                    {title}
                </h3>
                <span className="text-6xl font-black text-slate-800/50 group-hover:text-pink-500/10 transition-colors select-none">
                    {index + 1}
                </span>
            </div>

            {/* Academic Definition */}
            <div className="mb-8 relative">
                <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs font-bold uppercase tracking-widest justify-center">
                    <BookOpen className="w-4 h-4" />
                    <span>הגדרה יבשה</span>
                </div>

                <div className="relative px-8 py-2">
                    <Quote className="absolute top-0 right-0 w-8 h-8 text-slate-700/30 -scale-x-100" />
                    <div className="text-slate-300 leading-relaxed text-2xl font-david font-medium text-center relative z-10">
                        {renderAcademicText()}
                    </div>
                    <Quote className="absolute bottom-0 left-0 w-8 h-8 text-slate-700/30" />
                </div>
            </div>

            {/* The Analogy */}
            <AnalogyBlock text={analogyText} />

        </GlassCard>
    );
}
