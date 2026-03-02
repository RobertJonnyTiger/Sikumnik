"use client";

import React from "react";
import type { ContentBlock } from "@/types/chapter";
import { BlockMath } from "react-katex";
import { renderMathText } from "@/utils/renderMathText";

// Block Components
import { Explanation } from "./blocks/Explanation";
import { Analogy } from "./blocks/Analogy";
import { Definition } from "./blocks/Definition";
import { FormulaCard } from "./blocks/FormulaCard";
import { WorkedExample } from "./blocks/WorkedExample";
import { DeepDive } from "./blocks/DeepDive";
import { GuidedExercise } from "./blocks/GuidedExercise";
import { Alert } from "./blocks/Alert";
import { ChapterImage } from "./blocks/ChapterImage";
import { CheckpointQuiz } from "./blocks/CheckpointQuiz";
import { Hook } from "./blocks/Hook";
import { StreetSmartSketch } from "./blocks/StreetSmartSketch";
import { RealWorldExample } from "./blocks/RealWorldExample";
import { List } from "./blocks/List";
import { MaslowPyramid } from "./blocks/MaslowPyramid";
import { ExamQuestionBlock as ExamQuestionsComponent } from "./blocks/ExamQuestionBlock";
import { AttributionFlowchart } from "./interactive/AttributionFlowchart";
import { DiagnosticCaseStudy } from "./interactive/DiagnosticCaseStudy";
import { SituationalLeadershipGuide } from "./interactive/SituationalLeadershipGuide";

