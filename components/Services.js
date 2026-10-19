"use client";
import Icon from "./Icon";
import A from "./A";
import Photo from "./Photo";
import { waLink } from "@/lib/whatsapp";
import { useQuote } from "./QuoteProvider";

export default function Services({ content }) {
  const { open } = useQuote();
  const section = content.landing.services;
  const business = content.business;
  const trustStrip = content.trustStrip || section.trust;
  return (
    <section id="services" className="bg-mist py-14 sm:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
             <p className="eyebrow">{section.eyebrow}</p>
             <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
             <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
          </div>
          <ul className="grid grid-cols-3 gap-2 lg:border-l lg:border-ink/10 lg:pl-8">
             {trustStrip.map(([ic, t]) => (
              <li key={t} className="flex flex-col items-center gap-2 text-center text-xs font-semibold sm:px-3 sm:text-sm">
                <span className="bubble h-12 w-12 sm:h-14 sm:w-14"><Icon name={ic} className="h-6 w-6" /></span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
           {content.services.map((s) => {
            const body = (
              <>
                <span>{s.cta}</span><Icon name="arrowUp" className="h-4 w-4" />
              </>
            );
            const cls = "mt-auto flex w-full items-center justify-between border-t border-ink/10 pt-4 text-sm font-bold text-leaf-dark hover:text-leaf";
            return (
              <article key={s.id} id={s.id === "business-it" ? "business-it" : undefined} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
                <Photo src={s.img} alt={s.title} className="h-44 w-full sm:h-48" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[.1em] text-leaf">{s.kicker}</p>
                  <h3 className="mt-1.5 text-xl font-extrabold leading-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{s.text}</p>
                  <ul className="mb-5 mt-4 space-y-2 text-sm">
                    {s.items.map((t) => <li key={t} className="flex items-start gap-2.5 text-ink/85"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />{t}</li>)}
                  </ul>
                  {s.id === "repair"
                    ? <button onClick={open} className={cls}>{body}</button>
                     : <A href={waLink(`Hello SK IT Services! ${s.msg}`, business)} target="_blank" rel="noopener noreferrer" className={cls}>{body}</A>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
