import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const locales = ["si", "ta"].map((code) => [
  code,
  JSON.parse(read(`../src/locales/${code}.json`)),
]);
const placeholders = (text) =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
test("Sinhala and Tamil have matching, nonempty translations and interpolation parameters", () => {
  assert.deepEqual(
    Object.keys(locales[0][1]).sort(),
    Object.keys(locales[1][1]).sort(),
  );
  for (const [code, entries] of locales)
    for (const [key, value] of Object.entries(entries)) {
      assert.ok(value.trim(), `${code}: ${key}`);
      assert.deepEqual(
        placeholders(value),
        placeholders(key),
        `${code}: ${key}`,
      );
    }
});
test("the original four organs retain complete structure and view translations", () => {
  for (const organ of ["heart", "brain", "lungs", "kidneys"]) {
    const source = read(`../src/components/${organ}.tsx`);
    for (const match of source.matchAll(
      /(?:name|label|description):\s*"([^"]+)"/g,
    )) {
      for (const [code, entries] of locales)
        assert.ok(entries[match[1]], `${code}: ${match[1]}`);
    }
  }
});
test("UI keys and organ lesson content have both translations", () => {
  const app = read("../src/App.tsx") + read("../src/organs.ts");
  const viewer = read("../src/components/organ-viewer.tsx");
  const keys = [...(app + viewer).matchAll(/\bt\(\s*"([^"]+)"/g)].map(
    (m) => m[1],
  );
  for (const match of app.matchAll(
    /(?:system|description|focus|region|question|explanation):\s*"([^"]+)"/g,
  ))
    keys.push(match[1]);
  for (const match of app.matchAll(/answers:\s*\[([^\]]+)\]/g))
    for (const answer of match[1].matchAll(/"([^"]+)"/g)) keys.push(answer[1]);
  for (const [code, entries] of locales)
    for (const key of keys) assert.ok(entries[key], `${code}: ${key}`);
});
