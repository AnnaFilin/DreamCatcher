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
    const { text, knownMotifs = [] } = (await req.body)
      ? req.body
      : await new Promise((resolve, reject) => {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => resolve(JSON.parse(body)));
          req.on("error", reject);
        });

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
              content: "You help analyze dreams and extract motifs.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await openaiRes.json();
    if (!openaiRes.ok) throw new Error(data?.error?.message || "GPT failed");

    const raw = data.choices[0].message.content;
    const cleaned = raw.replace(/Motifs:\s*/i, "").trim();
    const motifs = cleaned
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);

    res.status(200).json({ motifs });
  } catch (error) {
    console.error("❌ Error in get-motifs:", error);
    res.status(500).json({ error: error.message });
  }
}
