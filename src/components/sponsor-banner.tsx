import { useEffect, useRef } from "react";
import { banner } from "../config/banner";
import { useTranslation } from "../i18n";

declare global {
  interface Window { adsbygoogle?: Record<string, unknown>[] }
}

function AdSenseUnit() {
  const unit = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  useEffect(() => {
    const element = unit.current;
    if (!element) return;
    const request = () => {
      if (requested.current || element.hasAttribute("data-adsbygoogle-status") || element.getBoundingClientRect().width === 0) return;
      // The banner lives outside the router: one request, not an automatic refresh on navigation.
      requested.current = true;
      const scriptUrl = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${banner.publisherId}`;
      if (!document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = scriptUrl;
        document.head.appendChild(script);
      }
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch (error) { if (import.meta.env.DEV) console.warn("AdSense banner could not initialize", error); }
    };
    request();
    const observer = new ResizeObserver(request);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <ins ref={unit} className="adsbygoogle" style={{ display: "block" }}
    data-ad-client={banner.publisherId} data-ad-slot={banner.slotId}
    data-ad-format="auto" data-full-width-responsive="true"
    data-adtest={import.meta.env.DEV ? "on" : undefined} />;
}

export function SponsorBanner() {
  const { t } = useTranslation();
  const configured = /^ca-pub-\d{16}$/.test(banner.publisherId) && /^\d+$/.test(banner.slotId);
  const localPreview = import.meta.env.DEV ||
    (typeof window !== "undefined" && ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname));
  if (!banner.enabled || (!configured && !localPreview)) return null;
  return <aside className="sponsor-banner" aria-label={t("Advertisement")}>
    <div className="sponsor-label"><span>{t("Advertisement")}</span>{localPreview && <span>{t("Local preview")}</span>}</div>
    <div className="ad-unit-container">
      {localPreview ? <div className="ad-placeholder"><div><strong>{t("Banner preview")}</strong><p>{t("Live ads require an approved deployed site. This is a layout preview.")}</p></div></div> : <AdSenseUnit />}
    </div>
  </aside>;
}
