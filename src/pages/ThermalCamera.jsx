import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaArrowRight,
  FaThermometerHalf,
  FaBrain,
  FaShieldAlt,
  FaEye,
  FaIndustry,
  FaBuilding,
  FaRoad,
  FaFireAlt,
  FaSnowflake,
  FaBolt,
  FaSatellite,
  FaUserShield,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [
  FaBrain,
  FaEye,
  FaSnowflake,
  FaBolt,
  FaFireAlt,
  FaSatellite,
];

const useCaseIcons = [
  FaBuilding,
  FaIndustry,
  FaRoad,
  FaShieldAlt,
  FaUserShield,
  FaFireAlt,
];

const productSeries = [
  { key: "heatpro", color: "#e93d59" },
  { key: "biSpectrum", color: "#f97316" },
  { key: "thermography", color: "#8b5cf6" },
];

export default function ThermalCamera() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  const useCasesRef = useRef(null);
  const specsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current?.querySelectorAll("[data-animate]");
      if (heroEls?.length) {
        gsap.fromTo(heroEls, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out", delay: 0.3,
        });
      }

      // Overview
      const overviewEls = overviewRef.current?.querySelectorAll("[data-animate]");
      if (overviewEls?.length) {
        gsap.fromTo(overviewEls, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: overviewRef.current, start: "top 75%", once: true },
        });
      }

      // Features
      const featureCards = featuresRef.current?.querySelectorAll(".feature-card");
      if (featureCards?.length) {
        gsap.fromTo(featureCards, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 75%", once: true },
        });
      }

      // Products
      const productCards = productsRef.current?.querySelectorAll(".product-series-card");
      if (productCards?.length) {
        gsap.fromTo(productCards, { opacity: 0, y: 30, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: productsRef.current, start: "top 75%", once: true },
        });
      }

      // Use cases
      const useCaseCards = useCasesRef.current?.querySelectorAll(".usecase-card");
      if (useCaseCards?.length) {
        gsap.fromTo(useCaseCards, { opacity: 0, y: 20, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: useCasesRef.current, start: "top 80%", once: true },
        });
      }

      // Specs
      const specEls = specsRef.current?.querySelectorAll("[data-animate]");
      if (specEls?.length) {
        gsap.fromTo(specEls, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: specsRef.current, start: "top 80%", once: true },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const features = Array.from({ length: 6 }, (_, i) => ({
    icon: featureIcons[i],
    title: t(`thermal.feature${i + 1}Title`),
    desc: t(`thermal.feature${i + 1}Desc`),
  }));

  const useCases = Array.from({ length: 6 }, (_, i) => ({
    icon: useCaseIcons[i],
    title: t(`thermal.useCase${i + 1}Title`),
    desc: t(`thermal.useCase${i + 1}Desc`),
  }));

  return (
    <section className="w-full min-h-screen bg-black text-white">
      {/* ── Hero ── */}
      <div ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <Link
          to="/"
          className="absolute top-20 start-8 z-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-2.5 text-sm text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform duration-300" />
          <span>{t("serviceDetail.backToHome")}</span>
        </Link>

        {/* Thermal gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-black to-red-950/30" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div data-animate className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/10">
            <FaThermometerHalf className="text-orange-500 text-sm" />
            <span className="text-orange-500 text-xs font-semibold tracking-[3px] uppercase">
              {t("thermal.badge")}
            </span>
          </div>
          <h1 data-animate className="text-[clamp(2.2rem,7vw,5rem)] font-bold leading-tight mb-6">
            {t("thermal.heroTitle")}
          </h1>
          <p data-animate className="text-white/60 text-[clamp(0.95rem,2vw,1.2rem)] leading-relaxed max-w-2xl mx-auto">
            {t("thermal.heroSubtitle")}
          </p>
        </div>
      </div>

      {/* ── Overview ── */}
      <div ref={overviewRef} className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28 max-w-5xl mx-auto text-center">
        <h2 data-animate className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-8">
          {t("thermal.overviewTitle")}
        </h2>
        <p data-animate className="text-white/55 text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed max-w-3xl mx-auto">
          {t("thermal.overviewText")}
        </p>
      </div>

      {/* ── Key Features ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("thermal.featuresTitle")}
        </h2>
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="feature-card group p-8 rounded-2xl border border-white/10 bg-white/[0.02]
                hover:border-orange-500/30 hover:bg-orange-500/[0.03] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-orange-500 text-xl" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product Series ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("thermal.productsTitle")}
        </h2>
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productSeries.map(({ key, color }) => (
            <div
              key={key}
              className="product-series-card group relative p-8 lg:p-10 rounded-2xl border border-white/10 bg-white/[0.02]
                hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ backgroundColor: color }}
              />
              <h3 className="text-white text-xl font-semibold mb-3 mt-2">
                {t(`thermal.series${key.charAt(0).toUpperCase() + key.slice(1)}Title`)}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">
                {t(`thermal.series${key.charAt(0).toUpperCase() + key.slice(1)}Desc`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ borderColor: `${color}30`, color: `${color}cc`, backgroundColor: `${color}10` }}
                  >
                    {t(`thermal.series${key.charAt(0).toUpperCase() + key.slice(1)}Tag${i}`)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Technical Specs ── */}
      <div ref={specsRef} className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-5xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("thermal.specsTitle")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-animate
              className="p-6 rounded-xl border border-orange-500/20 bg-white/[0.02] text-center"
            >
              <p className="text-orange-500 text-xs font-semibold tracking-[2px] uppercase mb-3">
                {t(`thermal.spec${i}Label`)}
              </p>
              <p className="text-white text-xl font-medium">{t(`thermal.spec${i}Value`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("thermal.useCasesTitle")}
        </h2>
        <div ref={useCasesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="usecase-card p-6 rounded-xl border border-white/8 bg-white/[0.02]
                hover:border-orange-500/20 transition-all duration-300"
            >
              <Icon className="text-orange-500 text-lg mb-3" />
              <h4 className="text-white text-sm font-semibold mb-1.5">{title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-24 max-w-3xl mx-auto text-center">
        <h3 className="text-[clamp(1.3rem,3vw,2rem)] font-medium mb-4">
          {t("thermal.ctaTitle")}
        </h3>
        <p className="text-white/40 text-[clamp(0.85rem,2vw,1rem)] mb-8">
          {t("thermal.ctaText")}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-orange-500 hover:bg-orange-600
            rounded-full text-white text-[clamp(0.9rem,2vw,1.1rem)] font-medium tracking-wide
            transition-all duration-300 group"
        >
          <span>{t("thermal.ctaButton")}</span>
          <FaArrowRight className="text-sm group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
