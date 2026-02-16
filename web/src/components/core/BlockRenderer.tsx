"use client";

import React from "react";
import type { ContentBlock } from "@/types/chapter";

// Block Components
import { Explanation } from "./blocks/Explanation";
import { Analogy } from "./blocks/Analogy";
import { DefinitionCard } from "./blocks/DefinitionCard";
import { FormulaCard } from "./blocks/FormulaCard";
import { WorkedExample } from "./blocks/WorkedExample";
import { DeepDive } from "./blocks/DeepDive";
import { ToneBreak } from "./blocks/ToneBreak";
import { MistakeCard } from "./blocks/MistakeCard";
import { GuidedExercise } from "./blocks/GuidedExercise";
import { Callout } from "./blocks/Callout";
import { ChapterImage } from "./blocks/ChapterImage";
import { CheckpointQuiz } from "./blocks/CheckpointQuiz";
import { TopicSummary } from "./blocks/TopicSummary";
import { Hook } from "./blocks/Hook";
import { Prerequisite } from "./blocks/Prerequisite";

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
            return <DefinitionCard term={block.term} content={block.content} tooltips={block.tooltips} />;

        case "formula":
            return <FormulaCard title={block.title} formula={block.formula} variables={block.variables} />;

        case "example":
            return <WorkedExample title={block.title} scenario={block.scenario} solution={block.solution} calculation={block.calculation} />;

        case "deep-dive":
            return <DeepDive title={block.title} sections={block.sections} />;

        case "tone-break":
            return <ToneBreak opener={block.opener} content={block.content} />;

        case "common-mistake":
            return <MistakeCard mistake={block.mistake} correct={block.correct} why={block.why} />;

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

        case "prerequisite":
            return <Prerequisite concept={block.concept} briefReview={block.briefReview} whyNeeded={block.whyNeeded} />;

        case "interactive":
            if (interactiveRegistry && interactiveRegistry[block.componentId]) {
                return <>{interactiveRegistry[block.componentId]}</>;
            }
            return null;

        case "callout":
            return <Callout variant={block.variant} content={block.content} />;

        case "image":
            return <ChapterImage src={block.src} alt={block.alt} caption={block.caption} />;

        case "checkpoint":
            return <CheckpointQuiz questions={block.questions} />;

        case "summary":
            return <TopicSummary content={block.content} keyPoints={block.keyPoints} />;

        default:
            return null;
    }
};
