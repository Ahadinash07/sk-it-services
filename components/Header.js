"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon, { WhatsAppIcon } from "./Icon";
import A from "./A";
import { waLink, telLinkFor } from "@/lib/whatsapp";
import { useQuote } from "./QuoteProvider";

// page sections in document order -> which menu tab they belong to
const SPY = [["home", "#home"], ["services", "#services"], ["business-it", "#business-it"], ["products", "#products"], ["custom-pc", "#products"], ["why", "#why"], ["how", "#why"], ["reviews", "#why"], ["faq", "#contact"], ["contact", "#contact"]];

export function Logo({ className = "h-10", src = "/logo.png", alt = "SK IT Services" }) {
  return (
    <A href="#home" aria-label={`${alt} – home`} className="inline-flex items-center rounded-xl bg-white px-2 py-1 shadow-sm">
      <Image src={src} alt={alt} width={600} height={435} priority className={`${className} w-auto`} />
    </A>
  );
}

export default function Header({ content }) {
  const nav = content.navigation;
  const business = content.business;
  const labels = content.landing.header;
  const tel = telLinkFor(business);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const lock = useRef(false);
  const timer = useRef(null);
  const { open } = useQuote();

  useEffect(() => {
    if (window.location.pathname !== "/") return; // no active tab on other pages
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (lock.current) return;
      let cur = SPY[0][1];
      for (const [id, nav] of SPY) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = nav;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const pick = (href) => {
    setMenu(false);
    if (window.location.pathname !== "/") return;
    setActive(href);              // underline moves immediately on click
    lock.current = true;          // ignore scroll-spy while the smooth scroll runs
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { lock.current = false; window.dispatchEvent(new Event("scroll")); }, 900);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 max-w-[100vw] overflow-x-hidden border-b border-white/5 bg-ink/95 pt-[env(safe-area-inset-top)] text-white backdrop-blur">
        <div className="wrap flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
           <Logo className="h-9 lg:h-11" src={labels.logo} alt={labels.logoAlt} />
           <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Main">
             {nav.map((n) => {
              const on = active === n.href;
              return (
                <A key={n.href} href={n.href} onClick={() => pick(n.href)} aria-current={on ? "true" : undefined}
                  className={`relative py-2 text-[13px] font-semibold transition-colors duration-300 hover:text-lime xl:text-sm after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded after:bg-lime after:transition-transform after:duration-300 after:ease-out ${on ? "text-white after:scale-x-100" : "text-white/80 after:scale-x-0 hover:after:scale-x-50"}`}>
                  {n.label}
                </A>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden h-6 w-px bg-white/15 lg:block" />
             <A href={waLink(undefined, business)} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 text-sm font-semibold hover:text-lime lg:flex"><WhatsAppIcon className="h-5 w-5 text-lime" />{business.phoneDisplay}</A>
             <A href={tel} className="btn btn-ghost hidden !py-2.5 lg:inline-flex"><Icon name="phone" className="h-4 w-4" />{labels.callLabel}</A>
             <button onClick={open} className="btn btn-lime hidden !py-2.5 lg:inline-flex">{labels.quoteLabel}</button>
             <A href={tel} aria-label={labels.mobileCallLabel} className="p-1.5 text-lime lg:hidden"><Icon name="phone" className="h-6 w-6" /></A>
             <A href={waLink(undefined, business)} target="_blank" rel="noopener noreferrer" aria-label={labels.mobileWhatsAppLabel} className="p-1.5 text-lime lg:hidden"><WhatsAppIcon className="h-6 w-6" /></A>
             <button aria-label={menu ? labels.mobileCloseLabel : labels.mobileMenuLabel} aria-expanded={menu} onClick={() => setMenu(!menu)} className="p-1.5 lg:hidden"><Icon name={menu ? "x" : "menu"} className="h-6 w-6" /></button>
          </div>
        </div>
        {menu && (
          <div className="border-t border-white/10 bg-ink lg:hidden">
            <nav className="wrap flex flex-col py-3" aria-label="Mobile">
               {nav.map((n) => (
                <A key={n.href} href={n.href} onClick={() => pick(n.href)} className={`border-b border-white/5 py-3.5 text-base font-semibold ${active === n.href ? "text-lime" : "text-white/90"}`}>{n.label}</A>
              ))}
               <A href={labels.mobileFaqHref} onClick={() => pick(labels.mobileFaqHref)} className="py-3.5 text-base font-semibold text-white/90">{labels.mobileFaqLabel}</A>
               <button onClick={() => { setMenu(false); open(); }} className="btn btn-lime mt-2 w-full">{labels.quoteLabel}</button>
            </nav>
          </div>
        )}
      </header>
      <div aria-hidden="true" className="h-[calc(68px+env(safe-area-inset-top))] lg:h-[calc(76px+env(safe-area-inset-top))]" />
    </>
  );
}
