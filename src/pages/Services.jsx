import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { GiDeliveryDrone } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi";
import { FaServer, FaRobot, FaShieldAlt } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rgba = (hex, a) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${a})`;
};

const services = [
  {
    icon: GiDeliveryDrone,
    key: "services.drone",
    slug: "drone",
    accent: "#3b82f6",
    image: "/drone .jpeg",
  },
  {
    icon: HiVideoCamera,
    key: "services.cameras",
    slug: "cameras",
    accent: "#e93d59",
    image: "/cctv cmaera.jpeg",
    imagePosition: "center 20%",
  },
  {
    icon: FaServer,
    key: "services.it",
    slug: "information-technology",
    accent: "#8b5cf6",
    image: "/IT.jpeg",
  },
  {
    icon: FaRobot,
    key: "services.robotics",
    slug: "mobile-robotics",
    accent: "#10b981",
    image: "/woopicx.com-3eaf022a-66a4-4fb8-8ba0-1d0b9e2efaf7.png.png",
  },
  {
    icon: FaShieldAlt,
    key: "services.cyber",
    slug: "cyber-security",
    accent: "#f59e0b",
    image: "/cyber .jpeg",
  },
];

/* eslint-disable no-unused-vars */
function ServiceCard({
  icon: Icon,
  title,
  slug,
  description,
  accent,
  featured,
  image,
  imagePosition,
}) {
  /* eslint-enable no-unused-vars */
  return (
    <Link
      to={`/services/${slug}`}
      className={`service-card group relative flex flex-col h-full rounded-3xl overflow-hidden
        cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-1.5
        ${featured ? "min-h-80 lg:min-h-95" : "min-h-70 lg:min-h-80"}
        border border-white/8 hover:border-white/15`}
    >
      {/* Background image — zooms on hover */}
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-[1.05]"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />

      {/* Gradient overlay — solid at bottom for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

      {/* Accent-tinted overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${rgba(accent, 0.15)}, transparent 50%)`,
        }}
      />

      {/* Hover shadow glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 16px 50px -12px ${rgba(accent, 0.3)}`,
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col h-full
          ${featured ? "p-8 lg:p-10" : "p-6 lg:p-8"}`}
      >
        {/* Arrow — top right */}
        <div className="self-end">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center
              bg-black/30 backdrop-blur-md border border-white/10
              group-hover:bg-white/10 group-hover:border-white/20
              transition-all duration-500"
          >
            <ArrowUpRight
              className="w-4 h-4 text-white/60 group-hover:text-white
                transition-colors duration-500"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Title + Description — anchored to bottom */}
        <div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center
              backdrop-blur-md mb-4 transition-all duration-500"
            style={{
              backgroundColor: rgba(accent, 0.2),
              border: `1px solid ${rgba(accent, 0.3)}`,
            }}
          >
            <Icon className="text-lg" style={{ color: accent }} />
          </div>

          <h3
            className={`text-white font-semibold tracking-[-0.02em] mb-1.5
              ${featured ? "text-[clamp(1.3rem,2.5vw,1.6rem)]" : "text-[clamp(1.1rem,2vw,1.3rem)]"}`}
          >
            {title}
          </h3>
          <p className="text-white/50 text-[clamp(0.8rem,1.5vw,0.88rem)] leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = gridRef.current?.querySelectorAll(".service-card");

    if (!section || !header || !cards?.length) return;

    const ctx = gsap.context(() => {
      const headerItems = header.querySelectorAll("[data-animate]");

      gsap.fromTo(
        headerItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="services"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center
       py-20 px-10 sm:px-45 md:px-10 lg:px-16 lg:py-32 bg-black relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-200 h-200 bg-[#e93d59]/1.5 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 text-center mb-14 lg:mb-20 max-w-2xl mx-auto"
      >
        {/* Badge */}
        <div data-animate className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              border border-[#e93d59]/25 bg-[#e93d59]/4"
          >
            <div className="w-1.5 h-1.5 bg-[#e93d59] rounded-full" />
            <span className="text-xs font-medium text-[#e93d59]/80 uppercase tracking-[0.2em]">
              {t("services.badge")}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2
          data-animate
          className="text-[clamp(2rem,5.5vw,3.5rem)] font-semibold text-white
            tracking-[-0.035em] leading-[1.1] mb-5"
        >
          {t("services.headline")}
        </h2>

        {/* Subtitle */}
        <p
          data-animate
          className="text-[#555] text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed"
        >
          {t("services.subtitle")}
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="relative z-10 w-full max-w-275
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3"
      >
        {services.map((service, index) => (
          <div
            key={service.slug}
            className={
              index < 2
                ? "lg:col-span-3"
                : index === 4
                  ? "md:col-span-2 lg:col-span-2"
                  : "lg:col-span-2"
            }
          >
            <ServiceCard
              icon={service.icon}
              title={t(`${service.key}.title`)}
              slug={service.slug}
              description={t(`${service.key}.description`)}
              accent={service.accent}
              featured={index < 2}
              image={service.image}
              imagePosition={service.imagePosition}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
