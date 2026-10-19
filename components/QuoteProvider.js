"use client";
import { createContext, useContext, useState, useCallback } from "react";
import QuoteModal from "./QuoteModal";

const Ctx = createContext({ open: () => {} });
export const useQuote = () => useContext(Ctx);

export default function QuoteProvider({ children, content }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
       {isOpen && <QuoteModal onClose={() => setOpen(false)} content={content} />}
    </Ctx.Provider>
  );
}
