"use client";

import React from "react";
import type { ContentBlock } from "@/types/chapter";

// Block Components
import { Explanation } from "../blocks/Explanation";
import { Analogy } from "../blocks/Analogy";
import { Definition } from "../blocks/Definition";
import { FormulaCard } from "../blocks/FormulaCard";
import { WorkedExample } from "../blocks/WorkedExample";
import { DeepDive } from "../blocks/DeepDive";
import { GuidedExercise } from "../blocks/GuidedExercise";
import { Alert } from "../blocks/Alert";

import { CheckpointQuiz } from "../blocks/CheckpointQuiz";
import { Hook } from "../blocks/Hook";
import { StreetSmartSketch } from "../blocks/StreetSmartSketch";
import { List } from "../blocks/List";
import { HeroFormula } from "@/features/math/components/HeroFormula";
import { ReferenceTable } from "@/features/math/components/ReferenceTable";
import { TopicSummary } from "../blocks/TopicSummary";
import { LessonMarkdown } from "../blocks/LessonMarkdown";

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
            return (
                <Definition
                    variant="simple"
                    term={block.term}
                    definition={block.definition || block.content || ""}
                />
            );

        case "formula":
            return (
                <FormulaCard
                    title={block.title}
                    formula={block.formula}
                    variables={block.variables}
                />
            );

        case "hero-formula":
            return (
                <HeroFormula
                    block={{
                        id: "hero",
                        type: "hero-formula",
                        title: block.title,
                        subtitle: block.subtitle || (block as any).description || "",
                        katexString: block.formula || block.katexString || "",
                        streetNarrator: block.streetNarrator || ""
                    }}
                />
            );

        case "formula-card":
            return (
                <FormulaCard
                    title={block.title}
                    formula={block.formula}
                    variables={block.variables}
                />
            );

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
            return <Hook opener={block.opener || (block as any).content || ""} question={block.question} context={block.context} />;

        case "street-smart":
            return (
                <StreetSmartSketch
                    title={block.title || block.opener}
                    content={block.content}
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
            return <Alert variant={block.variant} title={block.title}><LessonMarkdown>{block.content}</LessonMarkdown></Alert>;

        case "callout": {
            const variantMap = { info: "tip", warning: "warning", tip: "tip" } as const;
            const alertVariant = variantMap[block.variant ?? "info"];
            return <Alert variant={alertVariant} title={block.title}><LessonMarkdown>{block.content}</LessonMarkdown></Alert>;
        }


        case "checkpoint":
        case "checkpoint-quiz":
            return <CheckpointQuiz questions={block.questions} />;


        case "reference-table":
            return (
                <ReferenceTable
                    block={{
                        id: "ref-table",
                        type: "reference-table",
                        tableCategory: block.tableCategory || block.title || "כללי המקצוע",
                        rows: block.rows.map((row, idx) => ({
                            id: `row-${idx}`,
                            ruleName: (row as any).ruleName || "",
                            generalForm: (row as any).generalForm || "",
                            numericExample: (row as any).numericExample || "",
                            streetExplanation: (row as any).streetExplanation || ""
                        }))
                    }}
                />
            );

        case "worked-example":
            return <WorkedExample title={block.title} scenario={block.scenario} solution={block.solution} calculation={block.calculation} />;

        case "text":
            return (
                <div dir="rtl" className="space-y-4 my-4">
                    {(block as any).formalText && (
                        <div className="text-base text-foreground leading-relaxed">
                            <LessonMarkdown>{(block as any).formalText}</LessonMarkdown>
                        </div>
                    )}
                    {(block as any).streetNarrator && (
                        <div className="border-r-4 border-primary pr-4 bg-primary/5 rounded-l-xl py-3 px-4 italic text-sm text-foreground/80">
                            <LessonMarkdown>{(block as any).streetNarrator}</LessonMarkdown>
                        </div>
                    )}
                </div>
            );

        case "common-mistake":
            return (
                <div dir="rtl" className="my-4 rounded-xl border-2 border-destructive/40 bg-destructive/5 p-4 space-y-2">
                    <p className="font-black text-destructive text-sm flex items-center gap-2">
                        ⚠️ טעות נפוצה
                    </p>
                    <LessonMarkdown className="text-sm text-foreground">
                        {(block as any).mistake}
                    </LessonMarkdown>
                    {(block as any).correction && (
                        <div className="border-t border-destructive/20 pt-2 mt-2">
                            <p className="font-bold text-success text-xs mb-1">✓ התיקון:</p>
                            <LessonMarkdown className="text-sm text-foreground">
                                {(block as any).correction}
                            </LessonMarkdown>
                        </div>
                    )}
                </div>
            );

        case "exam-tip":
            return (
                <div dir="rtl" className="my-4 rounded-xl border-2 border-warning bg-warning/10 p-4 space-y-1">
                    <p className="font-black text-warning-foreground text-sm flex items-center gap-2">
                        🎯 טיפ למבחן
                        {(block as any).source && (
                            <span className="font-normal text-xs text-muted-foreground">
                                ({(block as any).source})
                            </span>
                        )}
                    </p>
                    <LessonMarkdown className="text-sm text-foreground">
                        {(block as any).content}
                    </LessonMarkdown>
                </div>
            );

        case "topic-summary":
            return (
                <TopicSummary
                    content={(block as any).content}
                    keyPoints={(block as any).keyPoints}
                />
            );

        default:
            return null;
    }
};
