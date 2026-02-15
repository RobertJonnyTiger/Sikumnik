import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const chaptersDir = path.resolve(__dirname, "../../src/data/chapters");

describe("Chapter JSON schema validation", () => {
    const chapterFiles = fs
        .readdirSync(chaptersDir)
        .filter((f) => f.startsWith("chapter-") && f.endsWith(".json"));

    it("has at least one chapter file", () => {
        expect(chapterFiles.length).toBeGreaterThan(0);
    });

    chapterFiles.forEach((file) => {
        describe(file, () => {
            const data = JSON.parse(
                fs.readFileSync(path.join(chaptersDir, file), "utf8")
            );

            it("has required top-level fields", () => {
                expect(data).toHaveProperty("title");
                expect(typeof data.title).toBe("string");
                // Chapter 2 uses a different schema (15-section structure)
                // Other chapters use summary + sections array
                if (file !== "chapter-2.json") {
                    expect(data).toHaveProperty("summary");
                    expect(data).toHaveProperty("sections");
                    expect(typeof data.summary).toBe("string");
                    expect(Array.isArray(data.sections)).toBe(true);
                }
            });

            it("has Hebrew title", () => {
                // Hebrew Unicode range: \u0590-\u05FF
                expect(data.title).toMatch(/[\u0590-\u05FF]/);
            });

            it("has pageMap data for banner", () => {
                expect(data).toHaveProperty("pageMap");
                expect(data).toHaveProperty("chapterNumber");
                expect(data).toHaveProperty("totalChapters");
                expect(typeof data.chapterNumber).toBe("number");
            });

            it("has valid sections with types", () => {
                // Chapter 2 uses a different section format
                if (!data.sections) return;
                const validTypes = ["concept", "calculation", "journal_entry", "table"];
                data.sections.forEach((section: any) => {
                    expect(validTypes).toContain(section.type);
                    expect(section).toHaveProperty("title");
                });
            });
        });
    });
});
