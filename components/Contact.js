"use client";
import { useState } from "react";
import A from "./A";
import Icon, { WhatsAppIcon } from "./Icon";
import Photo from "./Photo";
import { openWhatsApp, waLink, telLinkFor } from "@/lib/whatsapp";

function PcTowerIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <circle cx="12" cy="16.5" r="1.5" />
    </svg>
  );
}

function MapCard({ business }) {
  const mapsUrl = business?.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Imbi+Plaza+Jalan+Imbi+Kuala+Lumpur";
  return (
    <div className="relative h-[145px] sm:h-[155px] w-full overflow-hidden rounded-xl border border-ink/10 bg-mist">
      <iframe
        title="Plaza Imbi Location"
        src="https://maps.google.com/maps?q=Plaza+Imbi,+Jalan+Imbi,+Kuala+Lumpur&t=&z=16&ie=UTF8&iwloc=&output=embed"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open store location in Google Maps"
        className="absolute left-2.5 top-2.5 z-10 rounded-md bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur transition hover:bg-white"
      >
        <span className="block text-[11px] font-bold leading-tight text-ink">Plaza Imbi</span>
        <span className="block text-[10px] font-medium text-leaf-dark leading-tight hover:underline">View larger map</span>
      </a>
    </div>
  );
}

const CATEGORIES = [
  {
    id: "repair",
    icon: "wrench",
    title: "Laptop & Computer Repair",
    sub: "Diagnose and fix issues",
    defaultMessage: "Hi SK IT Services, I need help with Laptop & Computer Repair.",
  },
  {
    id: "sales",
    icon: "cart",
    title: "Laptop & Computer Sales",
    sub: "New and refurbished laptops & desktops",
    defaultMessage: "Hi SK IT Services, I'm interested in Laptop & Computer Sales.",
  },
  {
    id: "parts",
    icon: "cpu",
    title: "Parts & Upgrades",
    sub: "RAM, SSD, storage, accessories and more",
    defaultMessage: "Hi SK IT Services, I am looking for Parts & Upgrades (RAM, SSD, storage, etc.).",
  },
  {
    id: "business",
    icon: "building",
    title: "Business IT Support",
    sub: "IT solutions for businesses",
    defaultMessage: "Hi SK IT Services, I would like to enquire about Business IT Support.",
  },
  {
    id: "custom-pc",
    icon: "pc",
    title: "Custom PC Builds",
    sub: "Gaming, work or study setups",
    defaultMessage: "Hi SK IT Services, I would like to plan a Custom PC Build.",
  },
  {
    id: "other",
    icon: "chat",
    title: "Other Enquiries",
    sub: "General questions or other services",
    defaultMessage: "Hi SK IT Services, I have a general enquiry.",
  },
];

