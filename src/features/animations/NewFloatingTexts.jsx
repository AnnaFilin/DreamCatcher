import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function truncateTextNicely(text) {
  const minLength = 30;
  const maxLength = 50;
  const targetLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  if (text.length <= targetLength) return text;

  const cut = text.slice(0, targetLength);
  const lastSpace = cut.lastIndexOf(" ");
  const cleanCut = lastSpace !== -1 ? cut.slice(0, lastSpace) : cut;

  return cleanCut + "…";
}

export default function FloatingDreamTextsV2() {
  const snippets = useSelector((state) => state.snippets.snippets);
  const allTexts = snippets
    .filter((s) => !!s.text)
    .map((s) => s.text.trim())
    .filter(Boolean);

  const [floatingItems, setFloatingItems] = useState([]);

  useEffect(() => {
    const timeoutRef = { current: null };

    const spawn = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setFloatingItems((prev) => {
        if (prev.length >= 10) return prev;

        const visibleTexts = prev.map((item) => item.text);
        const available = allTexts.filter((t) => !visibleTexts.includes(t));
        if (!available.length) return prev;

        const newText = truncateTextNicely(
          available[Math.floor(Math.random() * available.length)]
        );

        const dx = Math.random() * 200 - 100;
        const dy = Math.random() * 300 - 150;

        const newItem = {
          id: uuidv4(),
          text: newText,
          top: Math.random() * 80,
          left: Math.random() * 80,
          amplitudeX: Math.random() * 3 + 1.5,
          amplitudeY: Math.random() * 3 + 1.5,
          phaseShift: Math.random() * 2 * Math.PI,

          dx,
          dy,
          fontSize: Math.random() * 0.5 + 1,
        };

        return [...prev, newItem];
      });

      timeoutRef.current = setTimeout(spawn, 3000 + Math.random() * 3000);
    };

    timeoutRef.current = setTimeout(spawn, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [allTexts]);

  const handleRemove = (id) => {
    setFloatingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {floatingItems.map((item) => (
        <FloatingText key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </>
  );
}

function FloatingText({ item, onRemove }) {
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
      className=" leading-snug
  tracking-tight
  italic
 font-thin  font-marck"
      style={{
        ...style,
        position: "fixed",
        color: "rgba(255, 255, 255, 0.6)",
        textShadow: `
    0 0 4px rgba(255, 255, 255, 0.3),
    0 0 10px rgba(255, 255, 255, 0.2)
  `,
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "opacity 1.5s ease",
        filter: "blur(0.25px)",
      }}
    >
      {item.text}
    </div>
  );
}
