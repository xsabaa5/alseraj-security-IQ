import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const imageFiles = Object.values(
  import.meta.glob("../assets/images/*.{JPG,jpeg,jpg,png}", { eager: true, query: "?url", import: "default" }),
);

export default function Gallery() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );

      const cards = gridRef.current?.querySelectorAll(".gallery-item");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % imageFiles.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + imageFiles.length) % imageFiles.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <section
        id="solutions"
        ref={sectionRef}
        className="relative w-full px-6 py-24 lg:px-20 lg:py-32 bg-black overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-14 lg:mb-20">
            <p className="text-xs font-semibold tracking-[4px] uppercase text-[#e93d59] mb-3">
              {t("gallery.badge")}
            </p>
            <h2 className="text-[clamp(28px,5vw,44px)] font-bold text-white tracking-tight">
              {t("gallery.title")}
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#e93d59] to-transparent" />
          </div>

          {/* Grid — 4 cols × 5 rows, uniform cells */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            style={{ gridAutoRows: "1fr" }}
          >
            {imageFiles.slice(0, 20).map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                className="gallery-item rounded-xl overflow-hidden
                  cursor-pointer group relative aspect-square"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out
                    group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                    opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                    transition-all duration-500">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 end-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors cursor-pointer border-none z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + imageFiles.length) % imageFiles.length);
            }}
            className="absolute start-4 sm:start-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors cursor-pointer border-none z-10"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>

          {/* Image */}
          <img
            src={imageFiles[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % imageFiles.length);
            }}
            className="absolute end-4 sm:end-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors cursor-pointer border-none z-10"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
            {lightbox + 1} / {imageFiles.length}
          </span>
        </div>
      )}
    </>
  );
}
