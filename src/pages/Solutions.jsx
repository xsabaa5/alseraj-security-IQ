import {
  FaShieldAlt,
  FaNetworkWired,
  FaBrain,
  FaHeadset,
} from "react-icons/fa";
import { IoCloudOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const solutions = [
  { icon: FaShieldAlt, key: "solutions.security" },
  { icon: IoCloudOutline, key: "solutions.cyber" },
  { icon: HiOutlineCodeBracket, key: "solutions.software" },
  { icon: FaNetworkWired, key: "solutions.network" },
  { icon: FaBrain, key: "solutions.intelligent" },
  { icon: FaHeadset, key: "solutions.support" },
];

// eslint-disable-next-line no-unused-vars
function SolutionCard({ icon: Icon, title }) {
  return (
    <div className="group relative rounded-[20px] p-px cursor-default overflow-hidden">
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{
          background:
            "linear-gradient(160deg, rgba(233,61,89,0.5), transparent 40%, transparent 60%, rgba(233,61,89,0.3))",
        }}
      />
      {/* Static subtle border */}
      <div className="absolute inset-0 rounded-[20px] border border-white/8 group-hover:border-transparent transition-colors duration-500" />

      {/* Card inner */}
      <div
        className="relative rounded-[20px] h-full flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(160deg, rgba(20,20,30,0.9) 0%, rgba(10,10,18,0.95) 100%)" }}
      >
        {/* Title area */}
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-[clamp(16px,2vw,20px)] font-semibold text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
            {title}
          </h3>
        </div>

        {/* Icon scene */}
        <div className="flex-1 flex items-center justify-center px-6 pb-8 pt-4">
          <div className="relative flex flex-col items-center">
            {/* Icon glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
              style={{ background: "rgba(233,61,89,0.25)" }}
            />

            {/* Main icon */}
            <div className="relative z-10 mb-6">
              <Icon className="text-[clamp(36px,5vw,48px)] text-white/60 group-hover:text-[#e93d59] transition-colors duration-500 drop-shadow-[0_0_20px_rgba(233,61,89,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(233,61,89,0.4)]" />
            </div>

            {/* 3D Platform */}
            <div className="relative" style={{ perspective: "400px" }}>
              {/* Platform top face */}
              <div
                className="w-28 h-14 border border-[#e93d59]/20 group-hover:border-[#e93d59]/50 transition-colors duration-500"
                style={{
                  transform: "rotateX(55deg)",
                  background: "linear-gradient(180deg, rgba(233,61,89,0.08) 0%, rgba(233,61,89,0.02) 100%)",
                  boxShadow: "0 0 20px rgba(233,61,89,0.1), inset 0 0 15px rgba(233,61,89,0.05)",
                }}
              />
              {/* Platform edge glow */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "rgba(233,61,89,0.6)",
                  boxShadow: "0 0 12px 4px rgba(233,61,89,0.3)",
                }}
              />
              {/* Platform reflection glow */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-md opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                style={{ background: "rgba(233,61,89,0.5)" }}
              />
            </div>

            {/* Decorative dots */}
            <div className="flex gap-1 mt-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Solutions() {
  const { t } = useTranslation();

  return (
    <section
      id="solutions"
      className="relative w-full flex flex-col items-center justify-center px-6 py-24 lg:px-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(233,61,89,1) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-16">
        <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] shadow-[10px_0_50px_rgba(100,46,62,0.8)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
          <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-red-600/25 rounded-full"></div>
          <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
            {t("solutions.badge")}
          </h1>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            icon={solution.icon}
            title={t(`${solution.key}.title`)}
            description={t(`${solution.key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}
