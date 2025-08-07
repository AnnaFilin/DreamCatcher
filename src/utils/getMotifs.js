export async function getMotifs(text, knownMotifs) {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const response = await fetch(`${baseUrl}/motifs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      knownMotifs,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Motif API error:", data);
    throw new Error(data?.error || "Failed to extract motifs");
  }

  console.log("✅ Motifs:", data.motifs);
  return data.motifs;
}
