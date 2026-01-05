import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.post("/explain", async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Explain the following text in very simple words for a beginner:\n\n${text}`
    });

    res.json({
      explanation: response.output_text
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => {
    console.log("EasyExplain backend running on http://localhost:3000")
})