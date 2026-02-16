import { useTranslation } from "react-i18next";

const solutions = [
  { image: "/1.avif", key: "solutions.security", span: 2 },
  { image: "/2.avif", key: "solutions.cyber", span: 1 },
  { image: "/3.avif", key: "solutions.software", span: 1 },
  { image: "/5.avif", key: "solutions.intelligent", span: 1 },
  { image: "/6.avif", key: "solutions.support", span: 1 },
];

function SolutionCard({ image, title, description, span }) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/8 hover:border-white/20 transition-colors duration-500 ease-in-out overflow-hidden ${
        span === 2 ? "col-span-1 sm:col-span-2" : "col-span-1"
      }`}
      style={{
        background: "#0a0a0e",
        minHeight: span === 2 ? "420px" : "460px",
      }}
    >
      {/* Background image */}
      <img
        src={image}
        alt=""
        className="absolute -top-16 inset-0 w-full h-full object-cover object-center group-hover:opacity-70 group-hover:scale-[1.03] transition-all ease-in-out duration-500"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-7">
        {/* Title */}
        <h3 className="text-[25px] font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="text-[14px] leading-relaxed text-white/50 mt-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Solutions() {
  const { t } = useTranslation();

  return (
    <section
      id="solutions"
      className="relative w-full flex flex-col items-center px-6 py-24 lg:px-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Header */}
      <h2 className="text-[clamp(28px,5vw,48px)] font-bold text-white text-center mb-14 tracking-tight">
        {t("solutions.badge")}
      </h2>

      {/* Bento grid */}
      <div className="w-full max-w-275 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            image={solution.image}
            span={solution.span}
            title={t(`${solution.key}.title`)}
            description={t(`${solution.key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}
