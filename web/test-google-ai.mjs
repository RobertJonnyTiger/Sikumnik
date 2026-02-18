import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1',
});

async function main() {
    console.log('Testing Google AI Connection...');
    console.log('API Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);

    try {
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: 'Hi, are you working?',
        });
        console.log('Response from AI:', text);
    } catch (error) {
        console.error('Error connecting to Google AI:');
        console.error(error);

        if (error.data) {
            console.error('Error Data:', JSON.stringify(error.data, null, 2));
        }
    }
}

main();
