import { useParams, Link, Navigate } from "react-router";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi2";
import {
  FaServer,
  FaRobot,
  FaShieldAlt,
  FaCamera,
  FaWifi,
  FaMapMarkerAlt,
  FaShieldVirus,
  FaBatteryFull,
  FaThermometerHalf,
  FaBrain,
  FaUserShield,
  FaMoon,
  FaSyncAlt,
  FaCloud,
  FaBell,
  FaCloudUploadAlt,
  FaLaptopCode,
  FaNetworkWired,
  FaDatabase,
  FaCogs,
  FaHeadset,
  FaRoute,
  FaSatellite,
  FaGamepad,
  FaMountain,
  FaBroadcastTower,
  FaCrosshairs,
  FaUserSecret,
  FaClipboardCheck,
  FaFireAlt,
  FaLock,
  FaUsers,
} from "react-icons/fa";

const servicesData = {
  drone: {
    icon: GiDeliveryDrone,
    title: "Drone Solutions",
    tagline: "Advanced aerial technology for modern challenges",
    overview:
      "Advanced aerial surveillance and monitoring systems equipped with cutting-edge technology for security, reconnaissance, and data collection operations. Our drone solutions provide comprehensive aerial coverage for various industries including security, agriculture, construction, infrastructure inspection and oil sector.",
    features: [
      {
        icon: FaCamera,
        title: "4K Ultra HD Camera",
        description: "Crystal clear video capture with professional-grade imaging",
      },
      {
        icon: FaWifi,
        title: "Real-time Streaming",
        description: "Live video transmission with minimal latency",
      },
      {
        icon: FaMapMarkerAlt,
        title: "GPS Navigation",
        description: "Precise waypoint planning and autonomous flight paths",
      },
      {
        icon: FaShieldVirus,
        title: "Obstacle Avoidance",
        description: "Advanced sensors for safe autonomous operation",
      },
      {
        icon: FaBatteryFull,
        title: "Long Flight Duration",
        description: "45 to 80 minutes of continuous flight time",
      },
      {
        icon: FaThermometerHalf,
        title: "Thermal Imaging",
        description: "Infrared capability for night operations",
      },
    ],
    specs: [
      { label: "FLIGHT TIME", value: "45-80 min" },
      { label: "RANGE", value: "15 km" },
      { label: "CAMERA", value: "4K Ultra HD" },
      { label: "PAYLOAD", value: "Up to 5 kg" },
    ],
  },
  cameras: {
    icon: HiVideoCamera,
    title: "Camera Systems",
    tagline: "Professional-grade surveillance with AI-powered analytics",
    overview:
      "Professional-grade surveillance camera systems with advanced AI-powered analytics, facial recognition, and 24/7 monitoring capabilities for comprehensive security coverage. Our camera solutions integrate seamlessly with any infrastructure while providing cutting-edge technology for maximum protection.",
    features: [
      {
        icon: FaBrain,
        title: "AI Object Detection",
        description: "Intelligent recognition of people, vehicles, and objects",
      },
      {
        icon: FaUserShield,
        title: "Facial Recognition",
        description: "Advanced biometric identification technology",
      },
      {
        icon: FaMoon,
        title: "Night Vision",
        description: "Infrared technology for 24/7 monitoring",
      },
      {
        icon: FaSyncAlt,
        title: "360° Pan-Tilt-Zoom",
        description: "Complete coverage with motorized movement",
      },
      {
        icon: FaCloud,
        title: "Cloud Storage",
        description: "Secure cloud integration for footage backup",
      },
      {
        icon: FaBell,
        title: "Motion Alerts",
        description: "Instant notifications for detected activity",
      },
    ],
    specs: [
      { label: "RESOLUTION", value: "4K Ultra HD" },
      { label: "STORAGE", value: "Cloud + Local" },
      { label: "FIELD OF VIEW", value: "360°" },
      { label: "NIGHT VISION", value: "Up to 50m" },
    ],
  },
  "information-technology": {
    icon: FaServer,
    title: "Information Technology",
    tagline: "Comprehensive IT infrastructure and software solutions",
    overview:
      "Comprehensive IT infrastructure and software solutions including network security, cloud computing, system integration, and enterprise application development for modern businesses. We help organizations leverage technology to improve efficiency, security, and competitive advantage in today's digital landscape.",
    features: [
      {
        icon: FaCloudUploadAlt,
        title: "Cloud Infrastructure",
        description: "Scalable cloud solutions for modern businesses",
      },
      {
        icon: FaLaptopCode,
        title: "Software Development",
        description: "Custom enterprise application development",
      },
      {
        icon: FaNetworkWired,
        title: "Network Architecture",
        description: "Robust and secure network design",
      },
      {
        icon: FaDatabase,
        title: "Database Management",
        description: "Efficient data storage and retrieval systems",
      },
      {
        icon: FaCogs,
        title: "System Integration",
        description: "Seamless connectivity between platforms",
      },
      {
        icon: FaHeadset,
        title: "24/7 Support",
        description: "Round-the-clock technical assistance",
      },
    ],
    specs: [
      { label: "DEPLOYMENT", value: "Cloud/On-Premise" },
      { label: "SCALABILITY", value: "Enterprise-Grade" },
      { label: "SUPPORT", value: "24/7" },
      { label: "UPTIME", value: "99.9%" },
    ],
  },
  "mobile-robotics": {
    icon: FaRobot,
    title: "Mobile Robotics",
    tagline: "Autonomous robots for security, inspection, and beyond",
    overview:
      "Autonomous mobile robots designed for security patrols, inspection tasks, and hazardous environment operations with advanced navigation and sensing capabilities. Our robotic solutions provide reliable, tireless monitoring and can operate in environments too dangerous or inaccessible for humans.",
    features: [
      {
        icon: FaRoute,
        title: "Autonomous Navigation",
        description: "Self-guided movement with intelligent path planning",
      },
      {
        icon: FaSatellite,
        title: "360° Sensing",
        description: "Complete environmental awareness with multiple sensors",
      },
      {
        icon: FaCrosshairs,
        title: "Obstacle Avoidance AI",
        description: "Intelligent detection and navigation around obstacles",
      },
      {
        icon: FaGamepad,
        title: "Remote Control",
        description: "Manual override capability when needed",
      },
      {
        icon: FaMountain,
        title: "Multi-Terrain",
        description: "Operation across various surface conditions",
      },
      {
        icon: FaBroadcastTower,
        title: "Real-time Data",
        description: "Continuous transmission of sensor information",
      },
    ],
    specs: [
      { label: "BATTERY LIFE", value: "8-12 hrs" },
      { label: "NAVIGATION", value: "LiDAR + GPS" },
      { label: "TERRAIN", value: "Multi-Surface" },
      { label: "CONTROL", value: "Auto + Manual" },
    ],
  },
  "cyber-security": {
    icon: FaShieldAlt,
    title: "Cyber Security",
    tagline: "Protecting your digital assets from evolving threats",
    overview:
      "Advanced cybersecurity services protecting your digital assets with threat detection, vulnerability assessment, penetration testing, and comprehensive security audits. Our team of security experts provides multi-layered protection strategies to safeguard your organization against evolving cyber threats.",
    features: [
      {
        icon: FaShieldVirus,
        title: "Threat Detection",
        description: "Real-time monitoring and threat identification",
      },
      {
        icon: FaUserSecret,
        title: "Penetration Testing",
        description: "Comprehensive security vulnerability assessment",
      },
      {
        icon: FaClipboardCheck,
        title: "Security Audits",
        description: "Thorough compliance and security reviews",
      },
      {
        icon: FaFireAlt,
        title: "Firewall Protection",
        description: "Advanced intrusion detection and prevention",
      },
      {
        icon: FaLock,
        title: "Data Encryption",
        description: "End-to-end encryption for sensitive data",
      },
      {
        icon: FaUsers,
        title: "Incident Response",
        description: "Rapid response team for security breaches",
      },
    ],
    specs: [
      { label: "PROTECTION", value: "Multi-layered" },
      { label: "RESPONSE TIME", value: "15 min" },
      { label: "COMPLIANCE", value: "ISO 27001" },
      { label: "COVERAGE", value: "24/7" },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData[slug];

  if (!service) return <Navigate to="/" replace />;

  const { icon: MainIcon, title, tagline, overview, features, specs } = service;

  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-12 font-Montserrat">
      {/* Back to Home */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#e93d59] rounded-full
          text-[#e93d59] text-sm font-normal tracking-wide
          hover:bg-[#e93d59] hover:text-white transition-all duration-300 group mb-16"
      >
        <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Home</span>
      </Link>

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <div
          className="w-24 h-24 rounded-full bg-[#e93d59]/15 border border-[#e93d59]/30
          flex items-center justify-center mx-auto mb-8"
        >
          <MainIcon className="text-[#e93d59] text-4xl" />
        </div>
        <h1
          className="text-[clamp(2.5rem,7vw,4.5rem)] font-light
            bg-linear-to-r from-[#e93d59] to-[#e93d59]/70 bg-clip-text text-transparent mb-5"
        >
          {title}
        </h1>
        <p className="text-gray-400 text-[clamp(1rem,2.5vw,1.25rem)] max-w-2xl mx-auto">
          {tagline}
        </p>
      </div>

      {/* About This Service */}
      <div className="max-w-4xl mx-auto mb-24 text-center">
        <div className="flex justify-center mb-8">
          <div
            className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] border border-[#e93d59]
              shadow-[0_4px_10px_rgba(56,46,62,0.284)] flex items-center gap-[clamp(6px,1.5vw,8px)]"
          >
            <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-[#e93d59] rounded-full"></div>
            <h2 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
              About This Service
            </h2>
          </div>
        </div>
        <p className="text-gray-300 text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed max-w-3xl mx-auto">
          {overview}
        </p>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-light italic text-center mb-14">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title: fTitle, description }) => (
            <div
              key={fTitle}
              className="p-8 rounded-xl border border-[#e93d59]/20 bg-white/2
                hover:border-[#e93d59]/40 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-5">
                <Icon className="text-[#e93d59] text-3xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{fTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-light italic text-center mb-14">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {specs.map(({ label, value }) => (
            <div
              key={label}
              className="p-6 rounded-xl border border-[#e93d59]/20 bg-white/2 text-center"
            >
              <p className="text-[#e93d59] text-xs font-semibold tracking-[2px] uppercase mb-3">
                {label}
              </p>
              <p className="text-white text-xl font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        <h3 className="text-[clamp(1.3rem,3vw,2rem)] font-medium mb-4">
          Interested in our {title}?
        </h3>
        <p className="text-gray-400 text-[clamp(0.85rem,2vw,1rem)] mb-8">
          Get in touch with our team to discuss how we can help your organization.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#e93d59] hover:bg-[#d6324d]
            rounded-full text-white text-[clamp(0.9rem,2vw,1.1rem)] font-medium tracking-wide
            transition-all duration-300 group"
        >
          <span>Contact Us</span>
          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
