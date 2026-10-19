import QuoteProvider from "@/components/QuoteProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import CustomPC from "@/components/CustomPC";
import Why from "@/components/Why";
import HowWeWork from "@/components/HowWeWork";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { readContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const content = await readContent();
  return (
    <QuoteProvider content={content}>
      <Header content={content} />
      <main className="overflow-x-hidden">
        <Hero content={content} /><Services content={content} /><Products content={content} /><CustomPC content={content} /><Why content={content} /><HowWeWork content={content} /><Reviews content={content} /><FAQ content={content} /><Contact content={content} />
      </main>
      <Footer content={content} />
      <FloatingWhatsApp content={content} />
    </QuoteProvider>
  );
}
