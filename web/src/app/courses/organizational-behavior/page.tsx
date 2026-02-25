"use client";

import React from "react";
import { courseData } from "@/data/organizational-behavior";
import { CourseLandingTemplate } from "@/components/layout/CourseLandingTemplate";
import { Brain, Users, Network, Target } from "lucide-react";

export default function OrganizationalBehaviorPage() {
    // OB page has specific visual cards
    const visualCards = [
        { icon: Brain, title: "הפרט", color: "bg-blue-500" },
        { icon: Users, title: "הקבוצה", color: "bg-purple-500" },
        { icon: Network, title: "הארגון", color: "bg-emerald-500" },
        { icon: Target, title: "האסטרטגיה", color: "bg-orange-500" },
    ];

    return <CourseLandingTemplate courseData={{ ...courseData, visualCards }} />;
}
