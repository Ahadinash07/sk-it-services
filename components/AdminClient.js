"use client";

import { useEffect, useMemo, useState } from "react";

const GROUPS = [
  { label: "Site", items: ["landing", "navigation", "footer", "trustStrip", "productTrust"] },
  { label: "Collections", items: ["services", "products", "why", "process", "stats", "reviews", "faq"] },
  { label: "Settings", items: ["business", "customPc", "quote", "inquiryTypes", "seo", "tracking", "legal"] },
];

const LABELS = {
  landing: "Landing page copy",
  navigation: "Navigation",
  footer: "Footer",
  services: "Services",
  products: "Products",
  why: "Why choose us",
  process: "How we work",
  stats: "Review stats",
  reviews: "Reviews",
  faq: "FAQs",
  business: "Business details",
  customPc: "Custom PC",
  quote: "Quote form",
  inquiryTypes: "Inquiry types",
  seo: "SEO metadata",
  tracking: "Tracking & scripts",
  legal: "Legal pages",
  trustStrip: "Service trust strip",
  productTrust: "Product trust strip",
};

const NEW_ITEMS = {
  navigation: { label: "New link", href: "#section" },
  services: { id: "new-service", img: "/images/hero.jpg", kicker: "New service", title: "New service", text: "Describe this service.", items: ["Key point"], cta: "Learn more", msg: "I'd like to learn more." },
  products: { id: "new-product", img: "/images/prod-1.jpg", icon: "box", title: "New product", text: "Describe this product.", short: "Describe this product.", items: ["Key feature"], cta: "Ask about it", item: "New product" },
  why: { icon: "shield", img: "/images/why-1.jpg", title: "New reason", text: "Explain why customers choose you." },
  process: { icon: "chat", img: "/images/why-1.jpg", title: "New step", text: "Explain this step." },
  stats: { icon: "star", big: "0", small: "", label: "New statistic" },
  reviews: { name: "Customer name", when: "Today", text: "Customer feedback." },
  faq: { id: "new-category", icon: "help", label: "New category", sub: "Category description", qa: [["Question?", "Answer."]] },
  inquiryTypes: "New inquiry type",
  trustStrip: ["shield", "New trust point"],
  productTrust: ["shield", "New product trust point"],
};

const pretty = (value) => JSON.stringify(value, null, 2);

function itemLabel(item, index) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    return item.title || item.label || item.name || item.id || `Item ${index + 1}`;
  }
  if (Array.isArray(item)) return item[1] || item[0] || `Item ${index + 1}`;
  return String(item || `Item ${index + 1}`);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

function PageTitle({ name, type }) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-600">{type === "array" ? "Collection" : "Single type"}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{LABELS[name] || name}</h2>
        <p className="mt-1 text-sm text-slate-500">Edit every field in this content record. Changes go live without a rebuild.</p>
      </div>
      <a href="/" target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-700 hover:text-emerald-900">View website ↗</a>
    </div>
  );
}

