"use client";

import React from "react";
import { LessonMarkdown } from "./LessonMarkdown";
import { Alert } from "./Alert";

interface CalloutProps {
    variant?: "info" | "warning" | "tip";
    title?: string;
    content: string;
}

export const Callout: React.FC<CalloutProps> = ({ variant = "info", title, content }) => {
    const variantMap = { info: "tip", warning: "warning", tip: "tip" } as const;
    const alertVariant = variantMap[variant];

    return (
        <Alert variant={alertVariant} title={title}>
            <LessonMarkdown>{content}</LessonMarkdown>
        </Alert>
    );
};
