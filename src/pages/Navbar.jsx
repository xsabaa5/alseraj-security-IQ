import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "nav.home", hash: "home" },
  { key: "nav.about", hash: "about" },
  { key: "nav.services", hash: "services" },
  { key: "nav.solution", hash: "solutions" },
  { key: "nav.contactUs", to: "/contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleNavClick = (link) => {
    setMenuOpen(false);

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
          {navLinks.map((link) => (
            <li key={link.key}>
              <button
                onClick={() => handleNavClick(link)}
                className="rounded-md px-3.5 py-2 text-sm text-white/60 transition-all duration-300 hover:text-white cursor-pointer bg-transparent border-none"
              >
                {t(link.key)}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side: Language Toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[13px] text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z" />
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
        {navLinks.map((link, i) => (
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
        ))}

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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z" />
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
