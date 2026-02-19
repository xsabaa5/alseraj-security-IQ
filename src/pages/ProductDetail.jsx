import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { X, ZoomIn } from "lucide-react";
import gsap from "gsap";

function cleanContentHtml(html) {
  if (!html) return "";

  let clean = html;

  // Remove SVG tags and their content
  clean = clean.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");

  // Remove Elementor wrapper divs and sections
  clean = clean.replace(/<div[^>]*>/gi, "");
  clean = clean.replace(/<\/div>/gi, "");
  clean = clean.replace(/<section[^>]*>/gi, "");
  clean = clean.replace(/<\/section>/gi, "");

  // Clean figure tags but keep inner content (images/videos inside)
  clean = clean.replace(/<\/?figure[^>]*>/gi, "");

  // Clean attributes but preserve src, alt, controls, preload on media
  clean = clean.replace(/\s+class="[^"]*"/gi, "");
  clean = clean.replace(/\s+data-[a-z_-]+="[^"]*"/gi, "");
  clean = clean.replace(/\s+style="[^"]*"/gi, "");
  clean = clean.replace(/\s+id="[^"]*"/gi, "");
  clean = clean.replace(/\s+role="[^"]*"/gi, "");
  clean = clean.replace(/\s+aria-[a-z-]+="[^"]*"/gi, "");
  clean = clean.replace(/\s+tabindex="[^"]*"/gi, "");
  clean = clean.replace(/\s+loading="[^"]*"/gi, "");
  clean = clean.replace(/\s+decoding="[^"]*"/gi, "");
  clean = clean.replace(/\s+fetchpriority="[^"]*"/gi, "");
  clean = clean.replace(/\s+srcset="[^"]*"/gi, "");
  clean = clean.replace(/\s+sizes="[^"]*"/gi, "");
  clean = clean.replace(/\s+controlsList="[^"]*"/gi, "");

  // Remove images without a valid src
  clean = clean.replace(/<img(?![^>]*\ssrc\s*=\s*"[^"]+")[^>]*>/gi, "");

  // Limit images to max 3
  let imgCount = 0;
  clean = clean.replace(/<img[^>]*>/gi, (match) => {
    imgCount++;
    return imgCount <= 3 ? match : "";
  });

  // Remove empty tags aggressively (multiple passes)
  for (let i = 0; i < 5; i++) {
    clean = clean.replace(/<(\w+)(\s[^>]*)?>(\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, "");
  }

  // Remove stray <br> sequences (3+ in a row)
  clean = clean.replace(/(<br\s*\/?\s*>[\s]*){3,}/gi, "<br>");

  // Remove excessive whitespace
  clean = clean.replace(/\n{3,}/g, "\n\n");
  clean = clean.trim();

  return clean;
}

// Inner-zoom component (like WooCommerce / gnss.ae)
function ProductImageZoom({ src, alt, onOpenLightbox, zoomHint }) {
  const containerRef = useRef(null);
  const [zooming, setZooming] = useState(false);
  const [bgPos, setBgPos] = useState("center");
  const ZOOM = 2.5;

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden bg-white aspect-square cursor-crosshair"
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      onMouseMove={handleMouseMove}
      onClick={onOpenLightbox}
    >
      {/* Normal image */}
      <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
        <img
          src={src}
          alt={alt}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            zooming ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Zoomed background (visible on hover) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          zooming ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${ZOOM * 100}%`,
          backgroundPosition: bgPos,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Zoom hint icon (bottom-right, fades out on hover) */}
      <div className={`absolute bottom-4 end-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full
        bg-black/60 backdrop-blur-sm transition-all duration-300
        ${zooming ? "opacity-0 scale-90" : "opacity-70 scale-100"}`}>
        <ZoomIn className="w-3.5 h-3.5 text-white" />
        <span className="text-[11px] text-white font-medium">{zoomHint}</span>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    fetch("/products/products-full.json")
      .then((r) => r.json())
      .then((products) => {
        const found = products.find((p) => p.slug === slug);
        if (found) {
          setProduct(found);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [slug]);

  // Animate on load
  useEffect(() => {
    if (!product || !heroRef.current) return;
    const els = heroRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
    );
  }, [product]);

  // Lightbox escape key + body lock
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Hide broken images and collapse their parent containers
  useEffect(() => {
    if (!contentRef.current) return;
    const imgs = contentRef.current.querySelectorAll("img");
    imgs.forEach((img) => {
      img.onerror = () => {
        img.remove();
      };
    });
  }, [product]);

  if (notFound) return <Navigate to="/products" replace />;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const category = product.categories?.[0];
  const brand = product.brands?.[0];
  const cleanHtml = cleanContentHtml(product.contentHtml);
  const imageSrc = `/products/${product.image.file.replace("images/", "")}`;

  // Check if cleaned content has meaningful text
  const hasContent = cleanHtml.replace(/<[^>]*>/g, "").trim().length > 20;

  return (
    <section className="w-full min-h-screen bg-black text-white">
      {/* Back + Breadcrumb */}
      <div className="pt-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-2.5 text-sm text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform duration-300" />
            <span>{t("products.allProducts")}</span>
          </Link>

          {category && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/40">
              <Link
                to="/products"
                className="hover:text-white/70 transition-colors"
              >
                {t("products.footerTitle")}
              </Link>
              <span>/</span>
              <span>{category.name}</span>
              <span>/</span>
              <span className="text-white/60 truncate max-w-50">
                {product.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hero: Image + Info */}
      <div
        ref={heroRef}
        className="px-6 sm:px-10 lg:px-16 py-12 lg:py-20 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image with inner zoom */}
          <div data-animate>
            <ProductImageZoom
              src={imageSrc}
              alt={product.title}
              onOpenLightbox={() => setLightboxOpen(true)}
              zoomHint={t("products.hoverToZoom")}
            />
          </div>

          {/* Product Info */}
          <div>
            {brand && (
              <span
                data-animate
                className="inline-block text-xs font-semibold tracking-[3px] uppercase text-[#e93d59] mb-4"
              >
                {brand.name}
              </span>
            )}

            <h1
              data-animate
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-tight mb-6"
            >
              {product.title}
            </h1>

            <p
              data-animate
              className="text-white/60 text-[clamp(0.9rem,1.5vw,1.05rem)] leading-relaxed mb-8"
            >
              {product.excerpt}
            </p>

            {category && (
              <div data-animate className="flex items-center gap-3 mb-8">
                <span className="text-xs font-medium tracking-wide uppercase text-white/30">
                  {t("products.category")}
                </span>
                <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-sm text-white/70">
                  {category.name}
                </span>
              </div>
            )}

            <Link
              data-animate
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#e93d59] hover:bg-[#d6324d]
                rounded-full text-white text-sm font-medium tracking-wide
                transition-all duration-300 group"
            >
              <span>{t("products.contactUs")}</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Content */}
      {hasContent && (
        <div className="px-6 sm:px-10 lg:px-16 pb-20 max-w-7xl mx-auto">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-white mb-10 tracking-tight border-b border-white/10 pb-6">
            {t("products.productDetails")}
          </h2>
          <div
            ref={contentRef}
            className="product-content product-content--dark"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </div>
      )}

      {/* CTA */}
      <div className="px-6 sm:px-10 lg:px-16 pb-20 max-w-3xl mx-auto text-center">
        <h3 className="text-[clamp(1.3rem,3vw,2rem)] font-medium mb-4">
          {t("products.interestedIn", { title: product.title })}
        </h3>
        <p className="text-white/40 text-[clamp(0.85rem,2vw,1rem)] mb-8">
          {t("products.ctaText")}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#e93d59] hover:bg-[#d6324d]
            rounded-full text-white text-[clamp(0.9rem,2vw,1.1rem)] font-medium tracking-wide
            transition-all duration-300 group"
        >
          <span>{t("products.contactUs")}</span>
          <FaArrowRight className="text-sm group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-xl flex items-center justify-center cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 end-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
              flex items-center justify-center text-white transition-colors cursor-pointer border-none z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={imageSrc}
            alt={product.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-default
              animate-[zoomIn_0.3s_ease-out]"
          />
        </div>
      )}
    </section>
  );
}
