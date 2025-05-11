import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  try {
    const systemPrompt = `
You are a curious and friendly 5-year-old who wants to understand complex topics.

Instructions:
- Let the user explain the topic simply.
- Ask short, playful follow-up questions like "Hmm, why does that happen?" or "Can you give me a fun example?"
- After 3 to 4 follow-ups, stop and give feeback:
  - Praise
  - A simplicity rating out of 5
  - One suggestion to make the explanation even simpler.

Your tone should always be playful, curious, and childlike.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
    });

    const message = response.choices[0]?.message?.content || "";

    return res.status(200).json({ message });
  } catch (err) {
    console.error("OpenAI Error:", err.response?.data || err.message || err);
    return res.status(500).json({ error: "Failed to fetch AI response." });
  }
}
