import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { readFileSync } from "node:fs";

test("all 42 organs have valid routing, selectable structures, views, credits, translations, and quizzes", async () => {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  try {
    const { organs } = await server.ssrLoadModule("/src/organs.ts");
    assert.equal(organs.length, 42);
    assert.equal(new Set(organs.map((o) => o.id)).size, 42);
    const translations = ["si", "ta"].map((code) =>
      JSON.parse(readFileSync(`src/locales/${code}.json`, "utf8")),
    );
    for (const organ of organs) {
      const { model } = organ;
      assert.ok(model.structures.length > 0, organ.id);
      assert.equal(
        new Set(model.structures.map((s) => s.id)).size,
        model.structures.length,
        organ.id,
      );
      assert.ok(
        model.views.some((v) => v.name === model.defaultView),
        organ.id,
      );
      for (const view of model.views)
        for (const id of view.structureIds ?? [])
          assert.ok(
            model.structures.some((s) => s.id === id),
            `${organ.id}: ${id}`,
          );
      assert.ok(model.src.startsWith("https://"), organ.id);
      assert.ok(
        model.attribution.credit &&
          model.attribution.license &&
          model.attribution.licenseUrl,
        organ.id,
      );
      assert.equal(organ.answers.length, 3, organ.id);
      assert.equal(new Set(organ.answers).size, 3, organ.id);
      assert.ok(
        organ.correct >= 0 && organ.correct < organ.answers.length,
        organ.id,
      );
      if (organ.question === "Which structure is included in this model?") {
        const labels = new Set(model.structures.map((s) => s.label));
        assert.ok(labels.has(organ.answers[organ.correct]), organ.id);
        assert.equal(
          organ.answers.filter((a) => labels.has(a)).length,
          1,
          organ.id,
        );
      }
      for (const dictionary of translations)
        for (const key of [
          model.name,
          organ.system,
          organ.focus,
          organ.region,
          organ.description,
          organ.question,
          organ.explanation,
        ])
          assert.ok(dictionary[key], `${organ.id}: ${key}`);
    }
  } finally {
    await server.close();
  }
});
