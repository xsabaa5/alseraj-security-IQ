import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/home";
import About from "./pages/About";
import Services from "./pages/Services";
import ComingSoon from "./pages/ComingSoon";
import ContactUs from "./pages/ContactUs";
import ServiceDetail from "./pages/ServiceDetail";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const location = useLocation();
  const isComingSoon = location.pathname === "/coming-soon";
  const isContact = location.pathname === "/contact";
  const isServiceDetail = location.pathname.startsWith("/services/");

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-Montserrat">
      {!isComingSoon && !isContact && !isServiceDetail && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      {!isComingSoon && !isContact && !isServiceDetail && <Footer />}
    </div>
  );
}

export default App;
