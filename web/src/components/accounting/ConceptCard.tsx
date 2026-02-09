import { AnalogyBlock } from "./AnalogyBlock";
import { TermTooltip } from "@/components/ui/term-tooltip";

interface ConceptCardProps {
    title: string;
    academicText: string;
    analogyText: string;
    index: number;
}

export function ConceptCard({ title, academicText, analogyText, index }: ConceptCardProps) {

    // Custom Parser to provide modern styling for terms and lists
    const renderAcademicText = () => {
        const lines = academicText.split("\n");

        return lines.map((line, lineIdx) => {
            const numberedMatch = line.match(/^(\d+\.)\s*(.*)/);
            const content = line.split(/(<b>.*?<\/b>)/g).map((part, i) => {
                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                    const term = part.replace(/<\/?b>/g, "");
                    return (
                        <TermTooltip key={i} term={term} definition="מושג חשבונאי מרכזי.">
                            <span className="border-b-4 border-[#00f3ff]/40 font-black text-white hover:text-[#00f3ff] transition-all cursor-help px-2 bg-[#00f3ff]/10 rounded-lg">
                                {term}
                            </span>
                        </TermTooltip>
                    );
                }
                return <span key={i}>{part}</span>;
            });

            if (numberedMatch) {
                return (
                    <div key={lineIdx} className="flex gap-6 items-start mb-8 group/list hover:translate-x-[-8px] transition-transform duration-500">
                        <span className="text-[#00f3ff] font-black italic bg-[#00f3ff]/20 px-4 py-1 rounded-[1rem] text-3xl min-w-[60px] text-center shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                            {numberedMatch[1]}
                        </span>
                        <div className="flex-1 text-2xl md:text-3xl leading-relaxed font-rubik">
                            {line.substring(numberedMatch[1].length).split(/(<b>.*?<\/b>)/g).map((part, i) => {
                                if (part.startsWith("<b>") && part.endsWith("</b>")) {
                                    const term = part.replace(/<\/?b>/g, "");
                                    return <span key={i} className="text-white font-black underline decoration-[#00f3ff]/30 decoration-4 underline-offset-8">{term}</span>;
                                }
                                return <span key={i}>{part}</span>;
                            })}
                        </div>
                    </div>
                );
            }

            return <p key={lineIdx} className="mb-8">{content}</p>;
        });
    };

    return (
        <section className="space-y-12 group scroll-mt-32">
            <header className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <span className="text-[#00f3ff] font-black text-9xl md:text-[12rem] opacity-[0.05] leading-none select-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000 font-rubik">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-24 h-[4px] bg-gradient-to-r from-[#00f3ff] to-transparent opacity-30 rounded-full" />
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight font-rubik -mt-16 relative z-10">
                    {title}
                </h3>
            </header>

            <div className="text-3xl md:text-4xl font-light text-slate-200 leading-[1.6] max-w-4xl border-r-8 border-[#3713ec]/30 pr-12 py-8 font-rubik">
                {renderAcademicText()}
            </div>

            <AnalogyBlock text={analogyText} />
        </section>
    );
}
