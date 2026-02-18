import { useEffect, useState } from "react";

export default function PageLoader({ loading }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFadeOut(true);
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
    setVisible(true);
    setFadeOut(false);
  }, [loading]);

  useEffect(() => {
    if (visible && !fadeOut) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, fadeOut]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-extralight tracking-[8px] text-white/90 mb-8 animate-pulse-soft">
        AL SERAJ
      </h1>
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#e93d59] rounded-full animate-loader-slide" />
      </div>
    </div>
  );
}
