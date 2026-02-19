import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const productLinks = [
  { label: "Drones (UAVs)", to: "/products?category=drones" },
  { label: "Payloads & Sensors", to: "/products?category=payloads-sensors" },
  { label: "GNSS", to: "/products?category=gnss" },
  { label: "Marine Surveying", to: "/products?category=marine-surveying" },
  { label: "Software", to: "/products?category=software" },
];

const companyLinks = [
  { key: "footer.aboutUs", to: "/coming-soon" },
  { key: "footer.contact", to: "/contact" },
  { key: "footer.careers", to: "/coming-soon" },
  { key: "footer.privacy", to: "/coming-soon" },
  { key: "footer.terms", to: "/coming-soon" },
];

const socials = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/34934372/admin/feed/posts/" },
  { icon: FaYoutube, href: "https://www.youtube.com/@alserajcompany2735" },
  { icon: FaFacebookF, href: "https://www.facebook.com/Alseraj.almodeeh/" },
  { icon: FaInstagram, href: "https://www.instagram.com/alseraj.co/" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@alseraj.almodeeh?_t=8ocPGrrxWwk&_r=1" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const children = el.querySelectorAll(".footer-animate");

    gsap.set(children, { opacity: 0, y: 40 });

    const anim = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="footer-animate">
            <Link to="#home">
              <img
                src="/box-logo.png"
                alt="Al Seraj Company Logo"
                className="h-10 w-auto mb-5"
              />
            </Link>
            <p className="text-gray-500 text-sm mb-8">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                    text-gray-400 hover:text-[#e93d59] hover:border-[#e93d59]/40
                    transition-all duration-300"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="flex gap-20 footer-animate">
            {/* Products */}
            <div>
              <h3 className="text-[#e93d59] text-sm font-medium mb-5">
                Products
              </h3>
              <ul className="space-y-3">
                {productLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[#e93d59] text-sm font-medium mb-5">
                {t("footer.company")}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map(({ key, to }) => (
                  <li key={key}>
                    <Link
                      to={to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    >
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-6 footer-animate" />

        {/* Bottom */}
        <p className="text-gray-300 text-s footer-animate">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
