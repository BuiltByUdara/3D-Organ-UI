import { useEffect, useRef } from "react";
import { useTranslation } from "../i18n";

const publisherId = "ca-pub-8844201730272987";
const slotId = "2487599867";

declare global {
  interface Window { adsbygoogle?: Record<string, unknown>[] }
}

export function FooterAd() {
  const { t } = useTranslation();
  const unit = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const preview = import.meta.env.DEV ||
    ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

  useEffect(() => {
    if (preview || !unit.current) return;
    const element = unit.current;
    const request = () => {
      if (requested.current || element.hasAttribute("data-adsbygoogle-status") ||
          element.getBoundingClientRect().width === 0) return;
      requested.current = true;
      if (!document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        document.head.appendChild(script);
      }
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch (error) { console.warn("Footer ad could not initialize", error); }
    };
    request();
    const observer = new ResizeObserver(request);
    observer.observe(element);
    return () => observer.disconnect();
  }, [preview]);

  return (
    <aside className="footer-ad" aria-label={t("Advertisement")}>
      <div className="footer-ad-label">{t("Advertisement")}</div>
      {preview ? (
        <div className="footer-ad-preview">{t("Banner preview")}</div>
      ) : (
        <ins ref={unit} className="adsbygoogle" style={{ display: "block" }}
          data-ad-client={publisherId} data-ad-slot={slotId}
          data-ad-format="auto" data-full-width-responsive="true" />
      )}
    </aside>
  );
}
