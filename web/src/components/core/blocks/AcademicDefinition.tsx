import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
// Use local Lucide imports or valid properties if 'size' is not available in lucide-react 
// (The project uses ^0.563.0 which should have standard props, but let's be safe).
import { GraduationCap, Quote } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface AcademicDefinitionProps {
    title?: string;
    content?: string;
    source?: string;
    category?: string;
    showIcon?: boolean;
}

export const AcademicDefinition: React.FC<AcademicDefinitionProps> = ({
    title = 'הגדרה אקדמית',
    content = 'זוהי הגדרה אקדמית רשמית המיועדת למטרות חינוכיות.',
    source = 'מקור: מוסד אקדמי מוכר',
    category = 'הגדרה',
    showIcon = true,
}) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-2" dir="rtl">
            <Card className="border-2 border-[#1877F2] shadow-lg bg-background">
                <CardHeader className="space-y-3 pb-3">
                    <CardTitle className="text-2xl font-bold text-[#1877F2] leading-relaxed">
                        {title}
                    </CardTitle>
                    <Separator className="bg-[#1877F2]/20" />
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="relative">
                        <div className="absolute top-0 right-0 opacity-10">
                            <Quote className="w-12 h-12 text-[#1877F2]" />
                        </div>
                        <div className="relative bg-linear-to-br from-[#1877F2]/5 to-transparent rounded-lg p-6 border border-[#1877F2]/20">
                            <div className="text-xl leading-relaxed text-foreground font-medium markdown-content">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-12 bg-[#1877F2] rounded-full"></div>
                            <p className="text-sm text-muted-foreground font-medium">
                                {source}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {showIcon && (
                                <div className="p-2 rounded-lg bg-[#1877F2]/10">
                                    <GraduationCap className="w-5 h-5 text-[#1877F2]" />
                                </div>
                            )}
                            <Badge
                                variant="secondary"
                                className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 font-semibold text-xs"
                            >
                                {category}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
