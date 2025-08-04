import { useEffect, useState } from "react";
import { fetchPublicMotifs } from "../../utils/fetchPublicMotifs";
import { v4 as uuidv4 } from "uuid";

export default function FloatingPublicMotifs({ setSelectedMotif }) {
  const [allMotifs, setAllMotifs] = useState([]);
  const [floatingItems, setFloatingItems] = useState([]);

  useEffect(() => {
    fetchPublicMotifs().then((motifs) => {
      const cleaned = motifs
        .map((m) => ({
          id: m.id?.trim(),
          meaning: m.meaning?.trim(),
          arch: m.arch?.trim(),
        }))
        .filter((m) => m.id);
      setAllMotifs(cleaned);
    });
  }, []);

  useEffect(() => {
    const timeoutRef = { current: null };

    const spawn = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setFloatingItems((prev) => {
        if (prev.length >= 10) return prev;

        const visibleTexts = prev.map((item) => item.text);
        const available = allMotifs.filter((t) => !visibleTexts.includes(t));
        if (!available.length) return prev;

        const newMotif =
          available[Math.floor(Math.random() * available.length)];

        const newItem = {
          id: uuidv4(),
          text: newMotif.id,
          top: Math.random() * 80,
          left: Math.random() * 80,
          amplitudeX: Math.random() * 3 + 1.5,
          amplitudeY: Math.random() * 3 + 1.5,
          phaseShift: Math.random() * 2 * Math.PI,
          fontSize: Math.random() * 0.5 + 1,
          motif: newMotif,
        };

        return [...prev, newItem];
      });

      timeoutRef.current = setTimeout(spawn, 3000 + Math.random() * 3000);
    };

    timeoutRef.current = setTimeout(spawn, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [allMotifs]);

  const handleRemove = (id) => {
    setFloatingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {floatingItems.map((item) => (
        <FloatingMotifText
          key={item.id}
          item={item}
          onRemove={handleRemove}
          onSelect={() => {
            setSelectedMotif(item.motif);
            setTimeout(() => setSelectedMotif(null), 6000);
          }}
        />
      ))}
    </div>
  );
}

function FloatingMotifText({ item, onRemove, onSelect }) {
  const [style, setStyle] = useState({
    top: `${item.top}%`,
    left: `${item.left}%`,
    opacity: 0,
    fontSize: `${item.fontSize}rem`,
  });

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const duration = 30000 + Math.random() * 15000;
    const initialTop = item.top;
    const initialLeft = item.left;
    let animationFrame;
    let startTime;
    const delay = Math.random() * 5000;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;

      const newTop =
        initialTop +
        item.amplitudeY * Math.sin(progress * 2 * Math.PI + item.phaseShift);
      const newLeft =
        initialLeft +
        item.amplitudeX * Math.cos(progress * 2 * Math.PI + item.phaseShift);

      let newOpacity = 1;
      if (progress < 0.1) newOpacity = progress * 10;
      else if (progress > 0.9 || isFading) newOpacity = (1 - progress) * 10;

      setStyle({
        top: `${newTop}%`,
        left: `${newLeft}%`,
        opacity: Math.max(0, Math.min(1, newOpacity)),
        fontSize: `${item.fontSize}rem`,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [item, isFading]);

  useEffect(() => {
    const fadeDuration = 2000;
    const lifetime = 42000;

    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, lifetime - fadeDuration);

    const removeTimeout = setTimeout(() => {
      onRemove(item.id);
    }, lifetime);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [item.id, onRemove]);

  return (
    <div
      className="leading-snug tracking-tight italic font-thin font-manrope"
      style={{
        ...style,
        position: "fixed",
        color: "rgba(255, 255, 255, 0.2)",
        textShadow: `
          0 0 4px rgba(255, 255, 255, 0.15),
          0 0 10px rgba(255, 255, 255, 0.1)
        `,
        pointerEvents: "auto",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "opacity 1.5s ease",
        filter: "blur(0.3px)",
        zIndex: 10,
      }}
      onMouseEnter={
        typeof window !== "undefined" && window.innerWidth >= 768
          ? onSelect
          : undefined
      }
      onTouchStart={onSelect}
    >
      {item.text}
    </div>
  );
}