const CATEGORY_DETAILS = {
  repair: {
    title: "What needs to be repaired?",
    subtitle: "Select the issue or component that needs attention:",
    options: [
      "Screen / Display Damage",
      "Battery & Charging Issue",
      "Device Won't Turn On",
      "Slow Speed / Freezing",
      "Keyboard / Trackpad",
      "Water / Liquid Spill",
      "Motherboard / Hardware",
      "Virus / OS / Software",
      "Other Repair Problem",
    ],
    placeholder: "Optional: Device model or issue details (e.g. Acer Nitro 5, cracked screen)",
  },
  sales: {
    title: "What are you looking for?",
    subtitle: "Select your preferred device type or budget category:",
    options: [
      "Refurbished Laptop (Tested & Clean)",
      "Brand New Laptop",
      "Desktop PC / All-in-One",
      "Budget / Student Device",
      "Business / Office Laptop",
      "High Performance / Gaming Laptop",
    ],
    placeholder: "Optional: Preferred brand or target budget (e.g. under RM 1,500)",
  },
  parts: {
    title: "What parts or upgrades do you need?",
    subtitle: "Select the component or accessory you're looking for:",
    options: [
      "RAM Upgrade (8GB / 16GB / 32GB)",
      "SSD Storage Upgrade (Fast NVMe)",
      "Laptop Replacement Battery",
      "Original Charger / Power Adapter",
      "Replacement Screen / Panel",
      "Other Components & Accessories",
    ],
    placeholder: "Optional: Your computer model (e.g. Lenovo IdeaPad 3)",
  },
  business: {
    title: "How can we assist your business?",
    subtitle: "Select your required business IT service:",
    options: [
      "Office Setup & Workstations",
      "Wi-Fi & Network Cabling Setup",
      "On-Demand IT Maintenance",
      "Bulk Computer & Laptop Supply",
      "Hardware Upgrades & Servicing",
      "General IT Consultation",
    ],
    placeholder: "Optional: Company name or number of workstations",
  },
  "custom-pc": {
    title: "What type of Custom PC do you want?",
    subtitle: "Tell us your usage and target setup:",
    options: [
      "Gaming PC (1080p / 1440p / 4K)",
      "Workstation for Video Editing / 3D",
      "Home Office & Productivity",
      "Compact / SFF Minimalist Build",
      "Budget-Friendly Entry Gaming",
      "Parts Upgrade on Existing PC",
    ],
    placeholder: "Optional: Your budget range or preferred specs (e.g. RTX 4060, RM 3,500)",
  },
  other: {
    title: "How can our team help you today?",
    subtitle: "Select a topic or type your inquiry:",
    options: [
      "Price Quote & Product Availability",
      "Store Visit / In-Person Consultation",
      "Warranty / Repair Follow-up",
      "Trade-in / Sell Used Computer",
      "General Inquiries & Other Services",
    ],
    placeholder: "Type a brief note about what you need...",
  },
};

