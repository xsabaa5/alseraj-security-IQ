import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
  FaBell,
  FaUsers,
  FaLock,
  FaUserSecret,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaHandshake,
  FaHeadset,
  FaGlobe,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cyberVideo from "../assets/images/cyber-security.mp4";

gsap.registerPlugin(ScrollTrigger);

const benefitIcons = [
  FaBell,
  FaUsers,
  FaLock,
  FaUserSecret,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaHandshake,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
];

const partnerNames = [
  "Dragos",
  "Palo Alto Networks",
  "Google Cloud",
  "KPMG",
  "Cyware",
  "ArmorText",
  "HackNotice",
  "Recorded Future",
  "Verizon",
];

export default function CyberSecurity() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const servicesRef = useRef(null);
  const benefitsRef = useRef(null);
  const partnersRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = heroRef.current?.querySelectorAll("[data-animate]");
      if (heroEls?.length) {
        gsap.fromTo(
          heroEls,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out", delay: 0.3 },
        );
      }

      // Overview
      const overviewEls = overviewRef.current?.querySelectorAll("[data-animate]");
      if (overviewEls?.length) {
        gsap.fromTo(
          overviewEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: overviewRef.current, start: "top 75%", once: true },
          },
        );
      }

      // Services cards
      const serviceCards = servicesRef.current?.querySelectorAll(".service-card");
      if (serviceCards?.length) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: servicesRef.current, start: "top 75%", once: true },
          },
        );
      }

      // Benefits
      const benefitCards = benefitsRef.current?.querySelectorAll(".benefit-card");
      if (benefitCards?.length) {
        gsap.fromTo(
          benefitCards,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
            scrollTrigger: { trigger: benefitsRef.current, start: "top 80%", once: true },
          },
        );
      }

      // Partners
      const partnerEls = partnersRef.current?.querySelectorAll("[data-animate]");
      if (partnerEls?.length) {
        gsap.fromTo(
          partnerEls,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: partnersRef.current, start: "top 80%", once: true },
          },
        );
      }

      // Quote
      const quoteEls = quoteRef.current?.querySelectorAll("[data-animate]");
      if (quoteEls?.length) {
        gsap.fromTo(
          quoteEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: quoteRef.current, start: "top 80%", once: true },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const benefits = Array.from({ length: 10 }, (_, i) => ({
    icon: benefitIcons[i],
    title: t(`cyber.benefit${i + 1}Title`),
    desc: t(`cyber.benefit${i + 1}Desc`),
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

        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
          <source src={cyberVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent -15%, black 75%)" }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div data-animate className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-[#e93d59]/30 bg-[#e93d59]/10">
            <FaShieldAlt className="text-[#e93d59] text-sm" />
            <span className="text-[#e93d59] text-xs font-semibold tracking-[3px] uppercase">
              {t("cyber.badge")}
            </span>
          </div>
          <h1 data-animate className="text-[clamp(2.2rem,7vw,5rem)] font-bold leading-tight mb-6">
            {t("cyber.heroTitle")}
          </h1>
          <p data-animate className="text-white/60 text-[clamp(0.95rem,2vw,1.2rem)] leading-relaxed max-w-2xl mx-auto">
            {t("cyber.heroSubtitle")}
          </p>
        </div>
      </div>

      {/* ── Overview ── */}
      <div ref={overviewRef} className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28 max-w-5xl mx-auto text-center">
        <h2 data-animate className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-8">
          {t("cyber.overviewTitle")}
        </h2>
        <p data-animate className="text-white/55 text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed max-w-3xl mx-auto">
          {t("cyber.overviewText")}
        </p>
      </div>

      {/* ── Core Services ── */}
      <div ref={servicesRef} className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("cyber.servicesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="service-card group p-8 lg:p-10 rounded-2xl border border-white/10 bg-white/[0.02]
                hover:border-[#e93d59]/30 hover:bg-[#e93d59]/[0.03] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-[#e93d59]/10 border border-[#e93d59]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {i === 1 && <FaBell className="text-[#e93d59] text-xl" />}
                {i === 2 && <FaUsers className="text-[#e93d59] text-xl" />}
                {i === 3 && <FaHeadset className="text-[#e93d59] text-xl" />}
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {t(`cyber.service${i}Title`)}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t(`cyber.service${i}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Benefits ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-7xl mx-auto">
        <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-center mb-14">
          {t("cyber.benefitsTitle")}
        </h2>
        <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {benefits.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="benefit-card p-6 rounded-xl border border-white/8 bg-white/[0.02]
                hover:border-white/15 transition-all duration-300"
            >
              <Icon className="text-[#e93d59] text-lg mb-3" />
              <h4 className="text-white text-sm font-semibold mb-1.5">{title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Partners ── */}
      <div ref={partnersRef} className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-6xl mx-auto text-center">
        <h2 data-animate className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4">
          {t("cyber.partnersTitle")}
        </h2>
        <p data-animate className="text-white/40 text-[clamp(0.85rem,1.5vw,1rem)] mb-12">
          {t("cyber.partnersSubtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {partnerNames.map((name) => (
            <div
              key={name}
              data-animate
              className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.03]
                text-white/60 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div ref={quoteRef} className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28 max-w-4xl mx-auto">
        <div className="relative p-8 lg:p-12 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div data-animate className="absolute -top-4 start-8 text-[#e93d59] text-6xl font-serif leading-none">"</div>
          <blockquote data-animate className="text-white/70 text-[clamp(0.9rem,1.8vw,1.05rem)] leading-relaxed italic mb-6 pt-4">
            {t("cyber.quoteText")}
          </blockquote>
          <div data-animate className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e93d59]/15 border border-[#e93d59]/30 flex items-center justify-center">
              <FaUserSecret className="text-[#e93d59] text-sm" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{t("cyber.quoteName")}</p>
              <p className="text-white/40 text-xs">{t("cyber.quoteRole")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-6 sm:px-10 lg:px-16 pb-24 max-w-3xl mx-auto text-center">
        <h3 className="text-[clamp(1.3rem,3vw,2rem)] font-medium mb-4">
          {t("cyber.ctaTitle")}
        </h3>
        <p className="text-white/40 text-[clamp(0.85rem,2vw,1rem)] mb-8">
          {t("cyber.ctaText")}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#e93d59] hover:bg-[#d6324d]
            rounded-full text-white text-[clamp(0.9rem,2vw,1.1rem)] font-medium tracking-wide
            transition-all duration-300 group"
        >
          <span>{t("cyber.ctaButton")}</span>
          <FaArrowRight className="text-sm group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
