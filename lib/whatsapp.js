import { BIZ } from "./data";
// Every lead is sent to the SK IT Services WhatsApp number.
export const waLink = (text = "Hi SK IT Services, I'd like to enquire.", business = BIZ) =>
  `https://wa.me/${business.phoneWa}?text=${encodeURIComponent(text)}`;
export const telLinkFor = (business = BIZ) => `tel:${business.phoneRaw}`;
export const telLink = telLinkFor(BIZ);
export const openWhatsApp = (text, business = BIZ) => {
  if (typeof window !== "undefined") window.open(waLink(text, business), "_blank", "noopener,noreferrer");
};
