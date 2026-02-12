import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ComingSoon() {
  const { t } = useTranslation();

  return (
    <section className="w-full h-screen flex items-center justify-center bg-black px-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[10%] left-[10%] w-62.5 h-62.5 md:w-100 md:h-100 rounded-full bg-[#e93d59] opacity-15 blur-[100px] pointer-events-none animate-float" />
      <div
        className="absolute bottom-[10%] right-[10%] w-62.5 h-62.5 md:w-100 md:h-100 rounded-full bg-[#6c99fa] opacity-15 blur-[100px] pointer-events-none animate-float"
        style={{ "--delay": "2s" }}
      />

      {/* Content */}
      <div className="text-center max-w-200 w-[90%] relative z-10">
        {/* Logo */}
        <h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-extralight tracking-[8px] md:mb-15 mb-10
            bg-linear-to-r from-[#6c99fa] via-white to-[#ee4399] bg-clip-text text-transparent
            animate-fade-in-up"
          style={{ "--delay": "0.3s" }}
        >
          AL SERAJ
        </h2>

        {/* Coming Soon Title */}
        <h1
          className="text-[clamp(3rem,10vw,7rem)] font-thin tracking-[clamp(2px,1vw,8px)] mb-8
            bg-size-[200%_200%] bg-linear-to-br from-white via-[#e93d59] to-white bg-clip-text text-transparent
            animate-fade-in-up-gradient"
          style={{ "--delay": "0.5s" }}
        >
          {t("comingSoon.title")}
        </h1>

        {/* Subtitle */}
        <p
          className="text-[clamp(1rem,2.5vw,1.5rem)] font-light text-white/70 tracking-[2px] md:mb-20 mb-15
            animate-fade-in-up"
          style={{ "--delay": "0.7s" }}
        >
          {t("comingSoon.subtitle")}
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-10 py-4.5 border-2 border-[#e93d59] rounded-full
            text-[#e93d59] text-[clamp(0.9rem,2vw,1.1rem)] font-normal tracking-[1px]
            hover: hover:text-white transition-all duration-400 cursor-pointer
            animate-fade-in-up group"
          style={{ "--delay": "0.9s" }}
        >
          <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t("comingSoon.backToHome")}</span>
        </Link>
      </div>
    </section>
  );
}
