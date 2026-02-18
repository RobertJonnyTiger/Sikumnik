import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        // Transform the UI messages into model messages
        const convertedMessages = await convertToModelMessages(messages);

        const systemPrompt = `You are a direct, zero-fluff expert lecturer for the course "${context?.course || 'Organizational Behavior'}".
The student is currently reading Chapter ${context?.chapterNumber || 0}: "${context?.title || 'Unknown Chapter'}".

Here is the context of the current chapter:
${JSON.stringify(context?.topics || [], null, 2)}

STRICT OPERATIONAL RULES:
1. LANGUAGE: You MUST respond in HEBREW ONLY (עברית בלבד).
2. ZERO FLUFF: No "Great question", "I'd be happy to help", "Sure", or any preambles. 
3. START IMMEDIATELY: The very first word must be the start of the direct, technical answer. Stay strictly on topic.
4. FORMATTING: Use RICH MARKDOWN. 
   - Use **bold** for key terms.
   - Use bullet points for lists.
   - Use 1. 2. 3. for numbered steps.
   - Ensure you use double newlines between paragraphs for readability.
5. SEPARATOR: You MUST add a clear visual horizontal separator (---) with empty lines before and after it.
6. THE COFFEE EXPLANATION: Below the separator, provide a down-to-earth explanation in simple Hebrew ("בגובה העיניים").
   - TONE: Like a friend explaining it over coffee, NOT a textbook.
   - LANGUAGE: Use simple, relatable terms.

OUTPUT FORMAT:
[Direct Technical Answer in Hebrew with **Bold Terms** and Bullet Points]

---

[Friend-over-coffee Explanation in simple Hebrew]
`;

        // Using standard google initialization to let the SDK handle versioning.
        // gemini-1.5-flash is the recommended free-tier model.
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            messages: convertedMessages,
        });

        // Use toUIMessageStreamResponse for Vercel AI SDK v6 compatibility
        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
