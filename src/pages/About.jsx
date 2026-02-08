import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const textRef = useRef(null);
  const text =
    "Integrated technology and security solutions powering digital transformation since 1996.";

  const splitText = useMemo(() => {
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
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");

    gsap.fromTo(
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      className="w-full min-h-screen text-white flex flex-col justify-center items-center text-center gap-[clamp(30px,5vw,50px)] py-20 px-[5%]"
    >
      <div className="w-min px-[clamp(12px,2vw,16px)] py-[clamp(6px,1.5vw,8px)] rounded-[30px] border border-[#e93d59] shadow-[0_4px_10px_rgba(56,46,62,0.284)] flex items-center gap-[clamp(6px,1.5vw,8px)]">
        <div className="w-[clamp(18px,3vw,24px)] h-[clamp(18px,3vw,24px)] border border-[#e93d59] rounded-full"></div>
        <h1 className="text-[clamp(14px,2.5vw,20px)] font-thin whitespace-nowrap">
          who we are
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
