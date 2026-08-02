import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the lab homepage", async () => {
  const html = await readFile(
    new URL("../out/index.html", import.meta.url),
    "utf8",
  );
  assert.match(html, /<title>Symbiotic Interfaces Lab<\/title>/i);
  assert.match(
    html,
    /Building a symbiotic loop between computing interfaces and human abilities/,
  );
  assert.match(html, /id="team"/);
  assert.match(html, /id="news"/);
  assert.match(html, /id="research"/);
  assert.match(html, /Submit the research interest form/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});
