// @ts-nocheck
"use client";

import React from "react";
import {
    BookOpen, Lightbulb, AlertTriangle, Target, Zap,
    ArrowRight, Check, CheckCircle2, AlertCircle, Code
} from "lucide-react";

// ----------------------------------------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------------------------------------

// 1. Core Callouts & Text Blocks
import { Alert } from "@/components/core/blocks/Alert";
import { Hook } from "@/components/core/blocks/Hook";
import { StreetSmart } from "@/components/core/blocks/StreetSmart";
import { Explanation } from "@/components/core/blocks/Explanation";
import { List } from "@/components/core/blocks/List";
import { ToneBreak } from "@/components/core/blocks/ToneBreak";

// 2. Pedagogical Emphasis
import DidYouKnow from "@/components/core/blocks/DidYouKnow";
import { Analogy } from "@/components/core/blocks/Analogy";

// 3. Definitions & Theory
import { Definition } from "@/components/core/blocks/Definition";
import { FormulaCard } from "@/components/core/blocks/FormulaCard";
import { RealWorldExample } from "@/components/core/blocks/RealWorldExample";
import { DeepDive } from "@/components/core/blocks/DeepDive";
import { WorkedExample } from "@/components/core/blocks/WorkedExample";

// 4. Quizzes & Exercises
import { KnowledgeExam } from "@/components/core/blocks/KnowledgeExam";
import { CheckpointQuiz } from "@/components/core/blocks/CheckpointQuiz";
import { ExamQuestionBlock } from "@/components/core/blocks/ExamQuestionBlock";
import { GuidedExercise } from "@/components/core/blocks/GuidedExercise";

// 5. Summaries & Navigation
import { NarrativeSummary } from "@/components/core/blocks/NarrativeSummary";
import { TopicSummary } from "@/components/core/blocks/TopicSummary";
import { TopicNavigation } from "@/components/core/blocks/TopicNavigation";

// 6. Interactive Logic Widgets
import { ConceptAccordion } from "@/components/core/interactive/ConceptAccordion";
import { MaslowPyramid } from "@/components/core/blocks/MaslowPyramid";
import { SituationalLeadershipGuide } from "@/components/core/interactive/SituationalLeadershipGuide";
import { AttributionFlowchart } from "@/components/core/interactive/AttributionFlowchart";
import { DiagnosticCaseStudy } from "@/components/core/interactive/DiagnosticCaseStudy";
import { PPFGraph } from "@/components/core/interactive/PPFGraph";
import { CurveShifter } from "@/components/core/interactive/CurveShifter";

// ----------------------------------------------------------------------
// UTILITY WRAPPER
// ----------------------------------------------------------------------

const ComponentPreview = ({ name, description, children }: { name: string, description?: string, children: React.ReactNode }) => (
    <div className="relative border-2 border-dashed border-border/60 rounded-xl bg-background/50 overflow-hidden group hover:border-primary/40 transition-colors my-8">
        <div className="bg-muted/30 border-b border-border/40 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <h3 className="font-mono text-sm font-bold text-foreground bg-primary/10 px-2 py-0.5 rounded text-sky-800">
                    &lt;{name} /&gt;
                </h3>
            </div>
            {description && <span className="text-xs text-muted-foreground hidden sm:block">{description}</span>}
        </div>
        <div className="p-6 md:p-8 bg-background relative z-10">
            {children}
        </div>
    </div>
);

// ----------------------------------------------------------------------
// PAGE COMPONENT
// ----------------------------------------------------------------------

