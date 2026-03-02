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
import { ChapterImage } from "../blocks/ChapterImage";
import { CheckpointQuiz } from "../blocks/CheckpointQuiz";
import { Hook } from "../blocks/Hook";
import { StreetSmartSketch } from "../blocks/StreetSmartSketch";
import { KnowledgeExam } from "../blocks/KnowledgeExam";
import { RealWorldExample } from "../blocks/RealWorldExample";
import { List } from "../blocks/List";
import { MaslowPyramid } from "../blocks/MaslowPyramid";
import { ExamQuestionBlock as ExamQuestionsComponent } from "../blocks/ExamQuestionBlock";
import { AttributionFlowchart } from "@/features/organizational-behavior/components/AttributionFlowchart";
import { DiagnosticCaseStudy } from "@/features/organizational-behavior/components/DiagnosticCaseStudy";
import { SituationalLeadershipGuide } from "@/features/organizational-behavior/components/SituationalLeadershipGuide";
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
            return <Alert variant={block.variant} title={block.title}><LessonMarkdown>{block.content}</LessonMarkdown></Alert>;

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
                <div className="space-y-4">
                    {block.formalText && <Explanation content={block.formalText} />}
                    {block.streetNarrator && <StreetSmartSketch content={block.streetNarrator} />}
                </div>
            );

        case "common-mistake":
            return (
                <div className="space-y-6 my-10" dir="rtl">
                    <Alert variant="error" title="טעות נפוצה">
                        <LessonMarkdown>{block.mistake}</LessonMarkdown>
                    </Alert>
                    {block.correction && (
                        <Alert variant="success" title="הדרך הנכונה">
                            <LessonMarkdown>{block.correction}</LessonMarkdown>
                        </Alert>
                    )}
                </div>
            );

        case "exam-tip":
            return (
                <Alert variant="tip" title="טיפ למבחן">
                    <LessonMarkdown>{block.content}</LessonMarkdown>
                </Alert>
            );

        case "topic-summary":
            return (
                <div className="my-8">
                    <TopicSummary content={block.content} />
                </div>
            );

        default:
            return null;
    }
};
