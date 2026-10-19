"use client";
import { useRef, useState } from "react";
import Icon from "./Icon";
import Photo from "./Photo";

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-6 w-6" aria-label="Google"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" /><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" /></svg>
);

export default function Reviews({ content }) {
  const section = content.landing.reviews;
  const stats = content.stats;
  const reviews = content.reviews;
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const go = (dir) => ref.current?.scrollBy({ left: dir * (ref.current.firstChild?.offsetWidth + 16 || 300), behavior: "smooth" });
  const onScroll = (e) => { const el = e.currentTarget; const w = (el.firstChild?.offsetWidth || 1) + 16; setIdx(Math.min(reviews.length - 1, Math.round(el.scrollLeft / w))); };

  return (
    <section id="reviews" className="dark-sec relative overflow-hidden bg-ink py-14 text-white sm:py-20">
      <div className="wrap">
        <div className="relative">
           <p className="eyebrow">{section.eyebrow}</p>
           <h2 className="h-section mt-4">{section.title}<br /><span className="text-lime">{section.titleAccent}</span></h2>
           <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-white/75 sm:text-base">{section.description}</p>
           <p className="absolute right-0 top-2 hidden -rotate-6 whitespace-pre-line font-hand text-4xl leading-tight text-white/90 lg:block">{section.note}</p>
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
           {stats.map((s) => (
            <li key={s.label} className="dark-card flex items-center gap-3 p-3.5 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime/10 text-lime sm:h-12 sm:w-12"><Icon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" /></span>
              <span><span className="block text-xl font-extrabold sm:text-2xl">{s.big}<span className="text-sm font-semibold text-white/70">{s.small}</span></span><span className="block text-[11px] leading-tight text-white/65 sm:text-xs">{s.label}</span></span>
            </li>
          ))}
        </ul>

        <div className="relative mt-8 overflow-hidden">
          <button onClick={() => go(-1)} aria-label="Previous review" className="absolute -left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink text-lime ring-2 ring-lime sm:grid lg:-left-4"><Icon name="left" className="h-4 w-4" /></button>
          <div ref={ref} onScroll={onScroll} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
             {reviews.map((r) => (
              <figure key={r.name} className="flex min-w-[88%] snap-start flex-col rounded-2xl bg-white p-5 text-ink shadow-card sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-11px)] xl:min-w-[calc(25%-12px)]">
                <div className="flex gap-0.5 text-[#f5b301]" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-[18px] w-[18px] fill-current" />)}</div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <GoogleG />
                  <span><span className="block text-sm font-bold">{r.name}</span><span className="block text-xs text-ink/55">{r.when}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink text-lime ring-2 ring-lime sm:grid lg:-right-4"><Icon name="right" className="h-4 w-4" /></button>
        </div>
         <div className="mt-4 flex justify-center gap-2 sm:hidden" aria-hidden="true">{reviews.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-lime" : "bg-white/25"}`} />)}</div>

        <div className="dark-card relative mt-8 flex items-center gap-4 overflow-hidden p-5">
           <Photo src={section.image || "/images/why-hero.jpg"} alt="" className="absolute inset-0 -z-0 opacity-25" />
          <div className="absolute inset-0 bg-ink/70" />
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-lime/40 text-lime"><Icon name="chat" className="h-6 w-6" /></span>
           <div className="relative"><h3 className="text-base font-extrabold sm:text-lg">{section.joinTitle}</h3><p className="text-sm text-white/70">{section.joinText}</p></div>
        </div>
      </div>
    </section>
  );
}
