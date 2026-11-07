import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { getTranslationArray } from "./translationArray.ts";

/** A t() like the app's: returns the string at a dotted path, or the key itself when missing. */
function makeT(dict: Record<string, unknown>) {
  return (key: string): string => {
    const value = key
      .split(".")
      .reduce<unknown>((node, part) => (node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined), dict);
    return typeof value === "string" ? value : key;
  };
}

const t = makeT({ list: { points: ["one", "two", "three"] } });

describe("getTranslationArray", () => {
  test("returns every translated item even when the fallback is shorter", () => {
    assert.deepEqual(getTranslationArray(t, "list.points", ["fallback one"]), ["one", "two", "three"]);
  });

  test("stops at the translated length when the fallback is longer", () => {
    assert.deepEqual(getTranslationArray(t, "list.points", ["a", "b", "c", "d", "e"]), ["one", "two", "three"]);
  });

  test("uses the fallback only when nothing is translated", () => {
    assert.deepEqual(getTranslationArray(t, "missing.points", ["a", "b"]), ["a", "b"]);
  });
});
