import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  {
    slug: "dji-mavic-3-thermal-advanced-mavic-3ta",
    title: "DJI Mavic 3 Thermal Advanced / Mavic 3TA",
    image: "/products/dji-mavic-3-thermal-advanced-mavic-3ta.jpg",
  },
  {
    slug: "dji-matrice-400",
    title: "DJI Matrice 400",
    image: "/products/dji-matrice-400.jpg",
  },
  {
    slug: "dji-matrice-4td-for-dock-3",
    title: "DJI Matrice 4TD for Dock 3",
    image: "/products/dji-matrice-4td-for-dock-3.webp",
  },
  {
    slug: "dji-zenmuse-l3",
    title: "DJI Zenmuse L3 | DJI L3 Lidar",
    image: "/products/dji-zenmuse-l3.png",
  },
  {
    slug: "dji-dock-3",
    title: "DJI Dock 3",
    image: "/products/dji-dock-3.jpg",
  },
  {
    slug: "c120-tethered-cleaning-system-cleaning",
    title: "C120 Tethered Cleaning System Cleaning",
    image: "/products/c120-tethered-cleaning-system-cleaning.webp",
  },
  {
    slug: "sniffer4d-nano2-gas-detection-system",
    title: "Sniffer4D Nano2 Gas Detection System",
    image: "/products/sniffer4d-nano2-gas-detection-system.jpg",
  },
  {
    slug: "dji-matrice-4d-for-dock-3",
    title: "DJI Matrice 4D for Dock 3",
    image: "/products/dji-matrice-4d-for-dock-3.webp",
  },
  {
    slug: "dji-mavic-3-multispectral",
    title: "DJI Mavic 3 Multispectral",
    image: "/products/dji-mavic-3-multispectral.jpg",
  },
  {
    slug: "dji-matrice-350-rtk-thermal-combo",
    title: "DJI Matrice 350 RTK Thermal Combo",
    image: "/products/dji-matrice-350-rtk-thermal-combo.jpg",
  },
  {
    slug: "dji-mavic-3-enterprise",
    title: "DJI Mavic 3 Enterprise",
    image: "/products/dji-mavic-3-enterprise.jpg",
  },
  {
    slug: "dji-matrice-30-t-dji-m30t",
    title: "DJI Matrice 30 T | DJI M30T",
    image: "/products/dji-matrice-30-t-dji-m30t.png",
  },
  {
    slug: "dji-h20t-thermal-camera",
    title: "DJI Zenmuse H20T Thermal Camera",
    image: "/products/dji-h20t-thermal-camera.webp",
  },
  {
    slug: "dji-mavic-3-enterprise-survey-kit",
    title: "DJI Mavic 3 Enterprise Survey Kit",
    image: "/products/dji-mavic-3-enterprise-survey-kit.png",
  },
  {
    slug: "dji-flycart-100",
    title: "DJI FlyCart 100",
    image: "/products/dji-flycart-100.jpg",
  },
];

function ProductCard({ title, slug, image }) {
  return (
    <Link
      to={`/products/${slug}`}
      className="product-card group flex flex-col items-center rounded-2xl overflow-hidden
        cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-1.5 bg-white hover:shadow-lg"
    >
      <div className="w-full aspect-square flex items-center justify-center p-6">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-w-full max-h-full object-contain
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]"
        />
      </div>
      <div className="w-full px-4 pb-5 pt-1 text-center">
        <h3 className="text-[#1d1d1f] text-sm font-medium leading-snug">
          {title}
        </h3>
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
    const cards = gridRef.current?.querySelectorAll(".product-card");

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
        className="relative z-10 text-center mb-14 lg:mb-20 max-w-5xl mx-auto"
      >
        <h2
          data-animate
          className="text-[clamp(28px,5vw,48px)] font-bold text-white text-center tracking-tight"
        >
          {t("services.headline")}
        </h2>
        <p
          data-animate
          className="text-[#555] text-[clamp(1rem,2vw,1.5rem)] leading-relaxed"
        >
          {t("services.subtitle")}
        </p>
      </div>

      {/* Product Grid */}
      <div
        ref={gridRef}
        className="relative z-10 w-full max-w-275
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            slug={product.slug}
            title={product.title}
            image={product.image}
          />
        ))}
      </div>

      {/* More Products Button */}
      <Link
        to="/products"
        data-animate
        className="relative z-10 mt-12 inline-flex items-center gap-2 rounded-full border border-white/15
          bg-white/5 px-8 py-3.5 text-sm font-medium text-white/80
          transition-all duration-500 hover:bg-white/10 hover:border-white/25 hover:text-white group"
      >
        More Products
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
