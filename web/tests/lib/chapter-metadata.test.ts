import { describe, it, expect } from "vitest";
import { createChapterMetadata } from "@/lib/chapter-metadata";

describe("createChapterMetadata", () => {
    it("returns correct title and description", () => {
        const meta = createChapterMetadata({
            title: "פרק 3: דוח רווח והפסד",
            summary: "הסרט של השנה העסקית",
            chapterNumber: 3,
        });

        expect(meta.title).toBe("פרק 3: דוח רווח והפסד");
        expect(meta.description).toBe("הסרט של השנה העסקית");
    });

    it("includes OpenGraph metadata with he_IL locale", () => {
        const meta = createChapterMetadata({
            title: "פרק 5: מאזן בוחן",
            summary: "טבלת ביקורת",
            chapterNumber: 5,
        });

        expect(meta.openGraph).toBeDefined();
        expect(meta.openGraph!.locale).toBe("he_IL");
        expect((meta.openGraph as any).type).toBe("article");
        expect(meta.openGraph!.title).toBe("פרק 5: מאזן בוחן");
    });
});
