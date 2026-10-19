import Icon from "./Icon";
import A from "./A";
import Photo from "./Photo";
import { waLink } from "@/lib/whatsapp";

export default function Products({ content }) {
  const section = content.landing.products;
  const business = content.business;
  const productTrust = content.productTrust || section.trust;
  return (
    <section id="products" className="bg-white py-14 sm:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
             <p className="eyebrow">{section.eyebrow}</p>
             <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
             <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
          </div>
          <ul className="grid grid-cols-3 gap-2 lg:border-l lg:border-ink/10 lg:pl-8">
             {productTrust.map(([ic, t]) => (
              <li key={t} className="flex flex-col items-center gap-2 text-center text-xs font-semibold sm:px-3 sm:text-sm">
                <span className="bubble h-12 w-12 sm:h-14 sm:w-14"><Icon name={ic} className="h-6 w-6" /></span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
           {content.products.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5">
              <Photo src={p.img} alt={p.title} sizes="(min-width:1280px) 25vw, 50vw" className="h-40 w-full" />
              <div className="relative flex flex-1 flex-col p-5 pt-8">
                <span className="bubble absolute -top-6 left-5 h-12 w-12 border-4 border-white"><Icon name={p.icon} className="h-5 w-5" /></span>
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.text}</p>
                <ul className="mb-6 mt-4 flex-1 space-y-2 text-sm">
                  {p.items.map((t) => <li key={t} className="flex items-center gap-2.5 text-ink/85"><Icon name="checkc" className="h-[18px] w-[18px] shrink-0 text-leaf" />{t}</li>)}
                </ul>
             <A href={waLink(`Hello SK IT Services! I'm interested in ${p.item}. Could you share the available options and pricing?`, business)} target="_blank" rel="noopener noreferrer" className="btn btn-lime w-full">{p.cta} <Icon name="arrow" className="h-4 w-4" /></A>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 space-y-3 md:hidden">
             {content.products.map((p) => (
             <A key={p.id} href={waLink(`Hello SK IT Services! I'm interested in ${p.item}.`, business)} target="_blank" rel="noopener noreferrer" className="card flex items-stretch gap-3 overflow-hidden p-2">
              <Photo src={p.img} alt={p.title} sizes="100px" className="min-h-[104px] w-[92px] shrink-0 rounded-xl" />
              <span className="flex flex-1 items-center gap-2 py-1">
                <span className="flex-1"><span className="bubble mb-1 h-7 w-7"><Icon name={p.icon} className="h-3.5 w-3.5" /></span><span className="block text-base font-extrabold">{p.title}</span><span className="block text-xs leading-snug text-ink/70">{p.short}</span></span>
                <Icon name="right" className="h-4 w-4 text-ink/60" />
              </span>
            </A>
          ))}
        </div>

        <div className="relative mt-6 flex flex-col items-start gap-4 overflow-hidden rounded-2xl bg-mist p-5 sm:flex-row sm:items-center sm:p-6">
           <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-lime"><Icon name="tag" className="h-6 w-6" /></span>
           <div className="flex-1"><h3 className="text-lg font-extrabold">{section.sourcingTitle}</h3><p className="text-sm text-ink/70">{section.sourcingText}</p></div>
          <A href="#contact" className="btn btn-dark shrink-0">Contact Us <Icon name="arrow" className="h-4 w-4" /></A>
        </div>
      </div>
    </section>
  );
}
