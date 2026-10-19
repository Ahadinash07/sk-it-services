export function cloneValue(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

export function setAtPath(value, path, nextValue) {
  if (!path.length) return nextValue;
  const [key, ...rest] = path;
  const copy = Array.isArray(value) ? [...value] : { ...(value || {}) };
  copy[key] = rest.length ? setAtPath(copy[key], rest, nextValue) : nextValue;
  return copy;
}

function blankLike(value, fieldName = "") {
  if (Array.isArray(value)) return value.map((item) => blankLike(item, fieldName));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, blankLike(item, key)]));
  }
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  if (fieldName === "id") return "new-item";
  if (fieldName === "icon") return "box";
  return "";
}

export function makeNewValue(fieldName, items = [], path = []) {
  const hasSuffix = (suffix) => {
    const suffixParts = suffix.split(".");
    return suffixParts.every((part, index) => path[path.length - suffixParts.length + index] === part);
  };
  if (!items.length && hasSuffix("heroFeatures")) return { icon: "monitor", title: "New feature", sub: "Short description" };
  if (!items.length && hasSuffix("contact.cards")) return { icon: "phone", title: "New contact option", main: "", sub: "Short description", action: "phone" };
  if (!items.length && hasSuffix("groups")) return { title: "New group", links: [["Link name", "#section"]] };
  if (!items.length && hasSuffix("privacy.sections")) return ["Section title", ["Paragraph text."]];
  if (!items.length && hasSuffix("terms.sections")) return ["Section title", ["Paragraph text."]];
  if (!items.length && hasSuffix("customPc.steps")) return ["chat", "New step", "Explain this step."];
  if (!items.length && hasSuffix("quote.devices")) return ["laptop", "New device"];
  if (!items.length && hasSuffix("quote.issues")) return ["help", "New issue"];
  if (fieldName === "qa") return ["Question", "Answer"];
  if (fieldName === "links") return ["Link name", "#section"];
  if (fieldName === "stillQuestionsItems") return ["help", "New question type"];
  if (["trust", "types"].includes(fieldName)) return ["shield", "New item"];
  if (items.length) return blankLike(items[0], fieldName);
  return "";
}

export function itemLabel(item, index, collectionName = "") {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    return item.title || item.label || item.name || item.id || `Item ${index + 1}`;
  }
  if (Array.isArray(item)) {
    const firstValueNames = new Set(["qa", "links", "sections"]);
    const value = firstValueNames.has(collectionName) ? item[0] : (typeof item[1] === "string" ? item[1] : item[0]);
    return value || `Item ${index + 1}`;
  }
  return String(item || `Item ${index + 1}`);
}
