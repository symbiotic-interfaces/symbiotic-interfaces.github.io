export const siteName = "Symbiotic Interfaces Lab";

export const siteDescription =
  "Symbiotic Interfaces Lab at UT Austin builds a symbiotic loop between computing interfaces and human abilities.";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://symbiotic-interfaces.cs.utexas.edu"
).replace(/\/$/, "");

