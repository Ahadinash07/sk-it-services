"use client";
/* eslint-disable @next/next/no-img-element -- The editor previews user-provided local paths and uploads. */

import { useEffect, useState } from "react";
import { ChevronDown, Image as ImageIcon, Plus, Trash2, Upload } from "lucide-react";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import { cloneValue, itemLabel, makeNewValue, setAtPath } from "@/lib/cms/editor";
const ICON_OPTIONS = [
  "laptop", "monitor", "wrench", "users", "box", "mouse", "cpu", "ram", "gear", "wifi",
  "shield", "shield2", "headset", "tag", "diamond", "gamepad", "briefcase", "video", "chat",
  "search", "file", "star", "thumb", "help", "handshake", "tablet", "plus", "power", "gauge",
  "battery", "keyboard", "phone", "mail", "pin", "clock", "store", "send", "arrow", "check", "whatsapp",
];

const IMAGE_KEYS = new Set(["image", "img", "logo", "openGraphImage", "storeImage"]);
const MULTILINE_KEYS = new Set([
  "description", "text", "short", "note", "message", "buildMessage", "consultationMessage", "privacyNotice",
  "successMessage", "messageTemplate", "customHead", "customBodyStart", "customBodyEnd", "copyright",
]);

const FIELD_DESCRIPTIONS = {
  id: "A short internal name. Visitors will not see this value.",
  icon: "Choose the small icon shown beside this content.",
  href: "Where should this link go? For a page section, use a value such as #services.",
  imageAlt: "A short description for visitors who cannot see the image.",
  img: "The picture shown with this item.",
  image: "The picture shown with this section.",
  logo: "The logo image shown in the website header.",
  primaryHref: "Where the main button takes visitors.",
  canonicalUrl: "The main web address for this page, including https://.",
  openGraphImage: "The image used when this website is shared on social media.",
  phoneRaw: "The phone number used for calling.",
  phoneWa: "The WhatsApp number, with country code and numbers only.",
  tracking: "Only change these settings if you have been given a tracking ID.",
};

const TUPLE_LABELS = {
  qa: ["Question", "Answer"],
  links: ["Link name", "Link address"],
  trust: ["Icon", "Text"],
  types: ["Icon", "Name"],
  steps: ["Icon", "Title", "Description"],
  stillQuestionsItems: ["Icon", "Question type"],
  devices: ["Icon", "Device name"],
  issues: ["Icon", "Issue name"],
  sections: ["Section title", "Paragraphs"],
};
const ICON_TUPLE_NAMES = new Set(["trust", "types", "steps", "stillQuestionsItems", "devices", "issues"]);