function UploadBox({ onUploaded, message }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true); setError("");
    try {
      const body = new FormData(); body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Upload failed");
      await navigator.clipboard?.writeText(payload.file.url);
      onUploaded(payload.file.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally { setBusy(false); }
  };
  return (
    <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-extrabold text-emerald-950">Media upload</p><p className="mt-1 text-xs text-emerald-800">JPEG, PNG, WebP or GIF up to 5 MB. The URL is copied for your JSON field.</p></div>
        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} className="sr-only" />{busy ? "Uploading…" : "Upload image"}</label>
      </div>
      {message && <p className="mt-3 break-all text-xs font-semibold text-emerald-800">Uploaded URL: {message}</p>}
      {error && <p className="mt-3 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

function ContentEditor({ name, value, type, index, onChange, onSave, onDelete, onAdd, saving }) {
  const [uploadMessage, setUploadMessage] = useState("");
  useEffect(() => setUploadMessage(""), [name, index]);
  const isArray = type === "array";
  return (
    <div className="space-y-5">
      <UploadBox message={uploadMessage} onUploaded={(url) => setUploadMessage(url)} />
      <div>
        <label className="mb-2 block text-sm font-extrabold text-slate-800">{isArray ? `JSON for item ${index + 1}` : "JSON document"}</label>
        <textarea value={value} onChange={(event) => onChange(event.target.value)} spellCheck={false} className="min-h-[460px] w-full rounded-2xl border border-slate-300 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-lime-100 shadow-inner outline-none ring-emerald-500 focus:ring-2" />
        <p className="mt-2 text-xs leading-relaxed text-slate-500">Use valid JSON. Strings, headings, button labels, arrays, image paths and nested fields are all editable here. Existing local images use paths such as <code>/images/hero.jpg</code>; uploaded images use <code>/uploads/…</code>.</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {isArray ? <button onClick={onDelete} disabled={index < 0 || saving} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">Delete item</button> : <span />}
        <div className="flex gap-3"><button onClick={onAdd} disabled={!isArray || saving} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:hidden">Add item</button><button onClick={onSave} disabled={saving} className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button></div>
      </div>
    </div>
  );
}

export default function AdminClient() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [schema, setSchema] = useState(null);
  const [selected, setSelected] = useState("landing");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [editor, setEditor] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadContent = async () => {
    const payload = await requestJson("/api/admin/content");
    setContent(payload.content); setSchema(payload.schema); setError("");
    return payload.content;
  };

  useEffect(() => {
    loadContent().catch((loadError) => setError(loadError.message)).finally(() => setLoading(false));
  }, []);

  const currentValue = useMemo(() => {
    if (!content) return null;
    const collection = content[selected];
    return Array.isArray(collection) ? collection[selectedIndex] : collection;
  }, [content, selected, selectedIndex]);

  useEffect(() => {
    if (currentValue !== null && currentValue !== undefined) setEditor(pretty(currentValue));
  }, [currentValue, selected, selectedIndex, content]);

  const choose = (name) => {
    setSelected(name); setSelectedIndex(Array.isArray(content?.[name]) ? (content[name].length ? 0 : -1) : -1);
    setNotice(""); setError("");
  };

  const save = async () => {
    let parsed;
    try { parsed = JSON.parse(editor); } catch (parseError) { setError(`Invalid JSON: ${parseError.message}`); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const collection = content[selected];
      const nextCollection = Array.isArray(collection) ? collection.map((item, index) => index === selectedIndex ? parsed : item) : parsed;
      const payload = await requestJson(`/api/admin/content/${encodeURIComponent(selected)}`, { method: "PUT", body: JSON.stringify({ data: nextCollection }) });
      setContent((current) => ({ ...current, [selected]: payload.data })); setNotice("Saved. The public website now reads this content at request time.");
    } catch (saveError) { setError(saveError.message); } finally { setBusy(false); }
  };

  const addItem = () => {
    if (!Array.isArray(content?.[selected])) return;
    const next = NEW_ITEMS[selected] ?? (content[selected][0] ? JSON.parse(JSON.stringify(content[selected][0])) : {});
    const nextCollection = [...content[selected], next];
    setContent((current) => ({ ...current, [selected]: nextCollection })); setSelectedIndex(nextCollection.length - 1); setEditor(pretty(next)); setNotice("New item staged. Save changes to persist it.");
  };

  const deleteItem = async () => {
    if (!Array.isArray(content?.[selected]) || selectedIndex < 0) return;
    if (!window.confirm(`Delete ${itemLabel(content[selected][selectedIndex], selectedIndex)}?`)) return;
    setBusy(true); setError("");
    try {
      const payload = await requestJson(`/api/admin/content/${encodeURIComponent(selected)}?index=${selectedIndex}`, { method: "DELETE", headers: { "Content-Type": "application/json" } });
      setContent((current) => ({ ...current, [selected]: payload.data })); setSelectedIndex(Math.max(0, Math.min(selectedIndex, payload.data.length - 1))); setNotice("Item deleted.");
    } catch (deleteError) { setError(deleteError.message); } finally { setBusy(false); }
  };

  if (loading) return <main className="grid min-h-screen place-items-center bg-slate-950 text-white"><p>Loading CMS…</p></main>;
  if (!content) return <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white"><p className="rounded-2xl bg-red-400/10 p-5 text-center text-red-200">Unable to load CMS content: {error || "Unknown error"}</p></main>;
  const collectionType = schema?.collections?.[selected] || (Array.isArray(content?.[selected]) ? "array" : "object");
  const selectedItems = Array.isArray(content?.[selected]) ? content[selected] : [];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-black text-lime">SK</div><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Admin CMS</p><h1 className="text-lg font-black">Content Studio</h1></div></div>
          <div className="flex items-center gap-2"><a href="/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">View site ↗</a></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24 lg:h-fit">
          <p className="px-3 pb-3 text-xs font-black uppercase tracking-[.18em] text-slate-400">Content</p>
          {GROUPS.map((group) => <div key={group.label} className="mb-5"><p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{group.label}</p><nav className="space-y-0.5">{group.items.map((name) => <button key={name} onClick={() => choose(name)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${selected === name ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>{LABELS[name]}</button>)}</nav></div>)}
          <div className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500"><b className="text-slate-700">Runtime publishing</b><br />No build is needed after a save. Keep <code>storage/</code> and <code>public/uploads/</code> on a persistent Hostinger filesystem.</div>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800"><b>Direct access mode</b><br />There is no CMS login. Protect this route with Hostinger Basic Auth or an IP allowlist before publishing it publicly.</div>
        </aside>
        <section className="min-w-0">
          <div className="mb-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Collections</p><p className="mt-1 text-2xl font-black">{schema?.collections ? Object.keys(schema.collections).length : 0}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Editing</p><p className="mt-1 truncate text-2xl font-black">{LABELS[selected] || selected}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Publishing</p><p className="mt-1 text-2xl font-black text-emerald-700">Live</p></div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <PageTitle name={selected} type={collectionType} />
            {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            {notice && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</div>}
            {collectionType === "array" && <div className="mb-5 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">{selectedItems.map((item, index) => <button key={`${itemLabel(item, index)}-${index}`} onClick={() => setSelectedIndex(index)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${selectedIndex === index ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{index + 1}. {itemLabel(item, index)}</button>)}{!selectedItems.length && <p className="px-2 py-2 text-sm text-slate-500">No items yet. Add the first item below.</p>}</div>}
            <ContentEditor name={selected} value={editor} type={collectionType} index={selectedIndex} onChange={setEditor} onSave={save} onDelete={deleteItem} onAdd={addItem} saving={busy} />
          </div>
        </section>
      </div>
    </main>
  );
}
