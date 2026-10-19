"use client";
import { useState } from "react";
import Icon from "./Icon";
import Photo from "./Photo";

export default function FAQ({ content }) {
  const section = content.landing.faq;
  const groups = content.faq;
  const [g, setG] = useState(0);
  const [open, setOpen] = useState(0);
  const group = groups[g] || { qa: [] };
  return (
    <section id="faq" className="bg-mist py-14 sm:py-20">
      <div className="wrap">
        <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
             <p className="eyebrow">{section.eyebrow}</p>
             <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
             <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
             <Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 45vw, 100vw" className="h-[240px] w-full sm:h-[320px] lg:h-[230px]" />
             <p className="absolute right-4 top-4 -rotate-6 whitespace-pre-line text-right font-hand text-2xl leading-[1.05] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.8)] sm:text-3xl">{section.note}</p>
          </div>
        </div>
        <div className="mt-9 grid gap-4 lg:grid-cols-[320px_1fr]">
          <div role="tablist" aria-label="FAQ categories" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
             {groups.map((f, i) => (
              <button key={f.id} role="tab" aria-selected={g === i} onClick={() => { setG(i); setOpen(0); }} className={`flex items-center gap-3 rounded-2xl p-3.5 text-left transition ${g === i ? "bg-lime" : "bg-white shadow-card hover:bg-white/70"}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${g === i ? "bg-ink text-lime" : "bg-mint text-leaf-dark"}`}><Icon name={f.icon} className="h-5 w-5" /></span>
                <span className="flex-1"><span className="block text-sm font-extrabold">{f.label}</span><span className="block text-xs text-ink/65">{f.sub}</span></span>
                <Icon name="right" className="h-4 w-4 text-ink/60 lg:hidden" />
              </button>
            ))}
          </div>
          <div role="tabpanel" className="card divide-y divide-ink/10 overflow-hidden">
            {group.qa.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center gap-3 p-4 text-left sm:p-5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-xs font-extrabold">Q</span>
                    <span className="flex-1 text-sm font-bold sm:text-base">{q}</span>
                    <Icon name={isOpen ? "minus" : "plusS"} className="h-5 w-5 shrink-0" />
                  </button>
                  {isOpen && <p className="px-4 pb-5 pl-14 text-sm leading-relaxed text-ink/75 sm:px-5 sm:pl-[3.75rem]">{a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
