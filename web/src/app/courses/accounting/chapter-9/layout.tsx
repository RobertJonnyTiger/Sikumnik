import type { Metadata } from "next";
import { createChapterMetadata } from "@/lib/chapter-metadata";
import chapterData from "@/data/chapters/chapter-9.json";

export const metadata: Metadata = createChapterMetadata(chapterData as any);

export default function Chapter9Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
