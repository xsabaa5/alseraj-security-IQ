import { useParams, Link, Navigate } from "react-router";
import { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi2";
import gsap from "gsap";
import "@google/model-viewer";
import { useTranslation } from "react-i18next";
import droneModel from "../assets/3D Assets/drone.glb";
import CctvCamera from "../components/CctvCamera";
import itVideo from "../assets/images/IT.mp4";
import cyberVideo from "../assets/images/cyber-security.mp4";
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
import { rotate } from "three/src/nodes/TSL.js";

const servicesIcons = {
  drone: {
    icon: GiDeliveryDrone,
    featureIcons: [
      FaCamera,
      FaWifi,
      FaMapMarkerAlt,
      FaShieldVirus,
      FaBatteryFull,
      FaThermometerHalf,
    ],
  },
  cameras: {
    icon: HiVideoCamera,
    featureIcons: [FaBrain, FaUserShield, FaMoon, FaSyncAlt, FaCloud, FaBell],
  },
  "information-technology": {
    icon: FaServer,
    featureIcons: [
      FaCloudUploadAlt,
      FaLaptopCode,
      FaNetworkWired,
      FaDatabase,
      FaCogs,
      FaHeadset,
    ],
  },
  "mobile-robotics": {
    icon: FaRobot,
    featureIcons: [
      FaRoute,
      FaSatellite,
      FaCrosshairs,
      FaGamepad,
      FaMountain,
      FaBroadcastTower,
    ],
  },
  "cyber-security": {
    icon: FaShieldAlt,
    featureIcons: [
      FaShieldVirus,
      FaUserSecret,
      FaClipboardCheck,
      FaFireAlt,
      FaLock,
      FaUsers,
    ],
  },
};

const validSlugs = [
  "drone",
  "cameras",
  "information-technology",
  "mobile-robotics",
  "cyber-security",
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const droneContainerRef = useRef(null);
  const droneModelRef = useRef(null);
  const isDrone = slug === "drone";
  const isCamera = slug === "cameras";
  const isIT = slug === "information-technology";
  const isCyber = slug === "cyber-security";

  useEffect(() => {
    if (!isDrone) return;

    const droneEl = droneModelRef.current;
    const containerEl = droneContainerRef.current;
    if (!droneEl || !containerEl) return;

    let targetOrbitX = 0;
    let targetOrbitY = 90;
    let currentOrbitX = 0;
    let currentOrbitY = 90;
    let animationId = null;

    function animateDroneRotation() {
      currentOrbitX += (targetOrbitX - currentOrbitX) * 0.05;
      currentOrbitY += (targetOrbitY - currentOrbitY) * 0.05;
      droneEl.cameraOrbit = `${currentOrbitX}deg ${currentOrbitY}deg 105%`;

      if (
        Math.abs(targetOrbitX - currentOrbitX) > 0.1 ||
        Math.abs(targetOrbitY - currentOrbitY) > 0.1
      ) {
        animationId = requestAnimationFrame(animateDroneRotation);
      } else {
        animationId = null;
      }
    }

    function handleMouseMove(e) {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      targetOrbitX = mouseX * -50;
      targetOrbitY = 90 - mouseY * 10;

      gsap.to(containerEl, {
        duration: 10,
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        ease: "power3.out",
        overwrite: "auto",
      });

      if (!animationId) {
        animationId = requestAnimationFrame(animateDroneRotation);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isDrone]);

  if (!validSlugs.includes(slug)) return <Navigate to="/" replace />;

  const serviceIcons = servicesIcons[slug];
  const MainIcon = serviceIcons.icon;
  const featureIcons = serviceIcons.featureIcons;

  const title = t(`serviceDetail.${slug}.title`);
  const tagline = t(`serviceDetail.${slug}.tagline`);
  const overview = t(`serviceDetail.${slug}.overview`);

  const features = [1, 2, 3, 4, 5, 6].map((i) => ({
    icon: featureIcons[i - 1],
    title: t(`serviceDetail.${slug}.feature${i}Title`),
    description: t(`serviceDetail.${slug}.feature${i}Desc`),
  }));

  const specs = [1, 2, 3, 4].map((i) => ({
    label: t(`serviceDetail.${slug}.spec${i}Label`),
    value: t(`serviceDetail.${slug}.spec${i}Value`),
  }));

  return (
    <section className="w-full min-h-screen bg-black text-white font-Montserrat">
      {/* Full-Screen Hero */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-8 left-8 z-10 inline-flex items-center gap-2 px-6 py-2.5 border border-[#e93d59] rounded-full
            text-[#e93d59] text-sm font-normal tracking-wide
            hover:text-white transition-all duration-300 group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t("serviceDetail.backToHome")}</span>
        </Link>

        {/* Drone 3D Model — only on drone page */}
        {isDrone && (
          <div
            ref={droneContainerRef}
            className="absolute w-full h-screen flex justify-center items-center pointer-events-none z-20"
          >
            <model-viewer
              ref={droneModelRef}
              src={droneModel}
              autoplay
              camera-controls
              camera-orbit="0deg 10deg 105%"
              interaction-prompt="none"
              style={{
                position: "absolute",
                top: "60%",
                right: "25%",
                width: "30vw",
                height: "100vh",
                transform: "translate(-50%, -50%)",
                zIndex: 999,
                pointerEvents: "none",
                background: "transparent",
              }}
            />
          </div>
        )}

        {/* Camera 3D Model — only on cameras page */}
        {isCamera && (
          <CctvCamera
            style={{
              position: "absolute",
              top: "20%",
              left: "70px",
              width: "15vw",
              height: "60vh",
              zIndex: 999,
              pointerEvents: "none",
            }}
          />
        )}

        {/* IT Video Background */}
        {isIT && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 top-1/2 left-[45%] scale-[2] md:scale-100 -translate-1/2  md:translate-none md:left-auto md:top-auto md:w-full md:h-full object-cover opacity-90"
          >
            <source src={itVideo} type="video/mp4" />
          </video>
        )}

        {/* Cyber Security Video Background */}
        {isCyber && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src={cyberVideo} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent -15%,black 75%)",
              }}
            />
          </>
        )}

        {!isDrone && !isCamera && !isIT && !isCyber && (
          <div
            className="w-28 h-28 rounded-full bg-[#e93d59]/15 border border-[#e93d59]/30
            flex items-center justify-center mb-10"
          >
            <MainIcon className="text-[#e93d59] text-5xl" />
          </div>
        )}
        <h1
          className="text-[clamp(3rem,10vw,7rem)] font-semibold
            text-white mb-6 text-center px-6 z-10 relative"
          style={
            isDrone || isCamera
              ? {
                  fontSize: "clamp(5rem, 15vw, 20rem)",
                  fontWeight: 700,
                  zIndex: 0,
                  position: "relative",
                }
              : {}
          }
        >
          {isDrone
            ? t("serviceDetail.droneTitle")
            : isCamera
              ? t("serviceDetail.cameraTitle")
              : title}
        </h1>
        {!isDrone && !isCamera && (
          <p className="text-white text-[clamp(1rem,2.5vw,1.35rem)] max-w-2xl mx-auto text-center px-6 z-10 relative">
            {tagline}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-12">
        {/* About This Service */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <div className="flex justify-center mb-8">
            <div
              className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] border border-[#e93d59]
                shadow-[0_4px_10px_rgba(56,46,62,0.284)] flex items-center gap-[clamp(6px,1.5vw,8px)]"
            >
              <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-[#e93d59] rounded-full"></div>
              <h2 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
                {t("serviceDetail.aboutService")}
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
            {t("serviceDetail.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line no-unused-vars */}
            {features.map(({ icon: Icon, title: fTitle, description }) => (
              <div
                key={fTitle}
                className="p-8 rounded-xl border border-[#e93d59]/20 bg-white/2
                  hover:border-[#e93d59]/40 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-5">
                  <Icon className="text-[#e93d59] text-3xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {fTitle}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-light italic text-center mb-14">
            {t("serviceDetail.techSpecs")}
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
            {t("serviceDetail.interested", { title })}
          </h3>
          <p className="text-gray-400 text-[clamp(0.85rem,2vw,1rem)] mb-8">
            {t("serviceDetail.ctaText")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#e93d59] hover:bg-[#d6324d]
              rounded-full text-white text-[clamp(0.9rem,2vw,1.1rem)] font-medium tracking-wide
              transition-all duration-300 group"
          >
            <span>{t("serviceDetail.contactUs")}</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
