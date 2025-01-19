import OpenAI from 'openai';
import readlineSync from 'readline-sync';
console.log('API Key:', process.env.OPENAI_API_KEY);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});


function getWeatherDetails(city) {
    const cityLower = city.toLowerCase();
    if (cityLower === 'jammmu') return '10°C';
    if (cityLower === 'delhi') return '20°C';
    if (cityLower === 'mumbai') return '30°C';
    if (cityLower === 'kolkata') return '40°C';
    if (cityLower === 'chennai') return '50°C';
    if (cityLower === 'bangalore') return '60°C';
    if (cityLower === 'hyderabad') return '70°C';
    if (cityLower === 'pune') return '80°C';
    if (cityLower === 'jaipur') return '90°C';
    return 'City not found';
}

const SYSTEM_PROMPT = `You are an AI assistant with START, PLAN, ACTION, Observation, and Output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get observation, Return the AI response based on START prompt and observations.

Example:
START
{"type": "user", "user": "Hey, what is the weather in Delhi?"}
PLAN
{"type": "tool", "tool": "getWeatherDetails", "args": {"city": "Delhi"}}
ACTION
{"type": "tool", "tool": "getWeatherDetails", "args": {"city": "Delhi"}}
Observation
{"type": "observation", "observation": "20°C"}
AI Response
{"type": "output", "output": "The weather in Delhi is 20°C."}
END`;

const messages = [{"role": "system", "content": SYSTEM_PROMPT}];

async function chatLoop() {
    while (true) {
        const userPrompt = readlineSync.question('User: ');
        const userMessage = {
            type: 'user',
            user: userPrompt,
        };
        
        messages.push({ role: 'user', content: JSON.stringify(userMessage) });

        const chat = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            response_format: { type: 'json_object' },
        });

        const result = chat.choices[0].message.content;
        messages.push({ role: 'assistant', content: result });

        const call = JSON.parse(result);

        if (call.type === 'output') {
            console.log(`Bot: ${call.output}`);
            break; 
        } else {
            console.log("Bot is processing...");
        }
    }
}

chatLoop();
