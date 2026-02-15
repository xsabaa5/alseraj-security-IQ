import { useState } from "react";
import { useTranslation } from "react-i18next";

const faqKeys = ["1", "2", "3", "4", "5", "6"];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
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

  return (
    <section className="w-full flex flex-col items-center justify-center p-6 lg:p-20 bg-black">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] shadow-[10px_0_50px_rgba(100,46,62,0.8)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
          <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-red-600/25 rounded-full"></div>
          <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
            {t("faq.badge")}
          </h1>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-white text-[clamp(1.5rem,4vw,2.5rem)] font-thin mb-12 text-center">
        {t("faq.title")}
      </h2>

      {/* FAQ List */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
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
