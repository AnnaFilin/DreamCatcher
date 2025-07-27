// // // FloatingDreamTexts.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// function getRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }

// const FloatingText = ({ text, delay }) => {
//   const [style, setStyle] = useState(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     let timeoutId;
//     let animationFrame;
//     let startTime = null;
//     const lifetime = getRandom(12000, 20000);
//     // const fadeDuration = 3000;
//     const fadeIn = 0.1;
//     const fadeOut = 0.1;

//     let currentTop = getRandom(10, 80);
//     let currentLeft = getRandom(5, 90);

//     // const initialTop = getRandom(10, 85);
//     // const initialLeft = getRandom(5, 90);
//     // const driftX = getRandom(-10, 10);
//     // const driftY = getRandom(-5, 5);
//     const fontSize = getRandom(14, 24);

//     // const animate = (time) => {
//     //   if (!startTime) startTime = time;
//     //   const elapsed = time - startTime;

//     //   const progress = elapsed / lifetime;
//     //   const top = initialTop + driftY * progress;
//     //   const left = initialLeft + driftX * progress;
//     //   //   const opacity =
//     //   //     progress < 0.1
//     //   //       ? progress * 10
//     //   //       : progress > 0.9
//     //   //       ? (1 - progress) * 10
//     //   //       : 1;

//     //   const fadeIn = 0.1;
//     //   //   const fadeOut = 0.2;
//     //   const fadeOut = 0.4;
//     //   let opacity = 1;

//     //   if (progress < fadeIn) {
//     //     opacity = progress / fadeIn;
//     //   } else if (progress > 1 - fadeOut) {
//     //     opacity = (1 - progress) / fadeOut;
//     //   }

//     //   setStyle({
//     //     top: `${top}vh`,
//     //     left: `${left}vw`,
//     //     opacity,
//     //     fontSize: `${fontSize}px`,
//     //   });

//     //   if (progress < 1) {
//     //     animationFrame = requestAnimationFrame(animate);
//     //   }
//     // };
//     const animate = (time) => {
//       if (!startTime) startTime = time;
//       const elapsed = time - startTime;
//       const progress = elapsed / lifetime;

//       const deltaX = getRandom(-0.05, 0.05);
//       const deltaY = getRandom(-0.05, 0.05);

//       currentTop += deltaY;
//       currentLeft += deltaX;

//       const opacity =
//         progress < fadeIn
//           ? progress / fadeIn
//           : progress > 1 - fadeOut
//           ? (1 - progress) / fadeOut
//           : 1;

//       setStyle({
//         top: `${currentTop}vh`,
//         left: `${currentLeft}vw`,
//         opacity,
//         fontSize: `${fontSize}px`,
//       });

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     timeoutId = setTimeout(() => {
//       setVisible(true);
//       animationFrame = requestAnimationFrame(animate);
//     }, delay);

//     return () => {
//       clearTimeout(timeoutId);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [delay, text]);

//   if (!visible || !style) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: style.top,
//         left: style.left,
//         opacity: style.opacity,
//         fontSize: style.fontSize,
//         color: "rgba(255, 255, 255, 0.8)",
//         pointerEvents: "none",
//         userSelect: "none",
//         whiteSpace: "nowrap",
//         // transition: "opacity 0.5s ease-in-out",
//         transition: "opacity 2s ease-in-out",
//         fontFamily: "'Sora', sans-serif",
//         textShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
//       }}
//     >
//       {text}
//     </div>
//   );
// };

// export default function FloatingDreamTexts() {
//   const snippets = useSelector((state) => state.snippets.snippets);
//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean)
//     .slice(0, 2); // Только две строки для теста

//   return (
//     <>
//       {texts.map((text, i) => (
//         <FloatingText key={i} text={text} delay={i * 4000} />
//       ))}
//     </>
//   );
// }
// FloatingDreamText.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const FloatingText = ({ text, onFinish }) => {
  const [style, setStyle] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const startX = getRandom(5, 80);
    const startY = getRandom(5, 80);
    const endX = getRandom(5, 80);
    const endY = getRandom(5, 80);
    const fontSize = getRandom(14, 22);
    const lifetime = getRandom(12000, 20000);
    const startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const progress = (now - startTime) / lifetime;

      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      const opacity =
        progress < 0.1
          ? progress * 10
          : progress > 0.9
          ? (1 - progress) * 10
          : 1;

      setStyle({
        top: `${currentY}vh`,
        left: `${currentX}vw`,
        opacity,
        fontSize: `${fontSize}px`,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };

    setVisible(true);
    animate();
  }, []);

  if (!visible) return null;

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
        textShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
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
    .filter(Boolean);

  const [activeTexts, setActiveTexts] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (texts.length === 0) return;

      setActiveTexts((prev) => {
        const next = [...prev];
        if (next.length >= 10) next.shift();

        next.push({
          id: Date.now(),
          text: texts[index % texts.length],
        });

        index++;
        return next;
      });
    }, getRandom(3000, 5000));

    return () => clearInterval(interval);
  }, [texts]);

  const handleFinish = (id) => {
    setActiveTexts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {activeTexts.map((item) => (
        <FloatingText
          key={item.id}
          text={item.text}
          onFinish={() => handleFinish(item.id)}
        />
      ))}
    </>
  );
}

