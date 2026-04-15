"use client";

import Script from "next/script";
import { useState, useEffect, useRef } from "react";

const tikToks = [
  {
    videoId: "7628488661767589141",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628488661767589141",
    title: "Pro Graphics Contravison #design #graphic",
    audioUrl: "https://www.tiktok.com/music/original-sound-7628488761361386256",
  },
  {
    videoId: "7628488197017734420",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628488197017734420",
    title: "",
    audioUrl: "https://www.tiktok.com/music/original-sound-7628488282371885832",
  },
  {
    videoId: "7628487832876649748",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628487832876649748",
    title: "",
    audioUrl: "https://www.tiktok.com/music/original-sound-7628487923973442322",
  },
  {
    videoId: "7628486316174347541",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628486316174347541",
    title: "",
    audioUrl: "https://www.tiktok.com/music/original-sound-7628486390595308308",
  },
  {
    videoId: "7628226212170779925",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628226212170779925",
    title: "custom Stickers #wallcanvas #customwallpaper",
    audioUrl: "https://www.tiktok.com/music/YAYA-7503306985385216001",
  },
  {
    videoId: "7628221699783281940",
    url: "https://www.tiktok.com/@prographicsdurban/video/7628221699783281940",
    title: "Pro Graphic Custom Drawers #designertok",
    audioUrl: "https://www.tiktok.com/music/Heads-Will-Roll-MVDOU-EDIT-7551614995562678288",
  },
  {
    videoId: "7626661173877935381",
    url: "https://www.tiktok.com/@prographicsdurban/video/7626661173877935381",
    title: "Pro Graphic Durban #print",
    audioUrl: "https://www.tiktok.com/music/Kanye-West-7326959713995966465",
  },
  {
    videoId: "7625910183419645204",
    url: "https://www.tiktok.com/@prographicsdurban/video/7625910183419645204",
    title: "custom canvas #interiordesign",
    audioUrl: "https://www.tiktok.com/music/shine-on-7516666673882974209",
  }
];

export function ProcessTikToks() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Disconnect after triggering once
        }
      },
      { rootMargin: "300px" } // Start loading 300px before reaching the section
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-blue-950 border-t border-blue-900 border-b relative z-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            See Our <span className="text-amber-500">Process</span> in Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto font-light">
            Behind the scenes of our premium graphics, vehicle wraps, and custom print setups at Pro Graphics Durban.
          </p>
        </div>

        {/* Adjust grid to have 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tikToks.map((tiktok) => (
            <div key={tiktok.videoId} className="flex justify-center w-full overflow-hidden rounded-xl shadow-lg bg-black/10 items-center min-h-[580px]">
              <blockquote
                className="tiktok-embed"
                cite={tiktok.url}
                data-video-id={tiktok.videoId}
                style={{ maxWidth: "100%", width: "100%", minWidth: "325px", border: "none", borderRadius: "12px", overflow: "hidden" }}
              >
                <section />
              </blockquote>
            </div>
          ))}
        </div>
      </div>
      
      {shouldLoad && <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />}
    </section>
  );
}
