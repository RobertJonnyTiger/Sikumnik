export default function ChapterLoading() {
    return (
        <div className="w-full px-6 lg:px-12 xl:px-16 py-8 max-w-[1600px] mx-auto animate-pulse">
            {/* PageMap Banner Skeleton */}
            <div className="glass-card p-6 mb-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-64 bg-secondary rounded-lg" />
                    <div className="h-6 w-24 bg-secondary rounded-full" />
                </div>
                <div className="h-4 w-full max-w-lg bg-secondary/60 rounded" />
                <div className="flex gap-3 mt-4">
                    <div className="h-6 w-32 bg-secondary/40 rounded-full" />
                    <div className="h-6 w-28 bg-secondary/40 rounded-full" />
                    <div className="h-6 w-36 bg-secondary/40 rounded-full" />
                </div>
            </div>

            {/* Content Skeletons */}
            <div className="max-w-5xl mx-auto space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-6 space-y-3">
                        <div className="h-6 w-48 bg-secondary rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-secondary/40 rounded" />
                            <div className="h-4 w-5/6 bg-secondary/40 rounded" />
                            <div className="h-4 w-4/6 bg-secondary/40 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
