import FloatingLines from "../components/FloatingLines";

export default function Hero() {
  return (
    <div
      id="home"
      className="relative w-screen h-screen flex justify-center items-center top-0"
    >
      <div className="absolute z-10">
        <h1 className="space-y-2">
          <span className="leading-normal bg-linear-to-r from-blue-300 via-white to-pink-400 bg-clip-text text-transparent block text-center text-2xl sm:text-2xl md:text-4xl lg:text-6xl">
            Technology.Security.Reliability
          </span>
          <span className="block bg-slate-100 bg-clip-text text-transparent text-center text-xl sm:text-2xl md:text-4xl lg:text-3xl">
            Delivering Technology and Security with Reliable Performance
          </span>
        </h1>
      </div>
      <div className="absolute inset-0">
        <FloatingLines
          enabledWaves="middle"
          lineCount={8}
          lineDistance={1}
          bendRadius={3.5}
          bendStrength={0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
          linesGradient={[
            "#1a2a6c",
            "#6b2fa0",
            "#e947f5",
            "#e94560",
            "#ff6b35",
            "#fdbb2d",
          ]}
        />
      </div>
    </div>
  );
}
