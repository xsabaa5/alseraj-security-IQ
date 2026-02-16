import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { GiDeliveryDrone } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi";
import { FaServer, FaRobot, FaShieldAlt } from "react-icons/fa";

const navLinks = [
  { key: "nav.home", hash: "home" },
  { key: "nav.about", hash: "about" },
  { key: "nav.services", hash: "services", hasDropdown: true },
  { key: "nav.solution", hash: "solutions" },
  { key: "nav.contactUs", to: "/contact" },
];

const products = [
  { icon: GiDeliveryDrone, titleKey: "services.drone.title", descKey: "services.drone.description", slug: "drone" },
  { icon: HiVideoCamera, titleKey: "services.cameras.title", descKey: "services.cameras.description", slug: "cameras" },
  { icon: FaServer, titleKey: "services.it.title", descKey: "services.it.description", slug: "information-technology" },
  { icon: FaRobot, titleKey: "services.robotics.title", descKey: "services.robotics.description", slug: "mobile-robotics" },
  { icon: FaShieldAlt, titleKey: "services.cyber.title", descKey: "services.cyber.description", slug: "cyber-security" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle hash scrolling when arriving from another page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, [location]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleNavClick = (link) => {
    setMenuOpen(false);
    setMobileProductsOpen(false);

    if (link.to) {
      navigate(link.to);
      return;
    }

    if (location.pathname === "/") {
      const el = document.getElementById(link.hash);
      if (el) el.scrollIntoView({ behavior: "instant" });
    } else {
      navigate("/#" + link.hash);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-1000 flex items-center justify-between px-4 py-3 transition-all duration-300 sm:px-10 sm:py-4 ${
          menuOpen
            ? "border-b border-transparent bg-transparent"
            : "border-b border-white/6 bg-[rgba(10,10,15,0.2)] backdrop-blur-[20px]"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="relative z-1001 flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Al Seraj Company Logo"
            className="h-auto w-30"
          />
        </Link>

        {/* Desktop Nav Links - Centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex font-medium">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li
                key={link.key}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => handleNavClick(link)}
                  className="rounded-md px-3.5 py-2 text-sm text-white/60 transition-all duration-300 hover:text-white cursor-pointer bg-transparent border-none flex items-center gap-1"
                >
                  {t(link.key)}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desktop Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                    dropdownOpen
                      ? "visible opacity-100 translate-y-0"
                      : "invisible opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="w-80 rounded-xl border border-white/10 bg-black p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        to={`/services/${product.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-white/8 group"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/10">
                          <product.icon className="text-base text-white/50 group-hover:text-white/90 transition-colors duration-200" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors duration-200">
                            {t(product.titleKey)}
                          </p>
                          <p className="text-[11px] text-white/35 truncate group-hover:text-white/50 transition-colors duration-200">
                            {t(product.descKey)}
                          </p>
                        </div>
                      </Link>
                    ))}

                    {/* View All */}
                    <div className="mt-1 border-t border-white/8 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleNavClick({ hash: "services" });
                        }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/70 cursor-pointer bg-transparent border-none"
                      >
                        {t("nav.viewAll")}
                        <svg className="w-3 h-3 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.key}>
                <button
                  onClick={() => handleNavClick(link)}
                  className="rounded-md px-3.5 py-2 text-sm text-white/60 transition-all duration-300 hover:text-white cursor-pointer bg-transparent border-none"
                >
                  {t(link.key)}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Desktop Right Side: Language Toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center  gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[13px] text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/10 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z"
              />
            </svg>
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>
          <Link
            to="/coming-soon"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4.5 py-2.5 text-[13px] text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            {t("nav.onlineStore")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-1001 block h-10 w-10 cursor-pointer border-none bg-transparent p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className="absolute left-1/2 block h-px w-4.25 bg-white transition-all duration-300"
            style={{
              top: menuOpen ? 19 : 14,
              transform: `translateX(-50%) ${menuOpen ? "rotate(45deg)" : "rotate(0)"}`,
            }}
          />
          <span
            className="absolute left-1/2 block h-px w-4.25 bg-white transition-all duration-300"
            style={{
              top: menuOpen ? 19 : 20,
              transform: `translateX(-50%) ${menuOpen ? "rotate(-45deg)" : "rotate(0)"}`,
            }}
          />
        </button>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-999 flex flex-col items-center justify-center bg-black/97 backdrop-blur-2xl transition-all duration-400 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {navLinks.map((link, i) =>
          link.hasDropdown ? (
            <div key={link.key} className="flex flex-col items-center">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`px-10 py-4 text-[clamp(20px,5vw,28px)] font-extralight text-white transition-all duration-400 hover:text-white/50 cursor-pointer bg-transparent border-none flex items-center gap-2 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : "0s",
                }}
              >
                {t(link.key)}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile Products Expandable */}
              <div
                className={`flex flex-col items-center overflow-hidden transition-all duration-400 ${
                  mobileProductsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {products.map((product, j) => (
                  <Link
                    key={product.slug}
                    to={`/services/${product.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-8 py-2.5 transition-all duration-300 hover:text-white/50 ${
                      mobileProductsOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{
                      transitionDelay: mobileProductsOpen ? `${j * 0.05}s` : "0s",
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <product.icon className="text-sm text-white/50" />
                    </div>
                    <span className="text-[clamp(14px,3.5vw,18px)] font-extralight text-white/70">
                      {t(product.titleKey)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <button
              key={link.key}
              onClick={() => handleNavClick(link)}
              className={`px-10 py-4 text-[clamp(20px,5vw,28px)] font-extralight text-white transition-all duration-400 hover:text-white/50 cursor-pointer bg-transparent border-none ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : "0s",
              }}
            >
              {t(link.key)}
            </button>
          )
        )}

        {/* Divider */}
        <div
          className={`mb-2 mt-6 h-px w-10 bg-white/15 transition-opacity duration-400 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "0.3s" : "0s" }}
        />

        {/* Mobile Language Toggle */}
        <button
          onClick={toggleLanguage}
          className={`mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-3 text-[15px] text-white/90 transition-all duration-400 hover:bg-white/10 cursor-pointer ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "0.32s" : "0s" }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z"
            />
          </svg>
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>

        {/* Mobile CTA */}
        <Link
          to="/coming-soon"
          onClick={() => setMenuOpen(false)}
          className={`mt-4 rounded-full border border-white/10 bg-white/6 px-7 py-3.5 text-[15px] text-white/90 transition-all duration-400 hover:bg-white/10 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "0.35s" : "0s" }}
        >
          {t("nav.onlineStore")}
        </Link>
      </div>
    </>
  );
}
