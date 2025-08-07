/* eslint-disable no-undef */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, symbols = [], lang } = req.body || {};

  const motifsPart = symbols
    .map(
      (s) =>
        `- ${s.id}: ${s.arch || "Unknown"} — ${s.meaning || "No meaning yet."}`
    )
    .join("\n");

  const langTag =
    lang === "ru" ? "in RUSSIAN" : lang === "he" ? "in HEBREW" : "in ENGLISH";

  const prompt = `
Dream text:
"""
${text}
"""

Key motifs and their archetypal meanings:
${motifsPart}

Write a short Jungian-style interpretation of this dream ${langTag}, considering the motifs and their symbolic meanings. Be concise, poetic and insightful.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You help interpret dreams in Jungian style.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ GPT error:", data);
      return res
        .status(response.status)
        .json({ error: data?.error?.message || "GPT failed" });
    }

    res.status(200).json({ text: data.choices[0].message.content.trim() });
  } catch (err) {
    console.error("🔥 Internal error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
