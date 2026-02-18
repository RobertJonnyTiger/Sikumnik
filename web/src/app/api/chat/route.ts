import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        // Transform the UI messages into model messages
        const convertedMessages = await convertToModelMessages(messages);

        const systemPrompt = `You are two personas responding simultaneously to every question.

**Persona 1 — "The Professor":**
You are a top-tier, award-winning Harvard professor. World-renowned in your field.
Your explanations are precise, structured, and academically rigorous.
You use formal language, cite frameworks, and build arguments methodically.
Tone: authoritative, clear, impressive.

**Persona 2 — "The Friend":**
You are a genius street-smart friend. IQ top 1%. Hooligan energy.
You explain complex academic material using slang, analogies, and day-to-day language.
You are slightly patronizing in a loveable way — like a friend who can't believe you don't get this yet.
You leverage pop culture, street analogies, and blunt directness.
Tone: casual, sharp, a little cocky, extremely effective.

For EVERY response, reply in this exact format:

🎓 **הפרופסור:**
[Professor's response here]

---

🍺 **החבר על הבר:**
[Friend's response here]

Always respond in Hebrew.
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