// export default function FloatingDreamTexts() {
//   const snippets = useSelector((state) => state.snippets.snippets);
//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean);

//   // Только максимум 2 текста, каждый с задержкой
//   const limited = texts.slice(0, 2);

//   return (
//     <>
//       {limited.map((text, i) => (
//         <FloatingText key={i} text={text} delay={i * 4000} />
//       ))}
//     </>
//   );
// }

// const FloatingText = ({ text, delay }) => {
//   const [style, setStyle] = useState(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     let timeoutId;
//     let animationFrame;
//     let startTime = null;

//     // const lifetime = getRandom(15000, 22000); // живёт дольше
//     // const fadeIn = 0.1;
//     // const fadeOut = 0.15;
//     const lifetime = getRandom(25000, 35000);
//     const fadeIn = 0.1;
//     const fadeOut = 0.3;
//     const driftX = getRandom(30, 60) * (Math.random() < 0.5 ? -1 : 1);
//     const driftY = getRandom(10, 20) * (Math.random() < 0.5 ? -1 : 1);

//     const initialTop = getRandom(10, 80);
//     const initialLeft = getRandom(10, 80);
//     // const driftX = getRandom(50, 100) * (Math.random() < 0.5 ? -1 : 1); // амплитуда движения X
//     // const driftY = getRandom(20, 40) * (Math.random() < 0.5 ? -1 : 1); // амплитуда движения Y
//     const fontSize = getRandom(16, 24);

//     const animate = (time) => {
//       if (!startTime) startTime = time;
//       const elapsed = time - startTime;
//       const progress = elapsed / lifetime;

//       // добавим лёгкое волнообразное движение
//       const wave = Math.sin(progress * Math.PI * 2) * 5;

//       const top = initialTop + driftY * progress + wave;
//       const left = initialLeft + driftX * progress;

//       let opacity = 1;
//       if (progress < fadeIn) {
//         opacity = progress / fadeIn;
//       } else if (progress > 1 - fadeOut) {
//         opacity = (1 - progress) / fadeOut;
//       }

//       setStyle({
//         top: `${top}vh`,
//         left: `${left}vw`,
//         opacity,
//         fontSize: `${fontSize}px`,
//       });

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     timeoutId = setTimeout(() => {
//       setVisible(true);
//       animationFrame = requestAnimationFrame(animate);
//     }, delay);

//     return () => {
//       clearTimeout(timeoutId);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [delay, text]);

//   if (!visible || !style) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: style.top,
//         left: style.left,
//         opacity: style.opacity,
//         fontSize: style.fontSize,
//         color: "rgba(255, 255, 255, 0.85)",
//         pointerEvents: "none",
//         userSelect: "none",
//         whiteSpace: "nowrap",
//         transition: "opacity 0.5s ease-in-out",
//         fontFamily: "'Sora', sans-serif",
//         textShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
//       }}
//     >
//       {text}
//     </div>
//   );
// };

// export default function FloatingDreamTexts() {
//   const snippets = useSelector((state) => state.snippets.snippets);
//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean)
//     .slice(0, 10); // максимум 10 штук

//   return (
//     <>
//       {texts.map((text, i) => (
//         <FloatingText key={i} text={text} delay={i * getRandom(1500, 4000)} />
//       ))}
//     </>
//   );
// }
