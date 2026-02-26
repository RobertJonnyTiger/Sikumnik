"use client";

import React from "react";
import type { ContentBlock } from "@/types/chapter";

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
import { KnowledgeExam } from "./blocks/KnowledgeExam";
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
            return <Definition variant="simple" term={block.term} definition={block.content} />;

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

        default:
            return null;
    }
};
