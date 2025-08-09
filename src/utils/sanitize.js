const ZERO_WIDTH = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\u00AD\uFEFF]/g;

export const LIMITS = {
  min: 3,
  max: 10000,
  searchMax: 200,
};

export function cleanString(input) {
  if (typeof input !== "string") return "";
  let x = input.normalize("NFKC");
  x = x.replace(ZERO_WIDTH, "");
  x = x.replace(/[^\S\r\n\t]+/g, " ");
  x = x.trim();
  return x;
}

export function validateDreamText(text) {
  const value = cleanString(text);
  if (value.length < LIMITS.min) return { ok: false, reason: "too_short" };
  if (value.length > LIMITS.max) return { ok: false, reason: "too_long" };
  return { ok: true, value };
}
