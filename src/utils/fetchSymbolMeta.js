export async function fetchSymbolMeta(motif, allowedArchetypes) {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const response = await fetch(`${baseUrl}/symbol-meta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      motif,
      allowedArchetypes,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ SymbolMeta API error:", data);
    throw new Error(data?.error || "Failed to get symbol meta");
  }

  return data;
}
