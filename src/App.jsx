import { useEffect, useRef, useState, startTransition } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import CyberSecurity from "./pages/CyberSecurity";
import ThermalCamera from "./pages/ThermalCamera";
import PageLoader from "./components/PageLoader";

gsap.registerPlugin(ScrollTrigger);

function waitForAssets(minDelay = 600) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    // Give React time to render the new page into the DOM
    setTimeout(() => {
      const promises = [];

      // Track images (skip lazy-loaded)
      document.querySelectorAll("img").forEach((img) => {
        if (img.loading === "lazy") return;
        if (!img.complete) {
          promises.push(
            new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            }),
          );
        }
      });

      // Track videos (wait for first frame)
      document.querySelectorAll("video").forEach((video) => {
        if (video.readyState >= 2) return;
        promises.push(
          new Promise((res) => {
            video.addEventListener("loadeddata", res, { once: true });
            video.addEventListener("error", res, { once: true });
          }),
        );
      });

      // Track model-viewer elements
      document.querySelectorAll("model-viewer").forEach((mv) => {
        if (mv.loaded) return;
        promises.push(
          new Promise((res) => {
            mv.addEventListener("load", res, { once: true });
            mv.addEventListener("error", res, { once: true });
          }),
        );
      });

      // Minimum display time
      const minDelayPromise = new Promise((res) => {
        const remaining = minDelay - (Date.now() - startTime);
        setTimeout(res, Math.max(0, remaining));
      });

      // Maximum wait (6 seconds)
      const timeout = new Promise((res) => setTimeout(res, 6000));

      Promise.all([
        Promise.race([Promise.all(promises), timeout]),
        minDelayPromise,
      ]).then(resolve);
    }, 150);
  });
}

function App() {
  const { i18n } = useTranslation();
  const lenisRef = useRef(null);
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(true);

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

  const isComingSoon = location.pathname === "/coming-soon";
  const isContact = location.pathname === "/contact";

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  // Show loader on every route change, hide when assets are ready
  useEffect(() => {
    startTransition(() => setPageLoading(true));
    waitForAssets().then(() => setPageLoading(false));
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <PageLoader loading={pageLoading} />
      {!isComingSoon && !isContact && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/cyber-security" element={<CyberSecurity />} />
        <Route path="/thermal-camera" element={<ThermalCamera />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      {!isComingSoon && !isContact && <Footer key={location.pathname} />}
    </div>
  );
}

export default App;
