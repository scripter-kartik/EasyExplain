import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import Groq from "groq-sdk"
import { CohereClient } from "cohere-ai"

dotenv.config()

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(express.json())

const apis = {
    groq: process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null,
    cohere: process.env.COHERE_API_KEY ? new CohereClient({ token: process.env.COHERE_API_KEY }) : null,
    gemini: process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null
};

const availableApis = Object.entries(apis).filter(([key, val]) => val !== null).map(([key]) => key);

if (availableApis.length === 0) {
    console.error("No API keys found! Add at least one API key to .env");
    console.error("   Get free keys from:");
    console.error("   - Groq: https://console.groq.com/ (14,400/day) BEST");
    console.error("   - Cohere: https://dashboard.cohere.com/ (5,000/month)");
    console.error("   - Gemini: https://aistudio.google.com/ (1,500/day)");
    process.exit(1);
}

app.get("/", (req, res) => {
    res.json({
        status: "Server is running!",
        availableApis: availableApis,
        totalApis: availableApis.length
    })
})

async function explainWithGroq(text, mode) {
    if (!apis.groq) throw new Error("Groq not configured");

    const prompts = {
        simple: `Explain this in very simple words that a 10-year-old would understand. Keep it brief (3-4 sentences):\n\n${text}`,
        eli5: `Explain this like I'm 5 years old, using simple analogies:\n\n${text}`,
        detailed: `Provide a clear, detailed explanation with examples:\n\n${text}`,
        summary: `Summarize this in 2-3 sentences:\n\n${text}`,
        technical: `Explain this in technical terms with proper terminology:\n\n${text}`,
        bullet: `Explain this as 3-5 bullet points:\n\n${text}`
    };

    const completion = await apis.groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompts[mode] || prompts.simple
            }
        ],
        model: "llama-3.3-70b-versatile", 
        temperature: 0.5,
        max_tokens: mode === "detailed" ? 300 : 200,
    });

    return completion.choices[0]?.message?.content?.trim() || "No response";
}

async function explainWithCohere(text, mode) {
    if (!apis.cohere) throw new Error("Cohere not configured");

    const prompts = {
        simple: `Explain this in very simple words (3-4 sentences):\n\n${text}`,
        eli5: `Explain this like I'm 5 years old:\n\n${text}`,
        detailed: `Provide a detailed explanation with examples:\n\n${text}`,
        summary: `Summarize this in 2-3 sentences:\n\n${text}`,
        technical: `Explain this in technical terms:\n\n${text}`,
        bullet: `List 3-5 key points:\n\n${text}`
    };

    const response = await apis.cohere.generate({
        prompt: prompts[mode] || prompts.simple,
        model: "command",
        maxTokens: mode === "detailed" ? 250 : 150,
        temperature: 0.5,
        stopSequences: [],
    });

    return response.generations[0].text.trim();
}

async function explainWithGemini(text, mode) {
    if (!apis.gemini) throw new Error("Gemini not configured");

    const prompts = {
        simple: `Explain this briefly in simple words:\n\n${text}`,
        eli5: `Explain this like I'm 5 years old:\n\n${text}`,
        detailed: `Provide a detailed explanation:\n\n${text}`,
        summary: `Summarize this briefly:\n\n${text}`,
        technical: `Explain this in technical terms:\n\n${text}`,
        bullet: `List key points:\n\n${text}`
    };

    const modelPriority = [
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-2.0-flash",
        "gemini-pro-latest"
    ];

    let lastError = null;

    for (const modelName of modelPriority) {
        try {
            const model = apis.gemini.getGenerativeModel({ model: modelName });

            const result = await model.generateContent(
                prompts[mode] || prompts.simple,
                {
                    maxOutputTokens: mode === "detailed" ? 250 : 150,
                    temperature: 0.5,
                }
            );

            return result.response.text().trim();

        } catch (err) {
            lastError = err;
            if (err.status === 429) continue; 
            throw err;
        }
    }

    throw lastError || new Error("All Gemini models failed");
}

app.post("/explain", async (req, res) => {
    try {
        console.log("Request received:", req.body);

        let { text, mode = "simple" } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const maxChars = 800;
        if (text.length > maxChars) {
            text = text.substring(0, maxChars) + "...";
        }

        const apiPriority = [
            { name: "groq", func: explainWithGroq, label: "Groq (14k/day)", emoji: "⭐" },
            { name: "cohere", func: explainWithCohere, label: "Cohere (5k/month)", emoji: "🟣" },
            { name: "gemini", func: explainWithGemini, label: "Gemini (1.5k/day)", emoji: "🔷" }
        ];

        const availableApiPriority = apiPriority.filter(api => apis[api.name]);

        if (availableApiPriority.length === 0) {
            return res.status(500).json({
                error: "No APIs configured",
                details: "Please add at least one API key to .env file"
            });
        }

        let explanation;
        let apiUsed;
        let lastError;

        for (const api of availableApiPriority) {
            try {
                console.log(`${api.emoji} Trying ${api.label}...`);
                explanation = await api.func(text, mode);
                apiUsed = api.name;
                console.log(`${api.label} succeeded!`);
                break; 

            } catch (err) {
                console.log(`${api.label} failed: ${err.message.substring(0, 80)}...`);
                lastError = err;

                continue;
            }
        }

        if (!explanation) {
            throw lastError || new Error("All APIs failed");
        }

        res.json({
            explanation,
            mode,
            api: apiUsed
        });

    } catch (err) {
        console.error("All APIs exhausted:", err.message);

        if (err.status === 429 || err.message.includes("rate limit") || err.message.includes("quota")) {
            return res.status(429).json({
                error: "All APIs rate limited",
                details: "All available APIs have hit their limits. Please try again in a few minutes.",
                availableApis: availableApis
            });
        }

        res.status(500).json({
            error: "All APIs failed",
            details: err.message,
            availableApis: availableApis
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    const apiInfo = {
        groq: "GROQ (14,400/day)",
        cohere: "COHERE (5,000/month)",
        gemini: "GEMINI (1,500/day)"
    };

    console.log(`
EasyExplain Backend Running                    
http://localhost:${PORT}  
Available APIs (${availableApis.length}):                              
${availableApis.map(api => `${apiInfo[api]?.padEnd(45) || api.toUpperCase().padEnd(45)}`).join('\n')}
Priority: Groq → Cohere → Gemini               
Auto-fallback when one hits limits             
Up to 14,400 daily requests with Groq!
    `)
})