import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { createChapterMetadata } from "@/lib/chapter-metadata";

// Next.js App Router dynamic route params interface
type Props = {
    params: Promise<{ courseId: string; chapterId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Next.js app router 15+ needs to be Promise-based
export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const { courseId, chapterId } = params;

    try {
        // Dynamically import the JSON file based on the courseId and chapterId
        const chapterData = await import(`@/data/${courseId}/chapters/chapter-${chapterId}.json`);
        return createChapterMetadata(chapterData.default);
    } catch (e) {
        return {
            title: "פרק לא נמצא",
        };
    }
}

export default async function ChapterLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string; chapterId: string }>;
}) {
    // We can intercept rendering here if a chapter is absolutely totally missing for the layout
    const resolvedParams = await params;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
