import React, { useEffect, useState } from "react";

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
    const duration = getRandom(15000, 30000);
    const initialTop = parseFloat(style.top);
    const initialLeft = parseFloat(style.left);
    const delay = Math.random() * 5000;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      const newTop = initialTop + 5 * Math.sin(progress * 2 * Math.PI + index);
      const newLeft =
        initialLeft + 5 * Math.cos(progress * 2 * Math.PI + index);

      const newOpacity =
        0.2 +
        0.8 *
          (progress < 0.1
            ? progress * 10
            : progress > 0.9
            ? (1 - progress) * 10
            : 1);

      setStyle((prev) => ({
        ...prev,
        top: `${newTop}vh`,
        left: `${newLeft}vw`,
        opacity: newOpacity,
      }));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Перезапуск цикла
        startTime = null;
        setStyle({
          top: getRandom(10, 90) + "vh",
          left: getRandom(5, 95) + "vw",
          opacity: 0,
          fontSize: getRandom(14, 24) + "px",
        });
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

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
        color: "rgba(255, 255, 255, 0.8)",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "opacity 0.5s ease-in-out",
        fontFamily: "'Sora', sans-serif",
        textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
      }}
    >
      {text}
    </div>
  );
};

export default FloatingText;
