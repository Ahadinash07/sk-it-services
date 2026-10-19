import assert from "node:assert/strict";
import { cloneValue, itemLabel, makeNewValue, setAtPath } from "../lib/cms/editor.js";

const original = {
  hero: { title: "Before" },
  faq: { qa: [["Question", "Answer"]] },
};
const updated = setAtPath(original, ["faq", "qa", 0, 1], "Updated answer");
assert.equal(updated.faq.qa[0][1], "Updated answer");
assert.equal(original.faq.qa[0][1], "Answer");

const copy = cloneValue(original);
copy.hero.title = "After";
assert.equal(original.hero.title, "Before");

assert.deepEqual(makeNewValue("sections", [], ["legal", "terms", "sections"]), ["Section title", ["Paragraph text."]]);
assert.deepEqual(makeNewValue("cards", [], ["landing", "contact", "cards"]).action, "phone");
assert.deepEqual(makeNewValue("groups", [], ["footer", "groups"]).links, [["Link name", "#section"]]);
assert.equal(itemLabel(["Question", "Answer"], 0, "qa"), "Question");
assert.equal(itemLabel(["laptop", "Laptop"], 0, "devices"), "Laptop");

console.log("Admin editor nested updates and new-item shape checks passed.");
