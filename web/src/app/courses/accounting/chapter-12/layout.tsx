import type { Metadata } from "next";
import { createChapterMetadata } from "@/lib/chapter-metadata";
import chapterData from "@/data/chapters/accounting/chapter-12.json";

export const metadata: Metadata = createChapterMetadata(chapterData as any);

export default function Chapter12Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