interface BlockRendererProps {
    block: ContentBlock;
    interactiveRegistry?: Record<string, React.ReactNode>;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, interactiveRegistry }) => {
    switch (block.type) {
        case "explanation":
            return <Explanation content={block.content} highlight={block.highlight} />;

        case "analogy":
            return <Analogy content={block.content} icon={block.icon} />;

        case "definition":
            return <Definition variant="simple" term={block.term} definition={block.content ?? block.definition ?? ""} />;

        case "formula":
            return <FormulaCard title={block.title} formula={block.formula} variables={block.variables} />;

        case "example":
            return <WorkedExample title={block.title} scenario={block.scenario} solution={block.solution} calculation={block.calculation} />;

        case "deep-dive":
            return <DeepDive title={block.title} sections={block.sections} />;

        case "guided-exercise":
            return (
                <GuidedExercise
                    difficulty={block.difficulty}
                    question={block.question}
                    thinkingDirection={block.thinkingDirection}
                    steps={block.steps}
                    finalAnswer={block.finalAnswer}
                    phases={block.phases}
                />
            );

        case "hook":
            return <Hook opener={block.opener} question={block.question} context={block.context} />;

        case "street-smart":
            return <StreetSmartSketch title={block.title} content={block.content} />;

        case "real-world-example":
            return (
                <RealWorldExample
                    title={block.title}
                    scenario={block.scenario}
                    connection={block.connection}
                    source={block.source}
                />
            );

        case "list":
            return <List items={block.items} />;

        case "interactive":
            if (interactiveRegistry && interactiveRegistry[block.componentId]) {
                return <>{interactiveRegistry[block.componentId]}</>;
            }
            return null;

        case "alert":
            return <Alert variant={block.variant} title={block.title}>{block.content}</Alert>;

        case "image":
            return <ChapterImage src={block.src} alt={block.alt} caption={block.caption} />;

        case "maslow-pyramid":
            return <MaslowPyramid />;

        case "checkpoint":
        case "checkpoint-quiz":
            return <CheckpointQuiz questions={block.questions} />;

        case "exam-questions":
            return (
                <ExamQuestionsComponent
                    questions={block.questions}
                    showAnswersAtEnd={block.showAnswersAtEnd}
                />
            );

        case "attribution-flowchart":
            return (
                <AttributionFlowchart
                    mode={block.mode}
                />
            );

        case "diagnostic-case-study":
            return (
                <DiagnosticCaseStudy
                    title={block.title}
                    subtitle={block.subtitle}
                    scenario={block.scenario}
                    sections={block.sections}
                    conclusion={block.conclusion}
                    keyTakeaways={block.keyTakeaways}
                />
            );

        case "situational-leadership-guide":
            return <SituationalLeadershipGuide />;

        // ── INLINE CASES ──────────────────────────────────

        case "text":
            return (
                <div dir="rtl" className="space-y-3 leading-relaxed py-4">
                    {block.formalText && (
                        <div className="text-lg text-slate-800 leading-[1.9] markdown-content">
                            {renderMathText(block.formalText)}
                        </div>
                    )}
                    {block.streetNarrator && (
                        <p className="text-sm text-slate-600 italic border-r-4 border-amber-400 pr-4 bg-amber-50/50 rounded-l-lg py-2">
                            {renderMathText(block.streetNarrator)}
                        </p>
                    )}
                </div>
            );

        case "hero-formula": {
            const katex = block.formula || block.katexString || "";
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 p-6 text-center space-y-4 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200/40">
                    {block.title && (
                        <h3 className="text-lg font-black text-indigo-800 tracking-wide">{block.title}</h3>
                    )}
                    {block.subtitle && (
                        <p className="text-sm text-indigo-500">{block.subtitle}</p>
                    )}
                    {katex && (
                        <div dir="ltr" className="overflow-x-auto py-3 bg-white/60 rounded-xl mx-2">
                            <BlockMath math={katex} />
                        </div>
                    )}
                    {block.description && (
                        <p className="text-sm text-slate-700">{renderMathText(block.description)}</p>
                    )}
                    {block.streetNarrator && (
                        <p className="text-sm text-amber-700 italic mt-2 bg-amber-50 rounded-lg px-3 py-2">
                            💡 {block.streetNarrator}
                        </p>
                    )}
                </div>
            );
        }

        case "worked-example":
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 p-5 space-y-3 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/40">
                    <h4 className="text-base font-black text-emerald-800 flex items-center gap-2 tracking-wide">
                        📝 {block.title}
                    </h4>
                    <div className="text-sm text-slate-700 leading-relaxed">
                        <p className="font-bold text-slate-800 mb-1">תרחיש:</p>
                        <p>{renderMathText(block.scenario)}</p>
                    </div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                        <p className="font-bold text-slate-800 mb-1">פתרון:</p>
                        <p>{renderMathText(block.solution)}</p>
                    </div>
                    {block.calculation && (
                        <div className="text-sm bg-white/70 rounded-xl p-3 border border-emerald-200">
                            <p className="font-bold text-slate-800 mb-1">חישוב:</p>
                            <div>{renderMathText(block.calculation)}</div>
                        </div>
                    )}
                </div>
            );

        case "topic-summary":
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-sky-50/60 border-2 border-sky-300 p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-sky-200/40">
                    <h4 className="text-sm font-black text-sky-800 mb-2 flex items-center gap-2 uppercase tracking-wider">
                        📋 סיכום
                    </h4>
                    <div className="text-sm text-slate-700 leading-relaxed markdown-content">
                        {renderMathText(block.content)}
                    </div>
                </div>
            );

        case "common-mistake":
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-red-50/60 border-2 border-red-300 p-5 space-y-2 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-red-200/40">
                    <h4 className="text-sm font-black text-red-700 flex items-center gap-2 uppercase tracking-wider">
                        ⚠️ טעות נפוצה
                    </h4>
                    <p className="text-sm text-red-800">{renderMathText(block.mistake)}</p>
                    {block.correction && (
                        <div className="text-sm text-emerald-800 mt-2 border-r-4 border-emerald-400 pr-3 bg-emerald-50 rounded-l-lg py-2">
                            <span className="font-bold">✅ תיקון: </span>
                            {renderMathText(block.correction)}
                        </div>
                    )}
                </div>
            );

        case "exam-tip":
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-amber-50/60 border-2 border-amber-300 p-5 space-y-2 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-amber-200/40">
                    <h4 className="text-sm font-black text-amber-800 flex items-center gap-2 uppercase tracking-wider">
                        🎯 טיפ למבחן
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {renderMathText(block.content)}
                    </p>
                    {block.source && (
                        <p className="text-xs text-slate-500 mt-1 italic">מקור: {block.source}</p>
                    )}
                </div>
            );

        case "reference-table":
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-white/80 border-2 border-slate-300 p-5 space-y-3 overflow-x-auto shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40">
                    {block.title && (
                        <h4 className="text-base font-black text-slate-800 flex items-center gap-2 tracking-wide">
                            📊 {block.title}
                        </h4>
                    )}
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-300">
                                <th className="text-right p-2 text-slate-600 font-black text-xs uppercase tracking-wider">כלל</th>
                                <th className="text-center p-2 text-slate-600 font-black text-xs uppercase tracking-wider" dir="ltr">צורה כללית</th>
                                <th className="text-center p-2 text-slate-600 font-black text-xs uppercase tracking-wider" dir="ltr">דוגמה מספרית</th>
                                <th className="text-right p-2 text-slate-600 font-black text-xs uppercase tracking-wider">הסבר ברחוב</th>
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, i) => (
                                <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td className="p-2 text-slate-800 font-bold">{row.ruleName}</td>
                                    <td className="p-2 text-center" dir="ltr">{renderMathText(row.generalForm)}</td>
                                    <td className="p-2 text-center" dir="ltr">{renderMathText(row.numericExample)}</td>
                                    <td className="p-2 text-slate-600 text-xs">{row.streetExplanation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case "formula-card": {
            return (
                <div dir="rtl" className="group my-6 rounded-2xl bg-violet-50/60 border-2 border-violet-300 p-5 space-y-3 shadow-sm hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-violet-200/40">
                    <h4 className="text-base font-black text-violet-800 flex items-center gap-2 tracking-wide">
                        📐 {block.title}
                    </h4>
                    {block.formula && (
                        <div dir="ltr" className="overflow-x-auto py-2 bg-white/60 rounded-xl px-3">
                            <BlockMath math={block.formula} />
                        </div>
                    )}
                    {block.description && (
                        <p className="text-sm text-slate-700">{renderMathText(block.description)}</p>
                    )}
                    {block.variables && block.variables.length > 0 && (
                        <ul className="text-sm text-slate-600 space-y-1 pr-4 list-disc list-inside">
                            {block.variables.map((v, i) => (
                                <li key={i}>
                                    <span className="text-violet-700 font-mono font-bold" dir="ltr">{v.symbol}</span>
                                    {" — "}
                                    <span>{v.name}</span>
                                    {v.desc && <span className="text-slate-500"> ({v.desc})</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        }

        case "callout": {
            const variantMap = { info: "tip", warning: "warning", tip: "tip" } as const;
            const alertVariant = variantMap[block.variant ?? "info"];
            return <Alert variant={alertVariant} title={block.title}>{block.content}</Alert>;
        }

        // ── DEV WARNING: catch unmapped block types ───────────
        default: {
            if (process.env.NODE_ENV === "development") {
                const unknownBlock = block as { type: string };
                return (
                    <div className="my-4 rounded-xl bg-pink-50 border-2 border-dashed border-pink-400 p-4 text-pink-700 text-sm">
                        <p className="font-bold">⚠️ Unknown block type: &quot;{unknownBlock.type}&quot;</p>
                        <p className="text-xs text-pink-500 mt-1">
                            This block has no renderer in BlockRenderer.tsx. Add a case for it.
                        </p>
                        <pre className="text-xs text-pink-400 mt-2 overflow-x-auto bg-pink-50/50 rounded p-2">
                            {JSON.stringify(block, null, 2)}
                        </pre>
                    </div>
                );
            }
            return null;
        }
    }
};
