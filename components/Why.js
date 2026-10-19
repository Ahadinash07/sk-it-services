import Icon from "./Icon";
import Photo from "./Photo";

export default function Why({ content }) {
  const section = content.landing.why;
  return (
    <section id="why" className="bg-mist py-14 sm:py-20">
      <div className="wrap">
        {/* mobile - image after heading */}
        <div className="sm:hidden">
           <p className="eyebrow">{section.eyebrow}</p>
           <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
           <div className="overflow-hidden rounded-2xl mt-8"><Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 50vw, 100vw" className="h-[220px] w-full" /></div>
          <div className="mt-8 max-w-[560px]">
             <p className="text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
          </div>
        </div>
        {/* tablet and desktop - original layout */}
        <div className="hidden sm:block">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
               <p className="eyebrow">{section.eyebrow}</p>
               <h2 className="h-section mt-4">{section.title}<br /><span className="text-leaf">{section.titleAccent}</span></h2>
               <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-ink/75 sm:text-base">{section.description}</p>
            </div>
             <div className="overflow-hidden rounded-2xl"><Photo src={section.image} alt={section.imageAlt} sizes="(min-width:1024px) 50vw, 100vw" className="h-[220px] w-full sm:h-[300px] lg:h-[260px]" /></div>
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
           {content.why.map((w) => (
            <article key={w.title} className="card flex items-start justify-between gap-3 p-4 sm:flex-col sm:items-stretch sm:p-5">
              <div className="flex flex-1 items-start gap-3">
                <span className="bubble h-11 w-11 sm:h-12 sm:w-12"><Icon name={w.icon} className="h-5 w-5 sm:h-6 sm:w-6" /></span>
                <div><h3 className="text-base font-extrabold sm:text-lg">{w.title}</h3><p className="mt-1 text-xs leading-relaxed text-ink/70 sm:text-sm">{w.text}</p></div>
              </div>
              <Photo src={w.img} alt={w.title} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100px" className="h-20 w-24 shrink-0 rounded-xl sm:h-40 sm:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
