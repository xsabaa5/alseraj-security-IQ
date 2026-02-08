import { FaShieldAlt, FaNetworkWired, FaBrain, FaHeadset } from "react-icons/fa";
import { IoCloudOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";

const solutions = [
  {
    icon: FaShieldAlt,
    title: "Security Solutions",
    description:
      "Advanced security systems and monitoring solutions designed to protect your assets and ensure complete safety.",
  },
  {
    icon: IoCloudOutline,
    title: "Cyber Security",
    description:
      "The practice of protecting systems, networks, programs, and data from digital attacks, theft, or damage.",
  },
  {
    icon: HiOutlineCodeBracket,
    title: "Software Development",
    description:
      "Custom software solutions tailored to your business needs, built with cutting-edge technologies.",
  },
  {
    icon: FaNetworkWired,
    title: "Network Infrastructure",
    description:
      "Robust network design and implementation to ensure reliable connectivity, scalability, and performance.",
  },
  {
    icon: FaBrain,
    title: "Intelligent Solutions",
    description:
      "Advanced technologies that collect and analyze data to support informed decision-making.",
  },
  {
    icon: FaHeadset,
    title: "Technical Support",
    description:
      "24/7 dedicated technical support and maintenance services for uninterrupted operations.",
  },
];

function SolutionCard({ icon: Icon, title, description }) {
  return (
    <div
      className="bg-linear-to-br from-red-950/20 to-black
      border border-red-500/20 rounded-2xl p-8
      hover:border-red-500/40 transition-all duration-300
      flex flex-col items-center text-center gap-4"
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full
        border border-red-500/30"
      >
        <Icon className="text-red-500 text-2xl" />
      </div>
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Solutions() {
  return (
    <section className="w-full flex flex-col items-center justify-center p-6 lg:p-20 bg-black">
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] border border-[#e93d59] shadow-[0_4px_10px_rgba(56,46,62,0.284)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
          <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-[#e93d59] rounded-full"></div>
          <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
            Our Solution
          </h1>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            icon={solution.icon}
            title={solution.title}
            description={solution.description}
          />
        ))}
      </div>
    </section>
  );
}
