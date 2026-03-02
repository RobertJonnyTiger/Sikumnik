"use client";

import React from "react";

interface TopicTabProps {
    isActive: boolean;
    children: React.ReactNode;
}

export const TopicTab: React.FC<TopicTabProps> = ({ isActive, children }) => {
    if (!isActive) return null;

    return (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {children}
        </div>
    );
};
