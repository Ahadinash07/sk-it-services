"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Eye, HelpCircle, Layers3, Save, Settings2, Trash2 } from "lucide-react";
import {
  ObjectEditor,
  ScalarField,
  TupleEditor,
} from "@/components/AdminFieldEditor";
import { cloneValue, itemLabel, makeNewValue, setAtPath } from "@/lib/cms/editor";

const GROUPS = [
  {
    label: "Website",
    help: "Words and pictures visitors see",
    items: ["landing", "navigation", "footer", "trustStrip", "productTrust"],
  },
  {
    label: "Your content",
    help: "Services, products and customer help",
    items: ["services", "products", "why", "process", "stats", "reviews", "faq"],
  },
  {
    label: "Settings",
    help: "Business and website settings",
    items: ["business", "customPc", "quote", "inquiryTypes", "seo", "tracking", "legal"],
  },
];

const LABELS = {
  landing: "Home page",
  navigation: "Menu links",
  footer: "Footer",
  services: "Services",
  products: "Products",
  why: "Why choose us",
  process: "How we work",
  stats: "Numbers and results",
  reviews: "Customer reviews",
  faq: "Questions and answers",
  business: "Business information",
  customPc: "Custom PC builder",
  quote: "Quote form",
  inquiryTypes: "Contact form choices",
  seo: "Search and sharing",
  tracking: "Tracking tools",
  legal: "Legal pages",
  trustStrip: "Service promises",
  productTrust: "Product promises",
};

const DESCRIPTIONS = {
  landing: "Edit the words, buttons and pictures on your home page.",
  navigation: "Change the links in the website menu.",
  footer: "Change the bottom part of the website.",
  services: "Add or edit the services you offer.",
  products: "Add or edit products and product categories.",
  why: "Tell visitors why they should choose your business.",
  process: "Explain your steps from first contact to delivery.",
  stats: "Show the numbers that build customer trust.",
  reviews: "Add real feedback from your customers.",
  faq: "Answer common customer questions.",
  business: "Keep your phone, email, address and opening hours up to date.",
  customPc: "Edit custom PC options and the build process.",
  quote: "Change the choices and messages in the quote form.",
  inquiryTypes: "Change the choices visitors can select when contacting you.",
  seo: "Change the title and description shown in Google and social sharing.",
  tracking: "Optional tools for website visits and advertising.",
  legal: "Edit privacy and terms pages.",
  trustStrip: "Short promises shown below the services section.",
  productTrust: "Short promises shown below the products section.",
};

const NEW_ITEMS = {
  navigation: { label: "New menu link", href: "#section" },
  services: { id: "new-service", img: "", kicker: "New service", title: "New service", text: "Describe this service.", items: ["Key point"], cta: "Learn more", msg: "I would like to learn more." },
  products: { id: "new-product", img: "", icon: "box", title: "New product", text: "Describe this product.", short: "Describe this product.", items: ["Key feature"], cta: "Ask about it", item: "New product" },
  why: { icon: "shield", img: "", title: "New reason", text: "Explain why customers choose you." },
  process: { icon: "chat", img: "", title: "New step", text: "Explain this step." },
  stats: { icon: "star", big: "0", small: "", label: "New statistic" },
  reviews: { name: "Customer name", when: "Today", text: "Customer feedback." },
  faq: { id: "new-category", icon: "help", label: "New category", sub: "Category description", qa: [["Question?", "Answer."]] },
  inquiryTypes: "New contact choice",
  trustStrip: ["shield", "New service promise"],
  productTrust: ["shield", "New product promise"],
};

const prettyType = (type) => type === "array" ? "List" : "Page settings";

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

function PageIntro({ name, type, onViewSite }) {
  return (
    <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-emerald-700">
          <span>{prettyType(type)}</span><span className="text-slate-300">•</span><span>Changes are live after saving</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{LABELS[name] || name}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{DESCRIPTIONS[name] || "Edit this part of your website using simple fields."}</p>
      </div>
      <button type="button" onClick={onViewSite} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50"><Eye className="h-4 w-4" /> View website <ArrowUpRight className="h-4 w-4" /></button>
    </div>
  );
}

