export async function generateDreamInterpretation({ text, symbols }) {
  const motifsPart = symbols
    .map(
      (s) =>
        `- ${s.id}: ${s.arch || "Unknown"} — ${s.meaning || "No meaning yet."}`
    )
    .join("\n");

  const prompt = `
Dream text:
"""
${text}
"""

Key motifs and their archetypal meanings:
${motifsPart}

Write a short Jungian-style interpretation of this dream in RUSSIAN, considering the motifs and their symbolic meanings. Be concise, poetic and insightful.
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
