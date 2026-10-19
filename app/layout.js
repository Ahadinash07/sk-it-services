import "./globals.css";
import Script from "next/script";
import { readContent } from "@/lib/cms/store";

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0e1b17" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const content = await readContent();
  const seo = content.seo;
  return {
    metadataBase: new URL(seo.canonicalUrl || "https://www.skitservices.com.my"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl || undefined },
    robots: seo.robots,
    openGraph: {
      title: seo.openGraphTitle || seo.title,
      description: seo.openGraphDescription || seo.description,
      images: seo.openGraphImage ? [seo.openGraphImage] : undefined,
      type: "website",
      locale: seo.locale || "en_MY",
    },
  };
}

export default async function RootLayout({ children }) {
  const content = await readContent();
  const { googleTagManagerId, googleAnalyticsId, metaPixelId, customHead, customBodyStart, customBodyEnd } = content.tracking;
  const gtmId = googleTagManagerId.replace(/[^A-Za-z0-9-]/g, "");
  const gaId = googleAnalyticsId.replace(/[^A-Za-z0-9-]/g, "");
  const pixelId = metaPixelId.replace(/[^0-9]/g, "");
  return (
    <html lang="en">
      <head>
        {customHead ? <script dangerouslySetInnerHTML={{ __html: customHead }} /> : null}
        {gtmId ? (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {gaId ? <>
          <Script id="google-analytics-src" async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}</Script>
        </> : null}
        {pixelId ? <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}</Script> : null}
      </head>
      <body>
        {customBodyStart ? <div dangerouslySetInnerHTML={{ __html: customBodyStart }} /> : null}
        {gtmId ? <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript> : null}
        <div className="overflow-x-hidden w-full">
          {children}
        </div>
        {customBodyEnd ? <div dangerouslySetInnerHTML={{ __html: customBodyEnd }} /> : null}
      </body>
    </html>
  );
}