function HelpPanel() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-700"><HelpCircle className="h-5 w-5" /></div>
        <div>
          <p className="text-sm font-black text-emerald-950">How to update your website</p>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-emerald-900">
            <li><b>1.</b> Choose a section on the left.</li>
            <li><b>2.</b> Change words, pictures or choices in the boxes.</li>
            <li><b>3.</b> Press <b>Save changes</b>, then view your website.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function CollectionList({ name, items, selectedIndex, onSelect, onAdd, disabled }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start justify-between gap-2 px-2 pb-3">
        <div><p className="text-xs font-black uppercase tracking-[.14em] text-slate-400">Your items</p><p className="mt-1 text-xs text-slate-500">{items.length} {items.length === 1 ? "item" : "items"}</p></div>
        <button type="button" onClick={onAdd} disabled={disabled} className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><span className="text-base leading-none">+</span> Add</button>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <button key={`${itemLabel(item, index, name)}-${index}`} type="button" onClick={() => onSelect(index)} disabled={disabled} aria-pressed={selectedIndex === index} className={`w-full rounded-xl px-3 py-3 text-left transition disabled:cursor-wait disabled:opacity-60 ${selectedIndex === index ? "bg-white text-emerald-900 shadow-sm ring-1 ring-emerald-200" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}>
            <span className="block text-[11px] font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-0.5 block truncate text-sm font-extrabold">{itemLabel(item, index, name)}</span>
          </button>
        ))}
        {!items.length && <p className="px-3 py-5 text-center text-xs leading-relaxed text-slate-500">No items yet.<br />Press Add to create one.</p>}
      </div>
    </div>
  );
}

function CollectionItemEditor({ name, value, index, onChange }) {
  if (Array.isArray(value)) return <TupleEditor name={name} value={value} onChange={(index, next) => onChange([], value.map((part, partIndex) => partIndex === index ? next : part))} />;
  if (value && typeof value === "object") return <ObjectEditor value={value} contextPath={[name, index]} onChange={onChange} />;
  return <ScalarField name={name} value={value} onChange={(next) => onChange([], next)} />;
}

function CollectionEditor({ name, items, selectedIndex, value, onChange, onSelect, onAdd, onDelete, disabled }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
      <CollectionList name={name} items={items} selectedIndex={selectedIndex} onSelect={onSelect} onAdd={onAdd} disabled={disabled} />
      <div className="min-w-0">
        {value === null || value === undefined ? (
          <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"><div><p className="text-base font-extrabold text-slate-700">Choose an item to edit</p><p className="mt-1 text-sm text-slate-500">Or press Add to create your first item.</p></div></div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-700">Editing item {selectedIndex + 1}</p><h3 className="mt-1 text-xl font-black text-slate-900">{itemLabel(value, selectedIndex, name)}</h3></div>
              <button type="button" onClick={onDelete} disabled={disabled} className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /> Remove item</button>
            </div>
            <CollectionItemEditor name={name} value={value} index={selectedIndex} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminClient() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [savedContent, setSavedContent] = useState(null);
  const [schema, setSchema] = useState(null);
  const [selected, setSelected] = useState("landing");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    requestJson("/api/admin/content")
      .then((payload) => {
        const initialCollection = payload.content.landing;
        setContent(payload.content);
        setSavedContent(cloneValue(payload.content));
        setSchema(payload.schema);
        setDraft(cloneValue(initialCollection));
        setError("");
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const collection = content?.[selected];
  const collectionType = schema?.collections?.[selected] || (Array.isArray(collection) ? "array" : "object");
  const selectedItems = Array.isArray(collection) ? collection : [];

  const confirmDiscard = () => !dirty || window.confirm("You have unsaved changes. Leave them and open another section?");

  const choose = (name) => {
    if (busy) return;
    if (!confirmDiscard()) return;
    const sourceContent = dirty ? savedContent : content;
    if (dirty) setContent(savedContent);
    const nextCollection = sourceContent[name];
    const nextIndex = Array.isArray(nextCollection) ? (nextCollection.length ? 0 : -1) : -1;
    setSelected(name);
    setSelectedIndex(nextIndex);
    setDraft(cloneValue(Array.isArray(nextCollection) ? nextCollection[nextIndex] : nextCollection));
    setDirty(false);
    setNotice("");
    setError("");
  };

  const selectItem = (index) => {
    if (busy) return;
    if (!confirmDiscard()) return;
    const sourceContent = dirty ? savedContent : content;
    if (dirty) setContent(savedContent);
    setSelectedIndex(index);
    setDraft(cloneValue(sourceContent[selected][index]));
    setDirty(false);
    setNotice("");
  };

  const updateDraft = (path, nextValue) => {
    if (busy) return;
    setDraft((current) => setAtPath(current, path, nextValue));
    setDirty(true);
    setNotice("");
    setError("");
  };

  const addItem = () => {
    if (busy || !Array.isArray(collection)) return;
    const template = NEW_ITEMS[selected] === undefined ? makeNewValue(selected, collection) : cloneValue(NEW_ITEMS[selected]);
    const nextItems = [...collection, template];
    setContent((current) => ({ ...current, [selected]: nextItems }));
    setSelectedIndex(nextItems.length - 1);
    setDraft(cloneValue(template));
    setDirty(true);
    setNotice("New item added. Fill in the fields, then save your changes.");
    setError("");
  };

  const deleteItem = () => {
    if (busy || !Array.isArray(collection) || selectedIndex < 0) return;
    const name = itemLabel(collection[selectedIndex], selectedIndex, selected);
    if (!window.confirm(`Remove ${name}? You can still cancel by leaving without saving.`)) return;
    const nextItems = collection.filter((_, index) => index !== selectedIndex);
    const nextIndex = nextItems.length ? Math.min(selectedIndex, nextItems.length - 1) : -1;
    setContent((current) => ({ ...current, [selected]: nextItems }));
    setSelectedIndex(nextIndex);
    setDraft(cloneValue(nextItems[nextIndex]));
    setDirty(true);
    setNotice("Item removed. Press Save changes to publish this removal.");
    setError("");
  };

  const save = async () => {
    if (Array.isArray(collection) && selectedIndex < 0 && collection.length) {
      setError("Add an item before saving this list.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const nextCollection = Array.isArray(collection)
        ? collection.map((item, index) => index === selectedIndex ? cloneValue(draft) : item)
        : cloneValue(draft);
      const payload = await requestJson(`/api/admin/content/${encodeURIComponent(selected)}`, { method: "PUT", body: JSON.stringify({ data: nextCollection }) });
      const nextContent = { ...content, [selected]: payload.data };
      setContent(nextContent);
      setSavedContent(cloneValue(nextContent));
      setDraft(cloneValue(Array.isArray(payload.data) ? payload.data[selectedIndex] : payload.data));
      setDirty(false);
      setNotice("Saved successfully. The public website is now updated.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white"><div className="text-center"><div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-lime" /><p className="font-bold">Opening your website editor…</p></div></main>;
  }

  if (!content) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white"><div role="alert" className="max-w-md rounded-2xl border border-red-300/20 bg-red-400/10 p-6 text-center text-red-100">Unable to open the website editor: {error || "Unknown error"}</div></main>;
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink text-white shadow-lg">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime font-black text-ink">SK</div>
            <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[.18em] text-lime">Website editor</p><h1 className="truncate text-lg font-black">Content Studio</h1></div>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-sm font-bold text-white hover:bg-white/10"><Eye className="h-4 w-4" /> <span className="hidden sm:inline">View website</span><ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1540px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[258px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 px-3 pb-4"><Layers3 className="h-5 w-5 text-emerald-700" /><p className="text-sm font-black text-slate-900">Edit website</p></div>
            {GROUPS.map((group) => (
              <div key={group.label} className="mb-5 last:mb-1">
                <p className="px-3 text-[11px] font-black uppercase tracking-[.14em] text-slate-400">{group.label}</p>
                <p className="px-3 pb-2 pt-1 text-[11px] leading-relaxed text-slate-400">{group.help}</p>
                <nav className="space-y-0.5" aria-label={group.label}>
                  {group.items.map((name) => <button key={name} type="button" onClick={() => choose(name)} disabled={busy} aria-current={selected === name ? "page" : undefined} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition disabled:cursor-wait disabled:opacity-60 ${selected === name ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>{LABELS[name]}</button>)}
                </nav>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3"><Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><p className="text-xs leading-relaxed text-slate-500"><b className="text-slate-700">Safe publishing</b><br />Your changes are checked before they are saved. Keep the <code className="rounded bg-slate-100 px-1">storage/</code> folder on persistent hosting.</p></div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-6 rounded-3xl bg-ink p-5 text-white shadow-lg sm:p-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div><p className="text-xs font-black uppercase tracking-[.18em] text-lime">Welcome to your website</p><h2 className="mt-2 max-w-2xl text-2xl font-black tracking-tight sm:text-3xl">Change your content without touching code.</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">Use simple boxes to update your words, pictures, services and customer information. Nothing goes live until you press Save changes.</p></div>
              <div className="grid shrink-0 grid-cols-3 gap-2 text-center text-xs"><div className="rounded-xl bg-white/10 px-3 py-3"><p className="text-xl font-black text-lime">1</p><p className="mt-1 text-white/70">Choose</p></div><div className="rounded-xl bg-white/10 px-3 py-3"><p className="text-xl font-black text-lime">2</p><p className="mt-1 text-white/70">Edit</p></div><div className="rounded-xl bg-white/10 px-3 py-3"><p className="text-xl font-black text-lime">3</p><p className="mt-1 text-white/70">Save</p></div></div>
            </div>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sections</p><p className="mt-1 text-2xl font-black">{schema?.collections ? Object.keys(schema.collections).length : 0}</p><p className="mt-1 text-xs text-slate-500">Parts of your website</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">You are editing</p><p className="mt-1 truncate text-lg font-black">{LABELS[selected] || selected}</p><p className="mt-1 text-xs text-slate-500">{prettyType(collectionType)}</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Website status</p><p className="mt-1 text-lg font-black text-emerald-900">{dirty ? "Unsaved changes" : "Ready to edit"}</p><p className="mt-1 text-xs text-emerald-800">{dirty ? "Save when you are ready" : "Your saved content is live"}</p></div>
          </div>

          <div className="mb-5"><HelpPanel /></div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <PageIntro name={selected} type={collectionType} onViewSite={() => window.open("/", "_blank", "noopener,noreferrer")} />
            {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</div>}
            {notice && <div role="status" className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> <span>{notice}</span></div>}

            {collectionType === "array" ? (
              <CollectionEditor name={selected} items={selectedItems} selectedIndex={selectedIndex} value={draft} onChange={updateDraft} onSelect={selectItem} onAdd={addItem} onDelete={deleteItem} disabled={busy} />
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white"><div className="border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5"><p className="text-sm font-extrabold text-slate-800">Fill in the details below</p><p className="mt-1 text-xs text-slate-500">You can open and close each group of fields to keep the page tidy.</p></div><div className="p-4 sm:p-5"><ObjectEditor value={draft} contextPath={[selected]} onChange={updateDraft} /></div></div>
            )}

            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div><p className="text-sm font-extrabold text-slate-800">Ready to publish?</p><p className="mt-1 text-xs text-slate-500">Save your changes when everything looks right. You can then open the website to check it.</p></div>
              <button type="button" onClick={save} disabled={busy || (collectionType === "array" && selectedIndex < 0 && selectedItems.length > 0)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><Save className="h-4 w-4" /> {busy ? "Saving…" : "Save changes"}</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
