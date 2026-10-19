import Icon from "./Icon";
import Photo from "./Photo";

export default function HowWeWork({ content }) {
  const section = content.landing.process;
  return (
    <section id="how" className="bg-white py-14 sm:py-20">
      <div className="wrap">
        {/* mobile - image after heading */}
        <div className="sm:hidden">
           <p className="eyebrow">{section.eyebrow}</p>
           <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
          <div className="relative overflow-hidden rounded-2xl mt-8">
             <Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 45vw, 100vw" className="h-[240px] w-full" />
             <p className="absolute left-4 top-4 -rotate-6 whitespace-pre-line font-hand text-2xl leading-[1.05] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.8)]">{section.note}</p>
          </div>
          <div className="mt-8 max-w-[600px]">
             <p className="text-[15px] leading-relaxed text-ink/75">{section.description}</p>
          </div>
        </div>
        {/* tablet and desktop - original layout */}
        <div className="hidden sm:block">
          <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
               <p className="eyebrow">{section.eyebrow}</p>
               <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
               <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
               <Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 45vw, 100vw" className="h-[240px] w-full sm:h-[320px] lg:h-[260px]" />
               <p className="absolute left-4 top-4 -rotate-6 whitespace-pre-line font-hand text-2xl leading-[1.05] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.8)] sm:text-3xl">{section.note}</p>
            </div>
          </div>
        </div>
        <ol className="mt-10 grid gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
           {content.process.map((p, i) => (
            <li key={p.title} className="relative lg:px-2.5 first:lg:pl-0 last:lg:pr-0">
              <article className="card h-full overflow-hidden">
                <div className="relative">
                  <Photo src={p.img} alt={p.title} sizes="(min-width:1024px) 25vw, 50vw" className="h-40 w-full" />
                  <span className="bubble absolute -bottom-5 left-4 h-11 w-11 border-4 border-white"><Icon name={p.icon} className="h-5 w-5" /></span>
                </div>
                <div className="p-5 pt-8"><h3 className="text-lg font-extrabold">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/70">{p.text}</p></div>
              </article>
              {i < 3 && <span className="absolute -right-1.5 top-[72px] z-10 hidden h-5 w-5 place-items-center rounded-full bg-leaf text-white lg:grid"><Icon name="right" className="h-3 w-3" /></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
