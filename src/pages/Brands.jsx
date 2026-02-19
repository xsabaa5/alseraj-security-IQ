import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const brands = [
  { name: "South", slug: "south", logo: "/brands/south.jpg" },
  { name: "CHCNAV", slug: "chcnav", logo: "/brands/chcnav-szi.jpg" },
  { name: "DJI", slug: "dji", logo: "/brands/dji.png" },
  { name: "Sentera", slug: "sentera", logo: "/brands/sentera.png" },
  { name: "UgCS", slug: "ugcs", logo: "/brands/ugcs.png" },
  { name: "XGRIDS", slug: "xgrids", logo: "/brands/xgrids.jpeg" },
  { name: "Pix4D", slug: "pix4d", logo: "/brands/pix4d.svg" },
  { name: "MicroSurvey", slug: "microsurvey-software-inc", logo: "/brands/microsurvey.png" },
  { name: "Yusense", slug: "ysense", logo: "/brands/yusense.png" },
  { name: "SENSYS", slug: "sensys", logo: "/brands/sensys.png" },
  { name: "Capturing Reality", slug: "capturing-reality", logo: "/brands/capturingreality.png" },
  { name: "GreenValley", slug: "greenvalley-international", logo: "/brands/greenvalley.jpg" },
  { name: "Agisoft", slug: "metashape", logo: "/brands/agisoft.png" },
  { name: "OFIL", slug: "ofil", logo: "/brands/ofil.png" },
  { name: "Share", slug: "share", logo: "/brands/share.png" },
  { name: "Soarability", slug: "soarability", logo: "/brands/soarability.png" },
  { name: "CHCNAV", slug: "chcnav", logo: "/brands/chcnav.webp" },
];

export default function Brands() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );

      const cards = gridRef.current?.querySelectorAll(".brand-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-black relative overflow-hidden"
    >
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-14 lg:mb-20">
          <p className="text-xs font-semibold tracking-[4px] uppercase text-[#e93d59] mb-3">
            Trusted Partners
          </p>
          <h2 className="text-[clamp(28px,5vw,44px)] font-bold text-white tracking-tight">
            Our Brands
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#e93d59] to-transparent" />
        </div>

        {/* Brands Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {brands.map((brand, i) => (
            <Link
              key={`${brand.name}-${i}`}
              to={`/products?brand=${brand.slug}`}
              className="brand-card group flex items-center justify-center
                rounded-xl border border-white/8 bg-white p-4 sm:p-5
                aspect-[3/2]
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                hover:border-white/20 hover:shadow-[0_8px_40px_rgba(233,61,89,0.06)]
                hover:-translate-y-0.5"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="max-w-full max-h-full object-contain
                  opacity-80 grayscale-[20%]
                  transition-all duration-500
                  group-hover:opacity-100 group-hover:grayscale-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
