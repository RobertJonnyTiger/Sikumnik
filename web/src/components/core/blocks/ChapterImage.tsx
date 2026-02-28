"use client";

import React from "react";
import Image from "next/image";

interface ChapterImageProps {
    src: string;
    alt: string;
    caption?: string;
}

export const ChapterImage: React.FC<ChapterImageProps> = ({ src, alt, caption }) => {
    return (
        <figure className="my-6">
            <div className="group rounded-2xl overflow-hidden border border-border/30 bg-card/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300">
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                />
            </div>
            {caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};
