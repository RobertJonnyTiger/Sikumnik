import type { Metadata } from "next";
import { createChapterMetadata } from "@/lib/chapter-metadata";
import chapterData from "@/data/accounting/chapters/chapter-3.json";

export const metadata: Metadata = createChapterMetadata(chapterData as any);

export default function Chapter3Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
