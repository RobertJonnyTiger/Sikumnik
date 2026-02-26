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
import { ToneBreak } from "./blocks/ToneBreak";
import { GuidedExercise } from "./blocks/GuidedExercise";
import { Alert } from "./blocks/Alert";
import { ChapterImage } from "./blocks/ChapterImage";
import { CheckpointQuiz } from "./blocks/CheckpointQuiz";
import { TopicSummary } from "./blocks/TopicSummary";
import { Hook } from "./blocks/Hook";
import { StreetSmart } from "./blocks/StreetSmart";
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

        case "tone-break":
            return <ToneBreak opener={block.opener} content={block.content} />;

        case "common-mistake":
            return (
                <Alert variant="warning" title="טעות נפוצה">
                    **טעות:** {block.mistake}<br />
                    **נכון:** {block.correct}<br />
                    **למה?** {block.why}
                </Alert>
            );

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
            return <StreetSmart title={block.title} emoji={block.emoji}>{block.content}</StreetSmart>;

        case "prerequisite":
            return (
                <Alert variant="prerequisite" title={`לפני שנמשיך: ${block.concept}`}>
                    {block.briefReview}
                    <br /><br />
                    **למה זה נחוץ:** {block.whyNeeded}
                </Alert>
            );

        case "knowledge-challenge":
            return (
                <KnowledgeExam
                    questions={[{
                        id: "legacy",
                        question: block.question,
                        options: block.options,
                        correctIndex: block.correctIndex,
                        explanation: block.reasoning.correct || "Correct!"
                    }]}
                />
            );

        case "real-world-example":
            return (
                <RealWorldExample
                    title={block.title}
                    scenario={block.scenario}
                    connection={block.connection}
                    source={block.source}
                />
            );

        case "exam-tip":
            return <Alert variant="tip" title={block.importance === "high" ? "טיפ חשוב מאד" : "טיפ לחזרה"}>{block.content}</Alert>;

        case "list":
            return <List items={block.items} />;

        case "interactive":
            if (interactiveRegistry && interactiveRegistry[block.componentId]) {
                return <>{interactiveRegistry[block.componentId]}</>;
            }
            return null;

        case "callout":
            const mappedVariant = block.variant === 'important' ? 'warning' : (block.variant === 'note' ? 'tip' : block.variant);
            return <Alert variant={mappedVariant} title={block.title}>{block.content}</Alert>;

        case "alert":
            return <Alert variant={block.variant} title={block.title}>{block.content}</Alert>;

        case "image":
            return <ChapterImage src={block.src} alt={block.alt} caption={block.caption} />;

        case "maslow-pyramid":
            return <MaslowPyramid />;

        case "checkpoint":
            return <CheckpointQuiz questions={block.questions} />;

        case "summary":
            return <TopicSummary content={block.content} keyPoints={block.keyPoints} />;

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



        case "academic-definition":
            return (
                <Definition
                    variant="academic"
                    term={block.title || "הגדרה אקדמית"}
                    definition={block.content}
                    source={block.source}
                    subject={block.category}
                />
            );

        case "situational-leadership-guide":
            return <SituationalLeadershipGuide />;

        default:
            return null;
    }
};
