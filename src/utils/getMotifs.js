export async function getMotifs(text, knownMotifs) {
  const prompt = `
Here is a dream text: """${text}"""

The dream may be in any language.

Known motifs so far: [${knownMotifs.join(", ")}].

Extract 1–3 key motifs as clear English words or short phrases.
If any new motif matches the meaning of an existing one — reuse it.
If the meaning is truly new — add it.

Return only a comma-separated list.
Do not add any extra text.
`;

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
          content: "You help analyze dreams and extract motifs.",
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

  const raw = data.choices[0].message.content;
  console.log("✅ GPT RAW:", raw);

  const cleaned = raw.replace(/Motifs:\s*/i, "").trim();
  return cleaned
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);
}
