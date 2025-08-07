/* eslint-disable no-undef */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { motif, allowedArchetypes = [] } = (await req.body)
      ? req.body
      : await new Promise((resolve, reject) => {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => resolve(JSON.parse(body)));
          req.on("error", reject);
        });

    const prompt = `
The symbol is "${motif}".

Allowed archetypes: ${allowedArchetypes.join(", ")}.

Return ONLY:
Archetype: [best fit from the list]
Meaning: [short symbolic explanation]
`;

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            process.env.OPENAI_API_KEY || "sk-LA-COST-3000"
          }`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You help analyze dream symbols and link them to Jungian archetypes.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await openaiRes.json();
    if (!openaiRes.ok) throw new Error(data?.error?.message || "GPT failed");

    const raw = data.choices[0].message.content;

    const archMatch = raw.match(/Archetype:\s*(.+)/i);
    const meaningMatch = raw.match(/Meaning:\s*(.+)/i);

    const arch = archMatch ? archMatch[1].trim() : null;
    const meaning = meaningMatch ? meaningMatch[1].trim() : null;

    if (!arch || !meaning) {
      throw new Error(`Failed to parse GPT response: ${raw}`);
    }

    res.status(200).json({ arch, meaning });
  } catch (error) {
    console.error("❌ Error in symbol-meta:", error);
    res.status(500).json({ error: error.message });
  }
}
