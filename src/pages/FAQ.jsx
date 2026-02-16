import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqKeys = ["1", "2", "3", "4", "5", "6"];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`faq-item border rounded-xl transition-all duration-300 ${
        isOpen
          ? "border-[#e93d59]/40 bg-linear-to-br from-red-950/15 to-transparent"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer"
      >
        <span className="text-white text-left text-[clamp(14px,2vw,17px)] font-medium pr-4">
          {question}
        </span>
        <div
          className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-[#e93d59] bg-[#e93d59]/10 rotate-45"
              : "border-white/20"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300"
          >
            <path
              d="M7 1v12M1 7h12"
              stroke={isOpen ? "#e93d59" : "#ffffff80"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const items = listRef.current?.querySelectorAll(".faq-item");

    if (!section || !header || !items?.length) return;

    const ctx = gsap.context(() => {
      const headerItems = header.querySelectorAll("[data-animate]");

      gsap.fromTo(
        headerItems,
        { opacity: 0, y: 5 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.3,

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 5, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.03,
          duration: 0.4,

          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center p-6 lg:p-20 bg-black"
    >
      {/* Title */}
      <div ref={headerRef}>
        <h2
          data-animate
          className="text-[clamp(28px,5vw,48px)] font-bold text-white text-center mb-14 tracking-tight"
        >
          {t("faq.title")}
        </h2>
      </div>

      {/* FAQ List */}
      <div ref={listRef} className="w-full max-w-3xl flex flex-col gap-4">
        {faqKeys.map((key, index) => (
          <FAQItem
            key={key}
            question={t(`faq.q${key}`)}
            answer={t(`faq.a${key}`)}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
