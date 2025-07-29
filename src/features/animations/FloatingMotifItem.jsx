import { useEffect, useState } from "react";

export default function FloatingMotifItem({ motif }) {
  const [style, setStyle] = useState({});
  const [showDesc, setShowDesc] = useState(false);

  const top = Math.random() * 80;
  const left = Math.random() * 80;
  const amplitudeX = Math.random() * 2 + 1;
  const amplitudeY = Math.random() * 2 + 1;
  const phaseShift = Math.random() * 2 * Math.PI;
  const fontSize = Math.random() * 0.5 + 1;

  useEffect(() => {
    let frame;
    let start;
    const duration = 30000 + Math.random() * 10000;

    const animate = (t) => {
      if (!start) start = t;
      const progress = (t - start) / duration;

      const newTop =
        top + amplitudeY * Math.sin(progress * 2 * Math.PI + phaseShift);
      const newLeft =
        left + amplitudeX * Math.cos(progress * 2 * Math.PI + phaseShift);

      const opacity =
        progress < 0.1
          ? progress * 10
          : progress > 0.9
          ? (1 - progress) * 10
          : 1;

      setStyle({
        top: `${newTop}%`,
        left: `${newLeft}%`,
        opacity: Math.max(0, Math.min(1, opacity)),
        fontSize: `${fontSize}rem`,
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="fixed text-white/70 font-marck italic leading-snug tracking-tight"
      style={{
        ...style,
        pointerEvents: "auto",
        textShadow:
          "0 0 4px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)",
        transition: "opacity 1.5s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
        zIndex: 20,
      }}
      onMouseEnter={() => setShowDesc(true)}
      onMouseLeave={() => setShowDesc(false)}
    >
      {motif.id}
      {showDesc && (
        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black/70 text-xs text-white/80 rounded px-2 py-1 shadow-xl w-48 max-w-xs z-30">
          <p className="font-sans text-sm text-white">{motif.meaning}</p>
          {motif.arch && (
            <p className="text-indigo-300 text-xs mt-1 italic">
              — {motif.arch}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
