import Orb from "../components/Orb";

export default function Hero() {
  return (
    <div
      id="home"
      className="relative w-screen h-screen flex justify-center items-center top-0 overflow-hidden"
    >
      <div className="absolute z-10 flex flex-col items-center gap-4 sm:gap-6 px-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4">
          <span className="text-white/90 font-extralight tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-sm lg:text-base">
            Technology
          </span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-400/80" />
          <span className="text-white/90 font-extralight tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-sm lg:text-base">
            Security
          </span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400/80" />
          <span className="text-white/90 font-extralight tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-sm lg:text-base">
            Reliability
          </span>
        </div>
        <p className="text-white/50 font-light tracking-[0.08em] sm:tracking-[0.12em] text-center text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed">
          Delivering Technology and Security with Reliable Performance
        </p>
      </div>
      <div className="absolute inset-0">
        <Orb
          hoverIntensity={0.1}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>
    </div>
  );
}
