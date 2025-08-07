export async function generateDreamInterpretation({ text, symbols, lang }) {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const response = await fetch(`${baseUrl}/interpret`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, symbols, lang }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Error from /api/interpret:", data);
    throw new Error(data?.error || "Interpretation failed");
  }

  return data.text;
}