function humanize(value) {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function fieldLabel(fieldName) {
  const labels = {
    eyebrow: "Small heading",
    title: "Main heading",
    titleAccent: "Highlighted heading",
    kicker: "Small label",
    description: "Description",
    text: "Description",
    primaryCta: "Main button text",
    secondaryCta: "Second button text",
    big: "Big number",
    small: "Small number text",
    when: "Date or time",
    img: "Image",
    image: "Image",
    imageAlt: "Image description",
    openGraphImage: "Social sharing image",
    cta: "Button text",
    href: "Link address",
    sub: "Small description",
    qa: "Questions and answers",
    items: "Key points",
    brands: "Brands",
  };
  return labels[fieldName] || humanize(fieldName);
}

function descriptionFor(fieldName) {
  return FIELD_DESCRIPTIONS[fieldName] || "";
}

function isImageField(fieldName, value) {
  const name = String(fieldName).toLowerCase();
  if (name.endsWith("alt")) return false;
  return IMAGE_KEYS.has(fieldName) || name.endsWith("image") || (typeof value === "string" && /^\/(images|uploads)\//.test(value));
}

function isMultiline(fieldName, value) {
  return MULTILINE_KEYS.has(fieldName) || (typeof value === "string" && value.length > 100);
}

function inputType(fieldName) {
  const name = String(fieldName).toLowerCase();
  if (name.includes("email")) return "email";
  if (name.includes("phone") || name.includes("wa")) return "tel";
  if (name.includes("url") || name === "href" || name.endsWith("href")) return "url";
  return "text";
}

function FieldLabel({ name, description, count }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-extrabold text-slate-800">{fieldLabel(name)}</label>
        {count !== undefined && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{count}</span>}
      </div>
      {description && <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>}
    </div>
  );
}

function ImageField({ name, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [broken, setBroken] = useState(false);
  const source = typeof value === "string" ? value : "";

  useEffect(() => {
    setBroken(false);
    setError("");
  }, [source]);

  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "The image could not be uploaded.");
      onChange(payload.file.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{name === "logo" ? "Logo preview" : "Picture preview"}</p>
          <p className="mt-1 text-xs text-slate-500">You can see the picture here before saving.</p>
        </div>
        <ImageIcon className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center">
        <div>
          <input
            value={source}
            onChange={(event) => onChange(event.target.value)}
            type="text"
            placeholder="/images/your-picture.jpg"
            className="admin-input"
            aria-label={`${fieldLabel(name)} path`}
          />
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-extrabold text-emerald-800 transition hover:bg-emerald-50">
            <Upload className="h-4 w-4" aria-hidden="true" />
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} className="sr-only" />
            {busy ? "Uploading…" : "Choose a new picture"}
          </label>
          {error && <p className="mt-2 text-xs font-semibold text-red-700">{error}</p>}
        </div>
        <div className="relative grid h-28 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-32">
          {source && !broken ? (
            <img src={source} alt="Selected content" className="h-full w-full object-contain" onError={() => setBroken(true)} />
          ) : (
            <div className="px-3 text-center text-xs font-semibold text-slate-400">
              {source ? "Picture not found" : "No picture selected"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScalarField({ name, value, onChange }) {
  if (typeof value === "boolean") {
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300">
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-5 w-5 accent-emerald-700" />
        <span><span className="block text-sm font-extrabold text-slate-800">{fieldLabel(name)}</span><span className="mt-1 block text-xs text-slate-500">Turn this option on or off.</span></span>
      </label>
    );
  }

  if (name === "icon") {
    const options = ICON_OPTIONS.includes(value) || !value ? ICON_OPTIONS : [value, ...ICON_OPTIONS];
    return (
      <div>
        <FieldLabel name={name} description={descriptionFor(name)} />
        <div className="flex gap-2">
          <select value={value || ""} onChange={(event) => onChange(event.target.value)} className="admin-input min-w-0 flex-1" aria-label={fieldLabel(name)}>
            {!value && <option value="">Choose an icon</option>}
            {options.map((option) => <option key={option} value={option}>{humanize(option)}</option>)}
          </select>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">{value === "whatsapp" ? <WhatsAppIcon className="h-5 w-5" /> : <Icon name={value} className="h-5 w-5" />}</div>
        </div>
      </div>
    );
  }

  const textValue = value === null || value === undefined ? "" : String(value);
  const commonProps = {
    value: textValue,
    onChange: (event) => onChange(typeof value === "number" ? (event.target.value === "" ? "" : Number(event.target.value)) : event.target.value),
    className: "admin-input",
    "aria-label": fieldLabel(name),
  };
  return (
    <div>
      <FieldLabel name={name} description={descriptionFor(name)} />
      {isMultiline(name, value) ? <textarea {...commonProps} rows={name === "description" || name === "text" ? 4 : 3} /> : <input {...commonProps} type={typeof value === "number" ? "number" : inputType(name)} />}
    </div>
  );
}

export function TupleEditor({ name, value, onChange }) {
  const labels = TUPLE_LABELS[name] || [];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {value.map((item, index) => (
        <div key={`${name}-${index}`} className={value.length > 2 && index === value.length - 1 ? "sm:col-span-2" : ""}>
          {Array.isArray(item) ? (
            <ArrayEditor name={labels[index] || "Items"} value={item} onChange={(next) => onChange(index, next)} />
          ) : item && typeof item === "object" ? (
            <ObjectEditor value={item} onChange={(path, next) => onChange(index, setAtPath(item, path, next))} />
          ) : typeof item === "string" && (labels[index] === "Icon" || (index === 0 && ICON_TUPLE_NAMES.has(name))) ? (
            <ScalarField name="icon" value={item} onChange={(next) => onChange(index, next)} />
          ) : (
            <ScalarField name={labels[index] || `value${index + 1}`} value={item} onChange={(next) => onChange(index, next)} />
          )}
        </div>
      ))}
    </div>
  );
}

export function ArrayEditor({ name, value, onChange, path = [], templatePath = path }) {
  const updateItem = (index, nextItem) => onChange(value.map((item, itemIndex) => itemIndex === index ? nextItem : item));
  const addItem = () => onChange([...value, makeNewValue(name, value, templatePath)]);
  const removeItem = (index) => {
    if (typeof window !== "undefined" && !window.confirm(`Remove ${itemLabel(value[index], index, name)}?`)) return;
    onChange(value.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <FieldLabel name={name} count={value.length} />
        <button type="button" onClick={addItem} className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-extrabold text-emerald-800 hover:bg-emerald-50"><Plus className="h-4 w-4" /> Add</button>
      </div>
      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={`${name}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.12em] text-slate-400">{index + 1}. {itemLabel(item, index, name)}</p>
              <button type="button" onClick={() => removeItem(index)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
            </div>
            {Array.isArray(item) ? (
              <TupleEditor name={name} value={item} onChange={(itemIndex, next) => updateItem(index, item.map((part, partIndex) => partIndex === itemIndex ? next : part))} />
            ) : item && typeof item === "object" ? (
              <ObjectEditor value={item} contextPath={[...templatePath, index]} onChange={(path, next) => updateItem(index, setAtPath(item, path, next))} />
            ) : (
              <ScalarField name={name} value={item} onChange={(next) => updateItem(index, next)} />
            )}
          </div>
        ))}
        {!value.length && <p className="rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center text-sm text-slate-500">Nothing added yet. Choose “Add” to create the first one.</p>}
      </div>
    </div>
  );
}

export function FieldEditor({ name, value, path, templatePath = path, onChange }) {
  const update = (next) => onChange(path, next);
  if (Array.isArray(value)) return <ArrayEditor name={name} value={value} path={path} templatePath={templatePath} onChange={update} />;
  if (value && typeof value === "object") {
    return (
      <details className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl text-sm font-extrabold text-slate-800 [&::-webkit-details-marker]:hidden">
          <span><span className="block">{fieldLabel(name)}</span>{descriptionFor(name) && <span className="mt-1 block text-xs font-normal text-slate-500">{descriptionFor(name)}</span>}</span>
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
        </summary>
        <div className="mt-4 border-t border-slate-200 pt-4"><ObjectEditor value={value} basePath={path} contextPath={templatePath} onChange={onChange} /></div>
      </details>
    );
  }
  if (isImageField(name, value)) {
    return <div className="space-y-2"><FieldLabel name={name} description={descriptionFor(name)} /><ImageField name={name} value={value} onChange={update} /></div>;
  }
  return <ScalarField name={name} value={value} onChange={update} />;
}

export function ObjectEditor({ value, basePath = [], contextPath = basePath, onChange }) {
  const entries = Object.entries(value || {});
  if (!entries.length) return <p className="rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center text-sm text-slate-500">There are no fields here yet.</p>;
  return (
    <div className="space-y-4">
      {entries.map(([name, fieldValue]) => <FieldEditor key={`${basePath.join(".")}.${name}`} name={name} value={fieldValue} path={[...basePath, name]} templatePath={[...contextPath, name]} onChange={onChange} />)}
    </div>
  );
}
