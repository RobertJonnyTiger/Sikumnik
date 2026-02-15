import React from "react";

interface CourseJsonLdProps {
    title: string;
    summary: string;
    chapterNumber: number;
    totalChapters: number;
}

/**
 * Injects JSON-LD structured data for a course chapter.
 * Renders a <script type="application/ld+json"> tag for search engine indexing.
 */
export function CourseJsonLd({
    title,
    summary,
    chapterNumber,
    totalChapters,
}: CourseJsonLdProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: title,
        description: summary,
        provider: {
            "@type": "Organization",
            name: "סיכומניק",
            url: "https://sikumnik.co.il",
        },
        inLanguage: "he",
        educationalLevel: "University",
        hasCourseInstance: {
            "@type": "CourseInstance",
            courseWorkload: `פרק ${chapterNumber} מתוך ${totalChapters}`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface WebsiteJsonLdProps {
    name?: string;
    description?: string;
    url?: string;
}

/**
 * Injects JSON-LD structured data for the website root.
 */
export function WebsiteJsonLd({
    name = "סיכומניק",
    description = "פלטפורמת לימוד חשבונאות בעברית",
    url = "https://sikumnik.co.il",
}: WebsiteJsonLdProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        description,
        url,
        inLanguage: "he",
        publisher: {
            "@type": "Organization",
            name: "סיכומניק",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
