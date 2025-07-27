import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const FloatingText = ({ text, index }) => {
  const [style, setStyle] = useState({
    top: getRandom(10, 90) + "vh",
    left: getRandom(5, 95) + "vw",
    opacity: 0,
    fontSize: getRandom(14, 24) + "px",
  });

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = getRandom(15000, 25000);
    const initialTop = parseFloat(style.top);
    const initialLeft = parseFloat(style.left);
    const startDelay = Math.random() * 5000;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = elapsed / duration;

      const newTop = initialTop + 5 * Math.sin(progress * 2 * Math.PI + index);
      const newLeft =
        initialLeft + 5 * Math.cos(progress * 2 * Math.PI + index);

      const newOpacity =
        progress < 0.1
          ? progress * 10
          : progress > 0.9
          ? (1 - progress) * 10
          : 1;

      setStyle((prev) => ({
        ...prev,
        top: `${newTop}vh`,
        left: `${newLeft}vw`,
        opacity: newOpacity,
      }));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // перезапуск анимации
        startTime = null;
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [index]);

  return (
    <div
      style={{
        position: "fixed",
        top: style.top,
        left: style.left,
        opacity: style.opacity,
        fontSize: style.fontSize,
        color: "rgba(255, 255, 255, 0.85)",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        fontFamily: "'Sora', sans-serif",
        textShadow: "0 0 6px rgba(255,255,255,0.4)",
        transition: "opacity 1.5s ease",
      }}
    >
      {text}
    </div>
  );
};

export default function FloatingDreamTexts() {
  const snippets = useSelector((state) => state.snippets.snippets);

  const texts = snippets
    .filter((s) => !!s.text)
    .map((s) => s.text.trim())
    .filter(Boolean)
    .slice(0, 10); // максимум 10

  return (
    <>
      {texts.map((text, index) => (
        <FloatingText key={index} text={text} index={index} />
      ))}
    </>
  );
}
