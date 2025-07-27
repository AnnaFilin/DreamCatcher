export async function fetchSymbolMeta(motif, allowedArchetypes) {
  const prompt = `
The symbol is "${motif}".

Allowed archetypes: ${allowedArchetypes.join(", ")}.

Return ONLY:
Archetype: [best fit from the list]
Meaning: [short symbolic explanation]
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
          content:
            "You help analyze dream symbols and link them to Jungian archetypes.",
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

  const archMatch = raw.match(/Archetype:\s*(.+)/i);
  const meaningMatch = raw.match(/Meaning:\s*(.+)/i);

  const arch = archMatch ? archMatch[1].trim() : null;
  const meaning = meaningMatch ? meaningMatch[1].trim() : null;

  if (!arch || !meaning) {
    throw new Error(`Failed to parse GPT response: ${raw}`);
  }

  return { arch, meaning };
}
