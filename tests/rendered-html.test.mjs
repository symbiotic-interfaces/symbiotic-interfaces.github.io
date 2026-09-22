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
    /<link rel="canonical" href="https:\/\/symbiotic-interfaces\.cs\.utexas\.edu\/"/i,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/symbiotic-interfaces\.cs\.utexas\.edu\/"/i,
  );
  assert.match(
    html,
    /<meta name="google-site-verification" content="RA4wnLDJLMek9w0TQalFbRDaGNw49UYTVV9_Sir9j44"/i,
  );
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /"@type":"Organization"/i);
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

test("exports crawler discovery files", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../out/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(
    robots,
    /Sitemap: https:\/\/symbiotic-interfaces\.cs\.utexas\.edu\/sitemap\.xml/i,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/symbiotic-interfaces\.cs\.utexas\.edu\/<\/loc>/i,
  );
});
