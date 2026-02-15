import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const textRef = useRef(null);
  const { t, i18n } = useTranslation();
  const text = t("about.text");
  const isArabic = i18n.language === "ar";

  const splitText = useMemo(() => {
    if (isArabic) {
      // Arabic: split by words only (characters must stay connected for ligatures)
      return text.split(" ").map((word, wordIndex, arr) => (
        <span key={wordIndex}>
          <span className="char inline-block">{word}</span>
          {wordIndex < arr.length - 1 && <span className="char inline">&nbsp;</span>}
        </span>
      ));
    }
    // English: split by characters for letter-by-letter animation
    return text.split(" ").map((word, wordIndex, arr) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
        {wordIndex < arr.length - 1 && <span className="char inline">&nbsp;</span>}
      </span>
    ));
  }, [text, isArabic]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");

    const anim = gsap.fromTo(
      chars,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [text, isArabic]);

  return (
    <section
      id="about"
      className="w-full min-h-screen text-white flex flex-col justify-center items-center text-center gap-[clamp(30px,5vw,50px)] py-20 px-[5%]"
    >
      <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] shadow-[10px_0_50px_rgba(100,46,62,0.8)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
        <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-red-600/25 rounded-full"></div>
        <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
          {t("about.badge")}
        </h1>
      </div>

      <div className="px-[5%]">
        <h1
          ref={textRef}
          className=" text-[clamp(1.5rem,4vw,2.3rem)] max-w-200 leading-relaxed tracking-tighter"
        >
          {splitText}
        </h1>
      </div>
    </section>
  );
}

export default About;
