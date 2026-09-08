import { useEffect } from "react";

export interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = "Pro Graphics";
const DEFAULT_DESCRIPTION = "Professional graphic design services, branding, and visual solutions.";
const DEFAULT_OG_IMAGE = "/og-image.png";
const BASE_URL = "https://pro-graphics.co.za";

export function Seo({ title, description, canonicalUrl, ogImage }: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = title ? `${title} | Pro Graphics` : DEFAULT_TITLE;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const removeMeta = (name: string, property = false) => {
      const attr = property ? "property" : "name";
      const el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) el.remove();
    };

    const prevValues = new Map<string, [string, boolean, string]>();
    const trackPrev = (name: string, property: boolean) => {
      const attr = property ? "property" : "name";
      const el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) {
        prevValues.set(name, [name, property, el.getAttribute("content") ?? ""]);
      }
    };

    trackPrev("description", false);
    trackPrev("og:title", true);
    trackPrev("og:description", true);
    trackPrev("og:url", true);
    trackPrev("og:image", true);
    trackPrev("twitter:card", false);

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
    }
    if (title) {
      setMeta("og:title", fullTitle, true);
    }
    if (canonicalUrl) {
      const url = canonicalUrl.startsWith("http") ? canonicalUrl : `${BASE_URL}${canonicalUrl}`;
      let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = url;
      setMeta("og:url", url, true);
    }
    if (ogImage) {
      const imageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
      setMeta("og:image", imageUrl, true);
    }
    setMeta("twitter:card", "summary_large_image", false);

    return () => {
      document.title = previousTitle;
      for (const [, [name, property]] of prevValues) {
        const attr = property ? "property" : "name";
        const el = document.querySelector(`meta[${attr}="${name}"]`);
        if (el) el.remove();
      }
      for (const [, [name, property, content]] of prevValues) {
        if (content) {
          const attr = property ? "property" : "name";
          const el = document.createElement("meta");
          el.setAttribute(attr, name);
          el.setAttribute("content", content);
          document.head.appendChild(el);
        }
      }
    };
  }, [title, description, canonicalUrl, ogImage]);

  return null;
}
