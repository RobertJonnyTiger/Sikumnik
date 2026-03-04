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
import { CommonMistake } from "../blocks/CommonMistake";
import { ExamTip } from "../blocks/ExamTip";
import { Callout } from "../blocks/Callout";
import { TextBlock } from "../blocks/TextBlock";

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
                        streetNarrator: block.streetNarrator || "",
                        variables: block.variables || []
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
            return null;

        case "street-smart":
            return (
                <StreetSmartSketch
                    title={block.title || block.opener}
                    content={block.content}
                />
            );


        case "list":
            return <List items={block.items} />;

        case "alert":
            return <Alert variant={block.variant} title={block.title}><LessonMarkdown>{block.content}</LessonMarkdown></Alert>;

        case "callout":
            return <Callout variant={block.variant} title={block.title} content={block.content} />;


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
                <TextBlock
                    formalText={(block as any).formalText}
                    streetNarrator={(block as any).streetNarrator}
                />
            );

        case "common-mistake":
            return (
                <CommonMistake
                    mistake={(block as any).mistake}
                    correction={(block as any).correction}
                />
            );

        case "exam-tip":
            return (
                <ExamTip
                    content={(block as any).content}
                    source={(block as any).source}
                />
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
