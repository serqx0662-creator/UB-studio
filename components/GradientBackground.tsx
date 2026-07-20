export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #020202 0%, #0a121a 28%, #142230 50%, #1c3348 68%, #2f5674 84%, #5c92b8 100%)",
        }}
      />
      <div
        className="blob"
        style={{
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle, rgba(178,213,229,0.4) 0%, rgba(178,213,229,0) 70%)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-20%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle, rgba(92,146,184,0.45) 0%, rgba(92,146,184,0) 70%)",
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          top: "30%",
          left: "45%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(178,213,229,0.22) 0%, rgba(178,213,229,0) 70%)",
          animation: "drift-c 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(178,213,229,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(178,213,229,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(2,2,2,0) 0%, rgba(2,2,2,0.55) 100%)",
        }}
      />
    </div>
  );
}
