import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Icon, { WhatsAppIcon } from "./Icon";
import A from "./A";
import { waLink, telLinkFor } from "@/lib/whatsapp";

function TikTokIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.34a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.6a6.34 6.34 0 0 0 10.75 4.54 6.3 6.3 0 0 0 1.94-4.52V8.92a8.2 8.2 0 0 0 4.81 1.55v-3.5a4.86 4.86 0 0 1-1.05-.28z" />
    </svg>
  );
}

export default function Footer({ content }) {
  const business = content?.business || {};
  const tel = telLinkFor(business);

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Repair Services", href: "#services" },
    { label: "Custom PC Builds", href: "#custom-pc" },
    { label: "Business IT", href: "#business-it" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#why" },
    { label: "Contact Us", href: "#contact" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: business?.social?.facebookUrl || "https://facebook.com" },
    { icon: Instagram, label: "Instagram", href: business?.social?.instagramUrl || "https://instagram.com" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
    { icon: TikTokIcon, label: "TikTok", href: business?.social?.tiktokUrl || "https://tiktok.com" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#031508] via-[#061d0d] to-[#031508] text-white border-t border-[#22c55e]/20">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#16a34a]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#22c55e]/15 blur-3xl" />

      <div className="wrap relative z-10 py-12 sm:py-16">
        {/* 4 Main Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.8fr_1.5fr] lg:gap-0 items-start">
          {/* Column 1: Brand Info */}
          <div className="lg:pr-8 xl:pr-10">
            <A href="#home" aria-label="SK IT Services – Home" className="inline-block transition hover:opacity-90">
              <Image
                src="/logo.png"
                alt="SK IT Services"
                width={600}
                height={435}
                priority
                className="h-16 sm:h-20 lg:h-[84px] w-auto object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              />
            </A>

            <h3 className="mt-4 text-base sm:text-lg font-black leading-snug text-white">
              Connected by Technology.<br />
              <span className="text-lime font-bold">Powered by Trust.</span>
            </h3>

            <p className="mt-3 max-w-[310px] text-xs sm:text-[13px] leading-relaxed text-white/70">
              Your trusted computer shop for laptop and desktop sales, repairs, upgrades, accessories and business IT support.
            </p>

            {/* Social Icons Row */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((s) => {
                const IconComponent = s.icon;
                return (
                  <A
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 text-white/90 shadow-sm transition-all duration-200 hover:scale-105 hover:border-lime hover:bg-white/10 hover:text-lime"
                  >
                    <IconComponent className="h-4 w-4" />
                  </A>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:border-l lg:border-white/10 lg:px-8 xl:px-10">
            <h4 className="text-base sm:text-lg font-extrabold text-lime mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <A
                    href={item.href}
                    className="group flex items-center justify-between py-2 text-xs sm:text-sm text-white/80 transition-colors hover:text-lime"
                  >
                    <span>{item.label}</span>
                    <Icon
                      name="right"
                      className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-lime"
                    />
                  </A>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:border-l lg:border-white/10 lg:px-8 xl:px-10">
            <h4 className="text-base sm:text-lg font-extrabold text-lime mb-4">
              Company
            </h4>
            <ul className="space-y-1">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <A
                    href={item.href}
                    className="group flex items-center justify-between py-2 text-xs sm:text-sm text-white/80 transition-colors hover:text-lime"
                  >
                    <span>{item.label}</span>
                    <Icon
                      name="right"
                      className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-lime"
                    />
                  </A>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="lg:border-l lg:border-white/10 lg:pl-8 xl:pl-10">
            <h4 className="text-base sm:text-lg font-extrabold text-lime mb-4">
              Contact Details
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {/* WhatsApp */}
              <li>
                <A
                  href={waLink(undefined, business)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 transition hover:opacity-90"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime/60 bg-[#061d0d]/80 text-lime shadow-[0_0_10px_rgba(181,242,61,0.2)] transition-transform group-hover:scale-105">
                    <WhatsAppIcon className="h-4.5 w-4.5 fill-current" />
                  </span>
                  <div>
                    <span className="block text-[11px] text-white/60 font-medium leading-tight">
                      WhatsApp
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-lime transition leading-tight mt-0.5">
                      011-5757 9655
                    </span>
                  </div>
                </A>
              </li>

              {/* Phone Call */}
              <li>
                <A
                  href={tel}
                  className="group flex items-center gap-3 transition hover:opacity-90"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime/60 bg-[#061d0d]/80 text-lime shadow-[0_0_10px_rgba(181,242,61,0.2)] transition-transform group-hover:scale-105">
                    <Icon name="phone" className="h-4.5 w-4.5 stroke-[2.2]" />
                  </span>
                  <div>
                    <span className="block text-[11px] text-white/60 font-medium leading-tight">
                      Phone Call
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-lime transition leading-tight mt-0.5">
                      019-239 9656
                    </span>
                  </div>
                </A>
              </li>

              {/* Email */}
              <li>
                <A
                  href={`mailto:${business?.email || "skitsvc@gmail.com"}`}
                  className="group flex items-center gap-3 transition hover:opacity-90"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime/60 bg-[#061d0d]/80 text-lime shadow-[0_0_10px_rgba(181,242,61,0.2)] transition-transform group-hover:scale-105">
                    <Icon name="mail" className="h-4.5 w-4.5 stroke-[2]" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[11px] text-white/60 font-medium leading-tight">
                      Email
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-lime transition leading-tight mt-0.5 break-all">
                      {business?.email || "skitsvc@gmail.com"}
                    </span>
                  </div>
                </A>
              </li>

              {/* Our Store */}
              <li>
                <A
                  href={business?.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Imbi+Plaza+Jalan+Imbi+Kuala+Lumpur"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition hover:opacity-90"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime/60 bg-[#061d0d]/80 text-lime shadow-[0_0_10px_rgba(181,242,61,0.2)] transition-transform group-hover:scale-105 mt-0.5">
                    <Icon name="pin" className="h-4.5 w-4.5 text-lime" />
                  </span>
                  <div>
                    <span className="block text-[11px] text-white/60 font-medium leading-tight">
                      Our Store
                    </span>
                    <span className="block text-xs text-white/75 group-hover:text-white transition leading-snug mt-0.5">
                      Lot 1.36, 1st Floor, Plaza Imbi,<br />
                      Jalan Imbi, 55100 Kuala Lumpur, Malaysia.
                    </span>
                  </div>
                </A>
              </li>

              {/* Operating Hours */}
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lime/60 bg-[#061d0d]/80 text-lime shadow-[0_0_10px_rgba(181,242,61,0.2)] mt-0.5">
                  <Icon name="clock" className="h-4.5 w-4.5 text-lime" />
                </span>
                <div>
                  <span className="block text-[11px] text-white/60 font-medium leading-tight">
                    Operating Hours
                  </span>
                  <span className="block text-xs text-white/75 leading-snug mt-0.5">
                    Monday – Saturday: 10:00 AM – 7:00 PM<br />
                    Sunday: Closed
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SK IT Services. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <A href="/privacy-policy" className="hover:text-lime transition-colors">
              Privacy Policy
            </A>
            <span className="text-white/20">|</span>
            <A href="#" className="hover:text-lime transition-colors">
              Terms &amp; Conditions
            </A>
          </div>
        </div>
      </div>
    </footer>
  );
}