export default function Contact({ content }) {
  const section = content?.landing?.contact || {};
  const business = content?.business || {};
  const tel = telLinkFor(business);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState("repair");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [customNote, setCustomNote] = useState("");

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCat) || CATEGORIES[0];
  const activeDetailsConfig = CATEGORY_DETAILS[selectedCat] || CATEGORY_DETAILS.repair;

  const cards = [
    {
      icon: "whatsapp",
      title: "WhatsApp",
      main: business?.whatsappDisplay ? `+60 ${business.whatsappDisplay}` : "+60 11-5757 9655",
      sub: "Chat with us for quick answers and quotation.",
      href: waLink("Hi SK IT Services, I would like to enquire about your services.", business),
      isExternal: true,
    },
    {
      icon: "phone",
      title: "Phone Call",
      main: business?.phoneDisplay || "+60 19-239 9656",
      sub: "Mon – Sat, 10AM – 7PM\n(Closed on Sunday)",
      href: tel,
      isExternal: false,
    },
    {
      icon: "mail",
      title: "Email",
      main: business?.email || "skitsvc@gmail.com",
      sub: "We'll get back to you as soon as possible.",
      href: `mailto:${business?.email || "skitsvc@gmail.com"}`,
      isExternal: false,
    },
    {
      icon: "pin",
      title: "Visit Our Store",
      main: "Plaza Imbi, Kuala Lumpur",
      sub: "Come to our store for product enquiries, repairs or consultation.",
      href: business?.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Imbi+Plaza+Jalan+Imbi+Kuala+Lumpur",
      isExternal: true,
    },
  ];

  const handleCategoryClick = (catId) => {
    setSelectedCat(catId);
    setSelectedDetail("");
    setCurrentStep(2);
  };

  const getWhatsAppMessage = () => {
    let msg = `Hi SK IT Services! I would like to enquire about ${activeCategory.title}.`;
    if (selectedDetail) {
      msg += `\nDetail: ${selectedDetail}`;
    }
    if (customNote.trim()) {
      msg += `\nNotes: ${customNote.trim()}`;
    }
    return msg;
  };

  const handleContinue = () => {
    openWhatsApp(getWhatsAppMessage(), business);
  };

  const renderCatIcon = (iconName, isSelected = false) => {
    if (iconName === "pc") return <PcTowerIcon className="h-5 w-5" />;
    return <Icon name={iconName} className="h-5 w-5" />;
  };

  return (
    <section id="contact" className="bg-white py-14 sm:py-20 text-ink">
      <div className="wrap">
        {/* Top Header & 4 Quick Contact Cards */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.9fr] items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-[.14em] uppercase text-leaf">
                {section.eyebrow || "CONTACT US"}
              </span>
              <span className="h-[2px] w-12 bg-leaf/40 rounded-full" />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
              {section.title || "Let's Talk About"}<br />
              <span className="text-leaf">{section.titleAccent || "Your IT Needs."}</span>
            </h2>
            <p className="mt-3.5 max-w-[440px] text-[13.5px] sm:text-[14.5px] leading-relaxed text-ink/75">
              {section.description || "Need a computer, repair service or business IT support? Get in touch with our team through WhatsApp, phone, email or visit our store at Plaza Imbi, Kuala Lumpur."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {cards.map((c) => (
              <A
                key={c.title}
                href={c.href}
                target={c.isExternal ? "_blank" : undefined}
                rel={c.isExternal ? "noopener noreferrer" : undefined}
                className="card group flex flex-col justify-between p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink shadow-sm transition-transform group-hover:scale-105">
                    {c.icon === "whatsapp" ? (
                      <WhatsAppIcon className="h-5 w-5" />
                    ) : (
                      <Icon name={c.icon} className="h-5 w-5 stroke-[2.2]" />
                    )}
                  </span>
                  <span className="mt-3.5 block text-xs font-bold text-ink/80">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block break-words text-sm font-extrabold text-ink leading-tight">
                    {c.main}
                  </span>
                </div>
                <span className="mt-2 block whitespace-pre-line text-[11px] leading-snug text-ink/60">
                  {c.sub}
                </span>
              </A>
            ))}
          </div>
        </div>

        {/* Main Middle Section: "How Can We Help You?" + "Our Store" */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.32fr_1fr] items-stretch">
          {/* Left Card: Category Selection / Multi-step */}
          <div className="card flex flex-col justify-between p-6 sm:p-7 h-full">
            {/* Step 1: Default View (Matches Image 1 100%) */}
            {currentStep === 1 && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-[26px] font-extrabold text-ink tracking-tight">
                    {section.quoteTitle || "How Can We Help You?"}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-[13px] text-ink/65 leading-relaxed">
                    {section.quoteDescription || "Choose a category to get started. We'll direct you to WhatsApp with the relevant details to assist you faster."}
                  </p>

                  {/* 3x2 Category Grid */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCat === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`group flex items-center justify-between gap-3 rounded-2xl p-3.5 text-left transition-all min-h-[76px] ${
                            isSelected
                              ? "border-2 border-leaf bg-mint/35 text-ink shadow-sm"
                              : "border border-ink/10 bg-white hover:border-ink/20 hover:bg-mist/50 text-ink"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                                isSelected
                                  ? "bg-mint text-leaf-dark"
                                  : "bg-mist text-ink/70 group-hover:bg-mint/40 group-hover:text-leaf-dark"
                              }`}
                            >
                              {renderCatIcon(cat.icon, isSelected)}
                            </span>
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-ink leading-snug">
                                {cat.title}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] transition-colors ${
                              isSelected
                                ? "bg-lime text-ink"
                                : "bg-mist text-ink/40 group-hover:bg-mint group-hover:text-leaf-dark"
                            }`}
                          >
                            <Icon name="right" className="h-3 w-3 stroke-[2.5]" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details Flow */}
            {currentStep === 2 && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-mint/60 px-2.5 py-1 text-xs font-bold text-leaf-dark">
                      {renderCatIcon(activeCategory.icon)}
                      {activeCategory.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-leaf-dark hover:underline flex items-center gap-1"
                    >
                      <Icon name="left" className="h-3 w-3" />
                      Change Category
                    </button>
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                    {activeDetailsConfig.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/65">
                    {activeDetailsConfig.subtitle}
                  </p>

                  {/* Quick option cards */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeDetailsConfig.options.map((opt) => {
                      const isPicked = selectedDetail === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedDetail(isPicked ? "" : opt)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-[13px] font-semibold transition ${
                            isPicked
                              ? "border-2 border-leaf bg-mint/40 text-ink shadow-sm"
                              : "border border-ink/10 bg-white hover:border-ink/20 hover:bg-mist/40 text-ink/80"
                          }`}
                        >
                          <span className="leading-snug">{opt}</span>
                          {isPicked && <Icon name="check" className="h-4 w-4 shrink-0 text-leaf" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3.5">
                    <label className="block text-[11px] font-bold text-ink/70 mb-1">
                      Device model or additional details (optional):
                    </label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder={activeDetailsConfig.placeholder}
                      className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink/40 outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation Summary */}
            {currentStep === 3 && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-mint/60 px-2.5 py-1 text-xs font-bold text-leaf-dark">
                      {renderCatIcon(activeCategory.icon)}
                      {activeCategory.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-bold text-leaf-dark hover:underline flex items-center gap-1"
                    >
                      <Icon name="left" className="h-3 w-3" />
                      Edit Details
                    </button>
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                    Ready to Connect on WhatsApp
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink/65">
                    Here is the message we&apos;ve prepared for our technical support team:
                  </p>

                  <div className="mt-4 rounded-2xl border border-leaf/20 bg-mint/30 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-leaf-dark">
                      <WhatsAppIcon className="h-4 w-4 fill-current" />
                      <span>WhatsApp Message Preview</span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-ink whitespace-pre-line leading-relaxed font-medium bg-white/80 p-3 rounded-xl border border-leaf/10 shadow-xs">
                      {getWhatsAppMessage()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper + CTA Button */}
            <div className="mt-6 pt-2">
              <div className="flex items-center justify-between" aria-label="Progress">
                {/* Step 1 */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 sm:gap-2.5 text-left transition hover:opacity-85"
                >
                  <span
                    className={`grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full text-xs sm:text-sm font-extrabold shadow-sm ${
                      currentStep >= 1
                        ? "bg-lime text-ink"
                        : "border border-ink/15 bg-white text-ink/40"
                    }`}
                  >
                    1
                  </span>
                  <div>
                    <span className={`block text-xs font-bold leading-none ${currentStep === 1 ? "text-leaf-dark" : "text-ink"}`}>
                      Category
                    </span>
                    <span className="block text-[10px] text-ink/60 mt-1 leading-none">
                      {currentStep > 1 ? activeCategory.title : "Select a category"}
                    </span>
                  </div>
                </button>

                <span className={`h-0.5 flex-1 mx-2.5 sm:mx-4 transition-colors ${currentStep > 1 ? "bg-lime" : "bg-ink/10"}`} />

                {/* Step 2 */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 sm:gap-2.5 text-left transition hover:opacity-85"
                >
                  <span
                    className={`grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full text-xs sm:text-sm font-extrabold shadow-sm ${
                      currentStep >= 2
                        ? "bg-lime text-ink"
                        : "border border-ink/15 bg-white text-ink/40"
                    }`}
                  >
                    2
                  </span>
                  <div>
                    <span className={`block text-xs font-bold leading-none ${currentStep === 2 ? "text-leaf-dark" : currentStep > 2 ? "text-ink" : "text-ink/40"}`}>
                      Details
                    </span>
                    <span className="block text-[10px] mt-1 leading-none text-ink/60">
                      {selectedDetail ? selectedDetail : "Share a few details"}
                    </span>
                  </div>
                </button>

                <span className={`h-0.5 flex-1 mx-2.5 sm:mx-4 transition-colors ${currentStep > 2 ? "bg-lime" : "bg-ink/10"}`} />

                {/* Step 3 */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 sm:gap-2.5 text-left transition hover:opacity-85"
                >
                  <span
                    className={`grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full text-xs sm:text-sm font-extrabold shadow-sm ${
                      currentStep === 3
                        ? "bg-lime text-ink"
                        : "border border-ink/15 bg-white text-ink/40"
                    }`}
                  >
                    3
                  </span>
                  <div>
                    <span className={`block text-xs font-bold leading-none ${currentStep === 3 ? "text-leaf-dark" : "text-ink/40"}`}>
                      Chat on WhatsApp
                    </span>
                    <span className="block text-[10px] text-ink/40 mt-1 leading-none">
                      Continue to WhatsApp
                    </span>
                  </div>
                </button>
              </div>

              {/* Big Action Button */}
              <div className="mt-5 flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-ink/15 bg-mist/60 px-4 py-3.5 text-xs sm:text-sm font-bold text-ink hover:bg-mist transition active:scale-[.98]"
                  >
                    <Icon name="left" className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleContinue}
                  className="btn-lime flex-1 rounded-2xl font-bold py-3.5 sm:py-4 px-6 flex items-center justify-center gap-2.5 shadow-sm hover:shadow transition-all active:scale-[.99]"
                >
                  <WhatsAppIcon className="h-5 w-5 fill-current" />
                  <span className="text-sm sm:text-base font-bold">Continue to WhatsApp</span>
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink/55">
                <Icon name="lock" className="h-3.5 w-3.5 text-ink/40" />
                <span>No registration required. You&apos;ll be redirected to WhatsApp.</span>
              </p>
            </div>
          </div>

          {/* Right Card: "Our Store" */}
          <div className="card flex flex-col justify-between p-6 sm:p-7 h-full">
            <div>
              <div className="flex items-center gap-3">
                <span className="bubble h-11 w-11">
                  <Icon name="store" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-ink leading-tight">Our Store</h3>
                  <p className="text-xs text-ink/60 mt-0.5">Visit us for product enquiries, repairs or consultation.</p>
                </div>
              </div>

              {/* Store Photo */}
              <div className="mt-5 overflow-hidden rounded-xl border border-ink/5 shadow-inner">
                <Photo
                  src={section.storeImage || "/images/store.jpg"}
                  alt={section.storeImageAlt || "SK IT Services store at Plaza Imbi"}
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="h-[195px] sm:h-[215px] w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1.15fr_1fr] gap-4 items-start pt-1">
              <div className="space-y-4 text-xs">
                <div className="flex gap-2.5 items-start">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  <div>
                    <b className="block text-xs font-bold text-ink">SK IT Services</b>
                    <p className="mt-0.5 text-[11px] text-ink/70 leading-snug">
                      Lot 1.36, 1st Floor, Plaza Imbi,<br />
                      Jalan Imbi, 55100 Kuala Lumpur,<br />
                      Malaysia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  <div>
                    <b className="block text-xs font-bold text-ink">Operating Hours</b>
                    <p className="mt-0.5 text-[11px] text-ink/70 leading-snug">
                      Monday – Saturday: 10:00 AM – 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map Widget */}
              <MapCard business={business} />
            </div>
          </div>
        </div>

        {/* Bottom Banner: "STILL HAVE QUESTIONS? We're Here to Help." */}
        <div className="dark-sec mt-6 rounded-2xl bg-ink p-6 text-white sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 ring-1 ring-white/10">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[.07] text-lime">
              <Icon name="chatDots" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-lime">
                {section.stillQuestionsEyebrow || "STILL HAVE QUESTIONS?"}
              </p>
              <h3 className="mt-0.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                We&apos;re <span className="text-lime">{section.stillQuestionsTitle ? section.stillQuestionsTitle.replace("We're ", "") : "Here to Help."}</span>
              </h3>
            </div>
          </div>

          {/* Middle: Short text matching Image 1 */}
          <div className="text-center md:text-left">
            <p className="text-sm sm:text-[15px] font-semibold text-white/95">
              Not sure what you need? Just drop us a message.
            </p>
            <p className="text-xs sm:text-sm text-white/70 mt-0.5">
              Our friendly team is ready to assist you.
            </p>
          </div>

          {/* Right: Pill Button using website lime brand style */}
          <div>
            <A
              href={waLink("Hi SK IT Services, I'm not sure what I need. Could you please advise me?", business)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-sm sm:text-base font-bold shadow-sm transition hover:scale-[1.02] active:scale-[.98] whitespace-nowrap"
            >
              <WhatsAppIcon className="h-5 w-5 fill-current" />
              <span>Chat With Us →</span>
            </A>
          </div>
        </div>
      </div>
    </section>
  );
}
