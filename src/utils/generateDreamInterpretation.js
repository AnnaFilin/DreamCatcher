import i18n from "../i18n/i18n";

export async function generateDreamInterpretation({ text, symbols, lang }) {
  const usedLang = lang || i18n.language || "en";

  const motifsPart = symbols
    .map(
      (s) =>
        `- ${s.id}: ${s.arch || "Unknown"} — ${s.meaning || "No meaning yet."}`
    )
    .join("\n");

  const langTag =
    usedLang === "ru"
      ? "in RUSSIAN"
      : usedLang === "he"
      ? "in HEBREW"
      : "in ENGLISH";

  const prompt = `
Dream text:
"""
${text}
"""

Key motifs and their archetypal meanings:
${motifsPart}

Write a short Jungian-style interpretation of this dream ${langTag}, considering the motifs and their symbolic meanings. Be concise, poetic and insightful.
`;

  console.log("📌 FINAL PROMPT:", prompt);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You help interpret dreams in Jungian style.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("❌ GPT error:", data);
    throw new Error(data?.error?.message || "GPT failed");
  }

  const raw = data.choices[0].message.content.trim();
  console.log("✅ GPT INTERPRETATION:", raw);

  return raw;
}
