import Icon, { WhatsAppIcon } from "./Icon";
import A from "./A";
import { Logo } from "./Header";
import { waLink, telLinkFor } from "@/lib/whatsapp";
const Dot = ({ children }) => <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-ink">{children}</span>;

function ContactDetails({ business, footer }) {
  const tel = telLinkFor(business);
  return (
    <ul className="space-y-3.5 text-sm">
       <li><A href={tel} className="flex items-center gap-3 font-bold hover:text-lime"><Dot><Icon name="phone" className="h-4 w-4" /></Dot>{business.phoneDisplay}</A></li>
       <li><A href={waLink(undefined, business)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold hover:text-lime"><Dot><WhatsAppIcon className="h-4 w-4" /></Dot>{footer.whatsappLabel}</A></li>
       <li><A href={`mailto:${business.email}`} className="flex items-center gap-3 font-bold hover:text-lime break-all"><Dot><Icon name="mail" className="h-4 w-4" /></Dot>{business.email}</A></li>
       <li><A href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/90 hover:text-lime"><Dot><Icon name="pin" className="h-4 w-4" /></Dot><span className="leading-snug">{business.addressOneLine}</span></A></li>
       <li className="flex items-start gap-3 text-white/90"><Dot><Icon name="clock" className="h-4 w-4" /></Dot><span className="leading-snug">{business.hours[0]}<br />{business.hours[1]}<br />{business.hours[2]}</span></li>
    </ul>
  );
}

export default function Footer({ content }) {
  const { business, landing, footer } = content;
  return (
    <footer className="dark-sec bg-ink text-white">
      <div className="wrap py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.8fr_.8fr_1.5fr]">
          <div><Logo className="h-14" src={landing.header.logo} alt={landing.header.logoAlt} /><p className="mt-4 max-w-[240px] text-sm font-semibold text-white/85">{business.tagline}</p></div>
          {footer.groups.map((g) => (
             <div key={g.title} className="hidden lg:block lg:border-l lg:border-white/10 lg:pl-8">
               <h4 className="font-extrabold text-lime">{g.title}</h4>
               <ul className="mt-4 space-y-2.5 text-sm">{g.links.map(([l, h]) => <li key={l}><A href={h} className="flex items-center justify-between text-white/85 hover:text-lime">{l}<Icon name="right" className="h-3.5 w-3.5" /></A></li>)}</ul>
            </div>
          ))}
          {/* Contact details are always visible, on every screen size */}
          <div className="min-w-0 border-t border-lime/40 pt-5 lg:border-l lg:border-t-0 lg:border-white/10 lg:pl-8 lg:pt-0">
             <h4 className="mb-4 font-extrabold text-lime">{footer.contactHeading}</h4>
             <ContactDetails business={business} footer={footer} />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
           <p>{footer.copyright}</p>
          <p className="flex items-center gap-3">
             <A href={footer.privacyHref} className="hover:text-lime">{footer.privacyLabel}</A>
            {/* <span className="h-3 w-px bg-lime" /> */}
            {/* <A href="#" className="hover:text-lime">Terms &amp; Conditions</A> */}
          </p>
        </div>
      </div>
    </footer>
  );
}
