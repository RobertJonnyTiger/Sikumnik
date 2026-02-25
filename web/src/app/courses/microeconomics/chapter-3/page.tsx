import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/microeconomics/chapters/chapter-3.json";

export default function Chapter3Page() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
