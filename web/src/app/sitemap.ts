import type { MetadataRoute } from "next";

const BASE_URL = "https://sikumnik.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
    const chapters = Array.from({ length: 12 }, (_, i) => i + 1);

    const chapterRoutes: MetadataRoute.Sitemap = chapters.map((num) => ({
        url: `${BASE_URL}/courses/accounting/chapter-${num}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/courses`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/courses/accounting/intro`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...chapterRoutes,
    ];
}
