import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { topicTitle, topicContent, courseName } = await req.json();

        if (!topicContent || !topicTitle) {
            return new Response(JSON.stringify({
                error: 'Missing required fields: topicTitle and topicContent'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const systemPrompt = `You are an educational content creator specializing in creating "Did You Know" trivia facts.

Your task: Generate 3 interesting, surprising, or mind-blowing facts related to the educational content provided.

Guidelines:
- Facts should be directly related to the topic content but provide additional context, historical background, real-world applications, or surprising connections
- Mix different types: historical facts, real-world applications, surprising statistics, famous people/organizations involved, or counter-intuitive insights
- Keep facts concise (1-2 sentences each)
- Write in Hebrew
- Make facts engaging and memorable
- Categories should be short and descriptive in Hebrew

You must respond with ONLY a JSON object in this exact format:
{
  "facts": [
    {"category": "Category Name", "fact": "The interesting fact here"},
    {"category": "Category Name", "fact": "The interesting fact here"},
    {"category": "Category Name", "fact": "The interesting fact here"}
  ]
}

Examples of good facts:
- "החשבונאי האיטלקי לוקה פאצ'ולי (1494) נחשב לאבי החשבונאות המודרנית. הוא היה חבר קרוב של ליאונרדו דה וינצ'י!"
- "פרויקט אריסטו של גוגל מצא ש'ביטחון פסיכולוגי' הוא הגורם מספר 1 להצלחת צוותים."
- "אברהם מאסלו מעולם לא צייר פירמה! הפירמידה נוספה מאוחר יותר על ידי יועצי ניהול."`;

        const userPrompt = `Course: ${courseName || 'General'}
Topic: ${topicTitle}

Content to base facts on:
${JSON.stringify(topicContent, null, 2)}

Generate 3 interesting "Did You Know" facts that expand on this content or provide surprising context about it.`;

        const result = await generateText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: userPrompt,
            temperature: 0.8,
        });

        // Debug Log
        console.log("Trivia AI Response:", result.text);

        // Parse the JSON response
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("Invalid JSON format from AI:", result.text);
            throw new Error('Invalid response format from AI');
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return new Response(JSON.stringify(parsed), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: unknown) {
        console.error('Trivia Generation Error Details:', error);
        return new Response(JSON.stringify({
            error: 'Failed to generate trivia',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
