"use client";
import { useEffect, useState } from "react";
import Icon, { WhatsAppIcon } from "./Icon";
import { openWhatsApp } from "@/lib/whatsapp";

function Tile({ selected, onClick, children, className = "" }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected}
      className={`flex items-center justify-center gap-3 rounded-2xl border px-4 text-center font-form font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cc43f]
      ${selected ? "border-[#e0912f] bg-[#fdf3e7] text-[#9a5a16] shadow-[0_0_0_5px_rgba(224,145,47,.14)]" : "border-[#e3e5e0] bg-[#f6f6f4] text-[#4a5258] hover:bg-[#efefeb]"} ${className}`}>
      {children}
    </button>
  );
}

export default function QuoteModal({ onClose, content }) {
  const quote = content.quote;
  const business = content.business;
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState("Laptop");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const canNext = step === 0 ? !!device : step === 1 ? !!model : !!issue;
  const next = () => canNext && setStep((s) => s + 1);
  const send = () => {
    if (!canNext) return;
    openWhatsApp(quote.messageTemplate.replace("{{device}}", device).replace("{{model}}", model).replace("{{issue}}", issue), business);
  };
  const pickDevice = (d) => { setDevice(d); setModel(""); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 p-3 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Get a free quote">
      <div className="relative my-auto w-full max-w-[720px] rounded-[28px] bg-white p-5 font-form text-[#272d29] shadow-2xl sm:p-9">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-[#6b736d] hover:bg-[#f0f2ee]"><Icon name="x" /></button>
         <h2 className="pr-10 text-[clamp(1.6rem,4.4vw,2.5rem)] font-extrabold leading-tight tracking-tight">{quote.titles[step]}</h2>

        {/* stepper */}
        <ol className="mt-5 flex items-center gap-2 sm:gap-3" aria-label="Progress">
           {quote.steps.map((s, i) => (
            <li key={s} className={`flex items-center gap-2 ${i < 2 ? "flex-1" : ""}`} aria-current={i === step ? "step" : undefined}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-bold sm:h-[34px] sm:w-[34px] ${i <= step ? "border-[#8cc43f] bg-[#8cc43f] text-[#1b2a12]" : "border-[#e1e3de] bg-white text-[#98a09a]"}`}>{i + 1}</span>
              <span className={`text-sm font-semibold sm:text-base ${i <= step ? "text-[#4a7a1f]" : "text-[#98a09a]"}`}>{s}</span>
              {i < 2 && <span className="h-px flex-1 bg-[#e1e3de]" />}
            </li>
          ))}
        </ol>

         <p className="mt-6 text-base text-[#6b736d] sm:text-lg">{step === 1 ? quote.subtitles[step].replace("your device", `your ${device}`) : quote.subtitles[step]}</p>

        <div className="mt-4">
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
               {quote.devices.map(([ic, name]) => (
                <Tile key={name} selected={device === name} onClick={() => pickDevice(name)} className="min-h-[96px] flex-col gap-2 py-4 text-lg">
                  <Icon name={ic} className="h-7 w-7" />{name}
                </Tile>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
               {(quote.models[device] || []).map((m) => (
                <Tile key={m} selected={model === m} onClick={() => setModel(m)} className="min-h-[84px] py-4 text-base sm:min-h-[96px]">{m}</Tile>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
               {quote.issues.map(([ic, name]) => (
                <Tile key={name} selected={issue === name} onClick={() => setIssue(name)} className="min-h-[60px] justify-start py-3 text-base">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e8f1dc] text-[#4a7a1f]"><Icon name={ic} className="h-5 w-5" /></span>{name}
                </Tile>
              ))}
            </div>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 0 ? (
             <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-2xl bg-[#f1f3ee] px-5 py-3.5 font-bold text-[#3b443d] hover:bg-[#e8ebe4]"><Icon name="left" className="h-4 w-4" />{quote.backLabel}</button>
          ) : <span />}
          {step < 2 ? (
             <button onClick={next} disabled={!canNext} className="inline-flex items-center gap-2 rounded-2xl bg-[#8cc43f] px-6 py-3.5 font-bold text-[#17210f] transition hover:bg-[#7db534] disabled:cursor-not-allowed disabled:opacity-50">{quote.continueLabel}<Icon name="arrow" className="h-4 w-4" /></button>
          ) : (
             <button onClick={send} disabled={!canNext} className="inline-flex items-center gap-2 rounded-2xl bg-[#8cc43f] px-5 py-3.5 font-bold text-[#17210f] transition hover:bg-[#7db534] disabled:cursor-not-allowed disabled:opacity-50 sm:px-7"><WhatsAppIcon />{quote.submitLabel}<Icon name="arrowUp" className="h-4 w-4" /></button>
          )}
        </div>
         {step === 2 && <p className="mt-4 text-center text-sm text-[#6b736d]">{quote.privacyNotice}</p>}
      </div>
    </div>
  );
}
