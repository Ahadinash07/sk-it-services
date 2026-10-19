"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon, { WhatsAppIcon } from "./Icon";
import A from "./A";
import { waLink, telLinkFor } from "@/lib/whatsapp";
import { useQuote } from "./QuoteProvider";

// Page sections in document order -> which menu tab they belong to
const SPY = [
  ["home", "#home"],
  ["services", "#services"],
  ["business-it", "#business-it"],
  ["products", "#products"],
  ["custom-pc", "#products"],
  ["why", "#why"],
  ["how", "#why"],
  ["reviews", "#why"],
  ["faq", "#contact"],
  ["contact", "#contact"],
];

export function Logo({ className = "h-9 lg:h-11", src = "/logo.png", alt = "SK IT Services" }) {
  return (
    <A href="#home" aria-label={`${alt} – home`} className="inline-flex items-center transition hover:opacity-90">
      <Image
        src={src}
        alt={alt}
        width={300}
        height={100}
        priority
        className={`${className} w-auto object-contain drop-shadow-[0_0_12px_rgba(34,197,94,0.25)]`}
      />
    </A>
  );
}

export default function Header({ content }) {
  const nav = content?.navigation || [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Repair Services", href: "#services" },
    { label: "Business IT", href: "#business-it" },
    { label: "About Us", href: "#why" },
    { label: "Contact", href: "#contact" },
  ];
  const business = content?.business || {};
  const tel = telLinkFor(business);

  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const lock = useRef(false);
  const timer = useRef(null);
  const { open } = useQuote();

  useEffect(() => {
    if (window.location.pathname !== "/") return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (lock.current) return;
      let cur = SPY[0][1];
      for (const [id, targetNav] of SPY) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = targetNav;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e) => {
        if (e.key === "Escape") setMenu(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menu]);

  const pick = (href) => {
    setMenu(false);
    if (window.location.pathname !== "/") return;
    setActive(href);
    lock.current = true;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      lock.current = false;
      window.dispatchEvent(new Event("scroll"));
    }, 900);
  };

  return (
    <>
      {/* Full-Width Sticky/Fixed Header at Top */}
      <header className="fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] overflow-x-hidden border-b border-[#22c55e]/25 bg-gradient-to-r from-[#041408]/95 via-[#08200f]/95 to-[#041408]/95 border border-[#22c55e]/30 pt-[env(safe-area-inset-top)] text-white backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(34,197,94,0.12)]">
        <div className="wrap flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
          {/* Left: Brand Logo (Transparent, No white box) */}
          <div className="flex items-center">
            <Logo className="h-9 lg:h-11" src="/logo.png" alt="SK IT Services" />
          </div>

          {/* Right: Actions (WhatsApp, Phone, Get a Quote, Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Circle Button */}
            <A
              href={waLink(undefined, business)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group grid h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 place-items-center rounded-full border border-[#22c55e]/50 bg-[#082210]/90 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#22c55e] hover:shadow-[0_0_12px_rgba(34,197,94,0.4)]"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 fill-white transition-transform group-hover:scale-110" />
            </A>

            {/* Phone Call Circle Button */}
            <A
              href={tel}
              aria-label="Call SK IT Services"
              className="group grid h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 place-items-center rounded-full border border-[#22c55e]/50 bg-[#082210]/90 text-[#22c55e] shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#22c55e] hover:shadow-[0_0_12px_rgba(34,197,94,0.4)]"
            >
              <Icon name="phone" className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2] transition-transform group-hover:scale-110" />
            </A>

            {/* "Get a Quote" Lime Pill Button with Chat Icon */}
            <button
              type="button"
              onClick={open}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#b5f23d] hover:bg-[#a4e628] text-[#0e1b17] font-extrabold px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm shadow-[0_0_16px_rgba(181,242,61,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Icon name="chatDots" className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.4] text-[#0e1b17]" />
              <span className="whitespace-nowrap font-bold">Get a Quote</span>
            </button>

            {/* Hamburger Menu Circle Button */}
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open navigation menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
              className="group grid h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 place-items-center rounded-full border border-[#22c55e]/50 bg-[#082210]/90 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#22c55e] hover:shadow-[0_0_12px_rgba(34,197,94,0.4)]"
            >
              {menu ? (
                <Icon name="x" className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] text-white" />
              ) : (
                <Icon name="menu" className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer Modal */}
      {menu && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMenu(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-10 flex h-full w-full max-w-sm flex-col justify-between border-l border-white/10 bg-[#091a10] p-6 text-white shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <Logo className="h-8" src="/logo.png" alt="SK IT Services" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenu(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:border-[#22c55e] hover:text-[#22c55e] transition"
                >
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1" aria-label="Main Navigation">
                {nav.map((n) => {
                  const on = active === n.href;
                  return (
                    <A
                      key={n.href}
                      href={n.href}
                      onClick={() => pick(n.href)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${on
                          ? "bg-white/10 text-lime"
                          : "text-white/85 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <span>{n.label}</span>
                      <Icon name="right" className={`h-4 w-4 ${on ? "text-lime" : "text-white/40"}`} />
                    </A>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  open();
                }}
                className="btn btn-lime w-full !py-3.5 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Icon name="chatDots" className="h-4 w-4 stroke-[2.2]" />
                <span>Get a Free Quote</span>
              </button>

              <div className="flex items-center gap-3">
                <A
                  href={waLink(undefined, business)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-white/90 hover:border-[#22c55e] hover:text-[#22c55e] transition"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current" />
                  <span>WhatsApp</span>
                </A>
                <A
                  href={tel}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-white/90 hover:border-[#22c55e] hover:text-[#22c55e] transition"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  <span>Call Store</span>
                </A>
              </div>

              <p className="text-[11px] text-center text-white/50 leading-tight">
                Plaza Imbi, Kuala Lumpur • Mon–Sat 10AM–7PM
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Spacer: matches old sticky header height */}
      <div aria-hidden="true" className="h-[calc(68px+env(safe-area-inset-top))] lg:h-[calc(76px+env(safe-area-inset-top))]" />
    </>
  );
}
