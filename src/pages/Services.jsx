import { Link } from "react-router";
import { GiDeliveryDrone } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi";
import { FaServer, FaRobot, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const services = [
  {
    icon: GiDeliveryDrone,
    title: "Drone",
    slug: "drone",
    description: "Advanced aerial surveillance and monitoring systems",
  },
  {
    icon: HiVideoCamera,
    title: "Cameras",
    slug: "cameras",
    description: "Professional-grade camera systems with AI analytics",
  },
  {
    icon: FaServer,
    title: "Information Technology",
    slug: "information-technology",
    description: "Comprehensive IT infrastructure and software solutions",
  },
  {
    icon: FaRobot,
    title: "Mobile Robotics",
    slug: "mobile-robotics",
    description: "Autonomous mobile robots for security and inspection",
  },
  {
    icon: FaShieldAlt,
    title: "Cyber Security",
    slug: "cyber-security",
    description: "Advanced security services protecting digital assets",
  },
];

function ServiceCard({ icon: Icon, title, slug, description }) {
  return (
    <Link to={`/services/${slug}`} className="group relative bg-linear-to-br
      border border-red-500/20 rounded-2xl p-6 block
      hover:border-red-500/40 transition-all duration-300 cursor-pointer ">
      <div className="flex items-center gap-4 h-full lg:min-h-35">
        <div className="w-14 h-14 flex items-center justify-center rounded-full
          bg-red-950/60 border border-red-500/30 shrink-0">
          <Icon className="text-red-500 text-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <div className=" flex items-center justify-center w-8 h-8 rounded-full
          border border-red-500/30 group-hover:border-red-500/60
          group-hover:bg-red-500/10 transition-all duration-300 shrink-0 self-center">
          <FaArrowRight className="text-red-500 text-sm" />
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <div id="services" className="min-h-screen w-full flex flex-col items-center justify-center p-6 lg:p-20 bg-black">
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
       <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] border border-[#e93d59] shadow-[0_4px_10px_rgba(56,46,62,0.284)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
        <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-[#e93d59] rounded-full"></div>
        <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">

Our Products        </h1>
      </div>
      </div>

      {/* Services Grid */}
      <div className="w-full max-w-6xl flex flex-wrap justify-center gap-6">
        {services.map((service, index) => (
          <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <ServiceCard
              icon={service.icon}
              title={service.title}
              slug={service.slug}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
