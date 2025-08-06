export function formatMotif(motif) {
  return typeof motif === "string" ? motif : motif.value;
}
