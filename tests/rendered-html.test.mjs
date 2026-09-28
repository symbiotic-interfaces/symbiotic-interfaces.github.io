import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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
  assert.match(html, /class="publication-resources"/);
  assert.match(html, /href="\/papers\/myo-action\.pdf"/);
  assert.match(html, />Paper<\/span>/);
  assert.match(html, />Video<\/span>/);
  assert.match(html, />Publication<\/span>/);
  assert.match(html, />Talk<\/span>/);
  assert.doesNotMatch(html, /Open publication:/);
  assert.match(html, /Submit the research interest form/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("includes every locally hosted research paper", async () => {
  const paperFiles = [
    "electrical-head-actuation.pdf",
    "full-hand-electrotactile.pdf",
    "haptic-source-effector.pdf",
    "input-accuracy.pdf",
    "magnetic-muscle-stimulation.pdf",
    "myo-action.pdf",
    "primed-action.pdf",
    "reawristic.pdf",
    "smartwatch-muscle-stimulation.pdf",
    "vestibular-stimulation.pdf",
    "wearable-haptics.pdf",
  ];

  await Promise.all(
    paperFiles.map(async (filename) => {
      const file = await stat(
        new URL(`../out/papers/${filename}`, import.meta.url),
      );
      assert.ok(file.size > 0, `${filename} should not be empty`);
    }),
  );
});

test("only first-author papers include talk links", async () => {
  const projects = JSON.parse(
    await readFile(new URL("../content/research.json", import.meta.url), "utf8"),
  );

  for (const project of projects) {
    if (project.authors.startsWith("Yudai Tanaka")) continue;

    assert.equal(
      project.resources.some((resource) => resource.type === "talk"),
      false,
      `${project.title} should not include a talk link`,
    );
  }
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
