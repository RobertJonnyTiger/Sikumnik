import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/microeconomics/chapters/chapter-1.json";

const ArcadePlaceholder = ({ title, type }: { title: string; type: string }) => (
  <div
    className="p-8 border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 my-8 text-center"
    data-testid={`arcade-${type}`}
  >
    <div className="text-2xl mb-2">🎮</div>
    <div className="font-bold text-lg mb-1">{title}</div>
    <div className="text-sm text-muted-foreground font-mono">{type}</div>
  </div>
);

export default function Chapter1Page() {
  const data = chapterData as unknown as ChapterData;

  const registry = {
    "arcade-speed-sorter": <ArcadePlaceholder title="Speed Sorter" type="speed-sorter" />,
    "arcade-prediction-market": <ArcadePlaceholder title="Prediction Market" type="prediction-market" />,
    "arcade-flashcard-blitz": <ArcadePlaceholder title="Flashcard Blitz" type="flashcard-blitz" />,
  };

  return <ChapterTemplate data={data} interactiveRegistry={registry} />;
}
