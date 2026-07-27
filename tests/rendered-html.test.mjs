import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the lab homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
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