export default function ComponentsAuditPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-32" dir="rtl">
            <header className="bg-card border-b border-border py-12 px-6 shadow-sm sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-right">
                    <div>
                        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider mb-2">
                            Component Catalog
                        </h1>
                        <p className="text-muted-foreground text-sm max-w-xl">
                            Scroll to view all 40+ styled blocks. Each component is wrapped in a dashed box showing its exact React `&lt;Component /&gt;` name.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">

                {/* --- 1. CORE CALLOUTS & INFO BLOCKS --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">1. System Callouts</h2>
                        <p className="text-muted-foreground mt-2">Standard colored notification blocks used for alerts and tips.</p>
                    </div>

                    <ComponentPreview name='Alert variant="tip"' description="Positive, actionable advice">
                        <Alert variant="tip">**Pro Tip:** Always read the instructions carefully before starting.</Alert>
                    </ComponentPreview>

                    <ComponentPreview name='Alert variant="warning"' description="Cautionary information">
                        <Alert variant="warning">**Warning:** Deleting this file cannot be undone.</Alert>
                    </ComponentPreview>

                    <ComponentPreview name='Alert variant="prerequisite"' description="Required prior knowledge">
                        <Alert variant="prerequisite" title="Supply Curves">You MUST know Supply Curves to calculate market equilibrium.</Alert>
                    </ComponentPreview>

                    <div className="mt-16 mb-8 border-b-4 border-muted pb-4">
                        <h2 className="text-2xl font-bold text-foreground">Text Structural Formatting</h2>
                    </div>

                    <ComponentPreview name="Explanation" description="Visually distinct block for breaking down a concept">
                        <Explanation content="An explanation block breaking down a complex topic into digestible pieces." highlight="Key takeaway highlighted here." />
                    </ComponentPreview>

                    <ComponentPreview name="Hook" description="Engaging section opener">
                        <Hook opener="Ever wonder why gas prices jump before a hurricane?" context="Let's dive into Supply and Demand." />
                    </ComponentPreview>

                    <ComponentPreview name="ToneBreak" description="Mental pause for the reader">
                        <ToneBreak opener="Let's take a breath." content="You have covered a lot of math. Here is a brief mental break." />
                    </ComponentPreview>

                    <ComponentPreview name="StreetSmart" description="Casual slang-based explanation">
                        <StreetSmart title="Let's Break it Down">
                            Okay so listen, opportunity cost is basically like... you pick pizza for lunch, right? You're giving up the burger you could have had. That burger = opportunity cost. It's not rocket science, just life stuff.
                        </StreetSmart>
                    </ComponentPreview>

                    <ComponentPreview name="List" description="Standard bulleted structural list">
                        <List items={["First critical item", "Second important item", "Third supporting point"]} />
                    </ComponentPreview>
                </section>

                {/* --- 2. PEDAGOGICAL EMPHASIS --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">2. Pedagogical Attention</h2>
                        <p className="text-muted-foreground mt-2">Specialized blocks designed to draw the student's eye to learning outcomes.</p>
                    </div>

                    <ComponentPreview name="DidYouKnow" description="Trivia and contextual history, often expandable">
                        <DidYouKnow facts={[{ category: "History", fact: "Economics comes from the Greek word Oikonomia, meaning household management." }]} />
                    </ComponentPreview>

                    <ComponentPreview name="Analogy" description="Metaphorical comparisons">
                        <Analogy content="Think of the CPU like the brain of a computer, and RAM like its short-term memory on a whiteboard." />
                    </ComponentPreview>
                </section>

                {/* --- 3. THEORETICAL & ACADEMIC BLOCKS --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">3. Academic Deep Dives</h2>
                        <p className="text-muted-foreground mt-2">Blocks for rendering heavy text, definitions, math, and case studies.</p>
                    </div>

                    <ComponentPreview name='Definition variant="academic"' description="Formal citation/definition">
                        <Definition variant="academic" term="Nash Equilibrium" definition="A stable state of a system involving the interaction of different participants, in which no participant can gain by a unilateral change of strategy." source="Game Theory 101" subject="Economics" />
                    </ComponentPreview>

                    <ComponentPreview name='Definition variant="simple"' description="Simpler glossary term">
                        <Definition variant="simple" term="Opportunity Cost" definition="The loss of potential gain from other alternatives when one alternative is chosen." />
                    </ComponentPreview>

                    <ComponentPreview name="FormulaCard" description="Mathematical rendering block">
                        <FormulaCard title="Pythagorean Theorem" formula="a^2 + b^2 = c^2" variables={[{ name: "a", description: "side 1" }, { name: "b", description: "side 2" }]} />
                    </ComponentPreview>

                    <ComponentPreview name="RealWorldExample" description="Practical application narrative">
                        <RealWorldExample title="Prisoner's Dilemma" scenario="Two suspects are arrested by the police. The police have insufficient evidence for a conviction." connection="Shows the limits of non-cooperation." />
                    </ComponentPreview>

                    <ComponentPreview name="DeepDive" description="Expandable advanced reading">
                        <DeepDive title="The Microeconomics of Search Costs" sections={[{ title: "Section 1", content: "Details on how consumer search costs prevent perfectly competitive markets from achieving uniform prices." }]} />
                    </ComponentPreview>

                    <ComponentPreview name="WorkedExample" description="Step by step quantitative solution">
                        <WorkedExample title="Calculating Weighted GPA" scenario="A student has 3 A's (4 credits each) and 2 B's (3 credits each)." solution="The weighted GPA is 3.63." calculation="(3*4*4 + 2*3*3) / (12 + 6)" />
                    </ComponentPreview>
                </section>

                {/* --- 4. EXAM & QUIZ WIDGETS --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">4. Assessment Engines</h2>
                        <p className="text-muted-foreground mt-2">Interactive testing blocks ranging from micro-checks to full exams.</p>
                    </div>

                    <ComponentPreview name="KnowledgeExam" description="Cumulative chapter end validation engine">
                        <KnowledgeExam
                            questions={[
                                {
                                    id: "q1",
                                    question: "What is the primary motive of a rational consumer in microeconomics?",
                                    options: ["Maximize profit", "Maximize utility", "Minimize cost", "Maximize revenue"],
                                    correctIndex: 1,
                                    explanation: "Consumers seek to maximize their utility (satisfaction) subject to their budget constraint."
                                },
                                {
                                    id: "q2",
                                    question: "Which of these shifts the demand curve to the right?",
                                    options: ["Increase in price", "Decrease in price", "Increase in income (normal good)", "Decrease in income (normal good)"],
                                    correctIndex: 2,
                                    explanation: "An increase in income for a normal good allows consumers to buy more at every price point, shifting the entire curve right."
                                }
                            ]}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="CheckpointQuiz" description="Multi-question informal check">
                        <CheckpointQuiz
                            questions={[
                                { id: "1", text: "Is an Opportunity Cost an explicit out-of-pocket expense?", options: ["Yes", "No"], correctIndex: 1, explanation: "No, it is the value of the forgone alternative." },
                                { id: "2", text: "Do fixed costs change with production volume?", options: ["Yes", "No"], correctIndex: 1, explanation: "Fixed costs remain constant regardless of output in the short run." }
                            ]}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="ExamQuestionBlock" description="Formal test simulation block with grading">
                        <ExamQuestionBlock
                            questions={[
                                {
                                    id: "q1",
                                    type: "multiple-choice",
                                    text: "Select the true statement regarding Monopolies:",
                                    points: 10,
                                    options: ["They are price takers", "They produce where MR=MC", "They always earn economic profit", "They face a perfectly elastic demand curve"],
                                    correctIndex: 1,
                                    explanation: "All profit maximizing firms produce where Marginal Revenue equals Marginal Cost."
                                }
                            ]}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="GuidedExercise" description="Step-by-step interactive tutor">
                        <GuidedExercise
                            difficulty={3}
                            question="Solve for the equilibrium price if Qd = 100 - 2P and Qs = 20 + 2P"
                            thinkingDirection="Set Quantity Demanded equal to Quantity Supplied (Qd = Qs) and isolate P."
                            steps={[{ title: "Step 1", content: "100 - 2P = 20 + 2P" }, { title: "Step 2", content: "80 = 4P" }]}
                            finalAnswer="P = 20"
                        />
                    </ComponentPreview>
                </section>

                {/* --- 5. SUMMARIES & NAVIGATION --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">5. Chapter Endings</h2>
                        <p className="text-muted-foreground mt-2">Blocks placed at the conclusion of educational modules.</p>
                    </div>

                    <ComponentPreview name="NarrativeSummary" description="Story-driven wrap-up">
                        <NarrativeSummary
                            data={{
                                content: "Today we toured the fundamentals of organizational behavior, moving from individual biases up to group dynamics.",
                                tip: { title: "Focus on Systems", content: "Individual behavior is often a product of the environments we design." },
                                pitfall: { title: "The Fundamental Attribution Error", content: "Remember to look for situational factors before blaming personality." }
                            }}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="TopicSummary" description="Bullet-point wrap-up">
                        <TopicSummary
                            content="Reviewing the core tenets of microeconomics."
                            keyPoints={["Scarcity forces choice", "Rational people think at the margin", "Trade can make everyone better off"]}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="TopicNavigation" description="Next/Prev routing block">
                        <TopicNavigation
                            previousTopic={{ title: "Previous: Intro to Econ", chapter: "1" }}
                            nextTopic={{ title: "Next: Supply and Demand", chapter: "3" }}
                        />
                    </ComponentPreview>
                </section>

                {/* --- 6. INTERACTIVE & BUSINESS LOGIC WIDGETS --- */}
                <section>
                    <div className="mb-8 border-b-4 border-primary/20 pb-4">
                        <h2 className="text-3xl font-black text-foreground">6. Complex Interactive Widgets & Charts</h2>
                        <p className="text-muted-foreground mt-2">Bespoke SVGs, Flowcharts, and interactive models.</p>
                    </div>

                    <ComponentPreview name="ConceptAccordion" description="Nested collapsible content">
                        <ConceptAccordion sectionTitle="Key Marketing Principles" items={[{ id: "c1", title: "Product", content: "What are you selling?" }, { id: "c2", title: "Price", content: "How much does it cost?" }]} />
                    </ComponentPreview>

                    <ComponentPreview name="MaslowPyramid" description="Custom SVG behavioral model">
                        <MaslowPyramid />
                    </ComponentPreview>

                    <ComponentPreview name="SituationalLeadershipGuide" description="Interactive 2x2 matrix dashboard">
                        <SituationalLeadershipGuide />
                    </ComponentPreview>

                    <ComponentPreview name="AttributionFlowchart" description="Logic tree rendering">
                        <AttributionFlowchart mode="reference" />
                    </ComponentPreview>

                    <ComponentPreview name="DiagnosticCaseStudy" description="Multi-part narrative assessment">
                        <DiagnosticCaseStudy
                            title="The Tech Startup Crisis"
                            subtitle="Analyzing team lifecycle"
                            scenario="A high-performing startup suddenly faces massive turnover after acquiring series B funding."
                            sections={[{ id: "s1", title: "Initial Assessment", content: "Morale has dropped significantly.", questions: [{ id: "q1", text: "What is the primary indicator of failure here?", options: ["Poor Product", "Cultural Shift"], correctIndex: 1, explanation: "Scaling quickly often breaks early culture." }] }]}
                            conclusion="Communication structures failed to scale with headcount."
                            keyTakeaways={["Implement middle-management early", "Maintain transparent all-hands meetings"]}
                        />
                    </ComponentPreview>

                    <ComponentPreview name="PPFGraph" description="Production Possibility Frontier visualizer">
                        <PPFGraph />
                    </ComponentPreview>

                    <ComponentPreview name="CurveShifter" description="Economic shifting visualizer (Supply/Demand)">
                        <CurveShifter
                            title="Market for Coffee Beans"
                            shifters={[
                                { id: "s1", description: "Drought in Brazil destroys crops", impact: { type: "shift_left", magnitude: 15, target: "supply" }, explanation: "A negative supply shock shifts S to the left." },
                                { id: "s2", description: "Tea prices increase dramatically", impact: { type: "shift_right", magnitude: 10, target: "demand" }, explanation: "Coffee and Tea are substitutes. Higher tea prices increase demand for coffee." }
                            ]}
                        />
                    </ComponentPreview>
                </section>

            </main>
        </div>
    );
}
