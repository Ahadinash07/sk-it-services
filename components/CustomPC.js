import Icon from "./Icon";
import A from "./A";
import Photo from "./Photo";
import { waLink } from "@/lib/whatsapp";

export default function CustomPC({ content }) {
  const section = content.landing.customPc;
  const pc = content.customPc;
  const business = content.business;
  return (
    <section id="custom-pc" className="dark-sec relative overflow-hidden bg-ink text-white">
      <div className="wrap relative py-14 sm:py-20">
        {/* mobile - image after heading */}
        <div className="sm:hidden">
          <div className="relative z-10 max-w-[560px]">
             <p className="eyebrow">{section.eyebrow}</p>
             <h2 className="h-display mt-5">{section.title}<br /><span className="text-lime">{section.titleAccent}</span></h2>
          </div>
          <div className="relative mt-8">
             <div className="overflow-hidden rounded-2xl ring-1 ring-white/10"><Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 50vw, 100vw" className="h-[240px] w-full" /></div>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
               {pc.points.map((t) => <li key={t} className="flex items-center gap-2.5"><Icon name="checkc" className="h-[18px] w-[18px] shrink-0 text-lime" />{t}</li>)}
            </ul>
          </div>
          <div className="relative z-10 max-w-[560px] mt-8">
             <p className="max-w-[500px] text-[15px] leading-relaxed text-white/80">{section.description}</p>
            <ul className="mt-7 grid grid-cols-2 gap-4">
               {pc.types.map(([ic, t]) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.06] text-lime"><Icon name={ic} className="h-5 w-5" /></span>
                  <span className="text-xs font-semibold leading-tight text-white/85">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
               <A href={waLink(section.buildMessage, business)} target="_blank" rel="noopener noreferrer" className="btn btn-lime px-6 py-3.5">{section.primaryCta} <Icon name="arrow" className="h-4 w-4" /></A>
               <A href={waLink(section.consultationMessage, business)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-6 py-3.5">{section.secondaryCta}</A>
            </div>
          </div>
        </div>
        {/* tablet and desktop - original layout */}
        <div className="hidden sm:block">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 max-w-[560px]">
               <p className="eyebrow">{section.eyebrow}</p>
               <h2 className="h-display mt-5">{section.title}<br /><span className="text-lime">{section.titleAccent}</span></h2>
               <p className="mt-5 max-w-[500px] text-[15px] leading-relaxed text-white/80 sm:text-lg">{section.description}</p>
              <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                 {pc.types.map(([ic, t]) => (
                  <li key={t} className="flex items-center gap-3 sm:flex-col sm:text-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.06] text-lime"><Icon name={ic} className="h-5 w-5" /></span>
                    <span className="text-xs font-semibold leading-tight text-white/85 sm:text-[13px]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <A href={waLink(section.buildMessage, business)} target="_blank" rel="noopener noreferrer" className="btn btn-lime px-6 py-3.5">{section.primaryCta} <Icon name="arrow" className="h-4 w-4" /></A>
                  <A href={waLink(section.consultationMessage, business)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-6 py-3.5">{section.secondaryCta}</A>
              </div>
            </div>
            <div className="relative">
               <div className="overflow-hidden rounded-2xl ring-1 ring-white/10"><Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 50vw, 100vw" className="h-[240px] w-full sm:h-[340px] lg:h-[430px]" /></div>
              <ul className="mt-4 space-y-2 text-sm text-white/90 lg:absolute lg:bottom-5 lg:right-5 lg:mt-0 lg:rounded-xl lg:bg-ink/70 lg:p-4 lg:backdrop-blur">
                 {pc.points.map((t) => <li key={t} className="flex items-center gap-2.5"><Icon name="checkc" className="h-[18px] w-[18px] shrink-0 text-lime" />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14">
           <p className="eyebrow !text-lime">{section.processEyebrow}</p>
           <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{section.processTitle}</h3>
          <ol className="mt-6 grid gap-3 overflow-hidden sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
             {pc.steps.map(([ic, t, d], i) => (
              <li key={t} className="relative lg:pr-5">
                <div className="dark-card h-full p-5">
                  <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-lime/10 text-lime"><Icon name={ic} className="h-5 w-5" /></span></div>
                  <h4 className="mt-4 text-base font-bold">{t}</h4><p className="mt-1 text-sm text-white/65">{d}</p>
                </div>
                {i < 3 && <Icon name="right" className="absolute right-0 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/60 lg:block" />}
              </li>
            ))}
          </ol>
          <div className="dark-card mt-4 flex flex-col items-start gap-4 p-5 lg:flex-row lg:items-center lg:gap-8">
             <p className="text-sm text-white/85 lg:max-w-[330px] lg:text-base">{section.closingText}</p>
            <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3 text-lg font-extrabold tracking-tight text-white/70 lg:justify-between lg:border-l lg:border-white/10 lg:pl-8">
               {pc.brands.map((b) => <li key={b} className={b === "intel" ? "lowercase italic" : ""}>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
