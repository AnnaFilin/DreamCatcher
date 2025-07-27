// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const FloatingText = ({ text, onRemove }) => {
//   const [style, setStyle] = useState({});
//   const [startTime, setStartTime] = useState(null);
//   const [opacity, setOpacity] = useState(0);
//   const [removed, setRemoved] = useState(false);

//   const lifetime = getRandom(22000, 28000);
//   const fadeTime = 3000;
//   const fontSize = getRandom(18, 26);

//   // Координаты, гарантированно в зоне видимости
//   const initialTop = getRandom(25, 65); // vh
//   const initialLeft = getRandom(15, 75); // vw
//   const driftX = getRandom(-8, 8); // движение медленное
//   const driftY = getRandom(-10, 10);

//   useEffect(() => {
//     let frame;

//     const animate = (time) => {
//       if (!startTime) setStartTime(time);
//       const elapsed = time - startTime;
//       const progress = elapsed / lifetime;

//       const top = initialTop + driftY * progress;
//       const left = initialLeft + driftX * progress;

//       setStyle({
//         top: `${top}vh`,
//         left: `${left}vw`,
//         fontSize: `${fontSize}px`,
//       });

//       if (elapsed < fadeTime) {
//         setOpacity(elapsed / fadeTime); // появление
//       } else if (elapsed > lifetime - fadeTime) {
//         setOpacity((lifetime - elapsed) / fadeTime); // исчезновение
//       } else {
//         setOpacity(1);
//       }

//       if (elapsed < lifetime) {
//         frame = requestAnimationFrame(animate);
//       } else {
//         setRemoved(true);
//       }
//     };

//     frame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   useEffect(() => {
//     if (removed) {
//       const timer = setTimeout(() => {
//         onRemove();
//       }, fadeTime);
//       return () => clearTimeout(timer);
//     }
//   }, [removed]);

//   return (
//     <div
//       style={{
//         ...style,
//         position: "fixed",
//         zIndex: 9999,
//         pointerEvents: "none",
//         userSelect: "none",
//         whiteSpace: "nowrap",
//         fontFamily: "'Sora', sans-serif",
//         textShadow: "0 0 6px rgba(255,255,255,0.6)",
//         color: "rgba(255,255,255,0.96)",
//         opacity,
//         transition: `opacity ${fadeTime}ms ease-in-out`,
//       }}
//     >
//       {text}
//     </div>
//   );
// };
// // const FloatingText = ({ text, onRemove }) => {
// //   const [style, setStyle] = useState({});
// //   const [startTime, setStartTime] = useState(null);
// //   const [opacity, setOpacity] = useState(0);
// //   const [removed, setRemoved] = useState(false);

// //   // const lifetime = getRandom(12000, 18000);
// //   // const lifetime = getRandom(18000, 24000); // раньше было 12000–18000
// //   const lifetime = getRandom(25000, 30000); // было 18000–24000

// //   // const lifetime = getRandom(22000, 28000);
// //   const fadeTime = 3000;
// //   const fontSize = getRandom(18, 26);

// //   // Стабильный диапазон по экрану
// //   const initialTop = getRandom(25, 65); // видимая вертикаль
// //   const initialLeft = getRandom(15, 75); // середина по горизонтали
// //   const driftX = getRandom(-8, 8); // мягкое движение
// //   const driftY = getRandom(-10, 10);

// //   // const fontSize = getRandom(14, 22);
// //   // const fontSize = getRandom(18, 24);

// //   useEffect(() => {
// //     let frame;
// //     const animate = (time) => {
// //       if (!startTime) setStartTime(time);
// //       const elapsed = time - startTime;
// //       const progress = elapsed / lifetime;

// //       const top = initialTop + driftY * progress;
// //       const left = initialLeft + driftX * progress;

// //       setStyle({
// //         top: `${top}vh`,
// //         left: `${left}vw`,
// //         fontSize: `${fontSize}px`,
// //       });

// //       if (elapsed < fadeTime) {
// //         setOpacity(elapsed / fadeTime); // появление
// //       } else if (elapsed > lifetime - fadeTime) {
// //         setOpacity((lifetime - elapsed) / fadeTime); // исчезновение
// //       } else {
// //         setOpacity(1);
// //       }

// //       if (elapsed < lifetime) {
// //         frame = requestAnimationFrame(animate);
// //       } else {
// //         setRemoved(true); // начинаем удаление
// //       }
// //     };

// //     frame = requestAnimationFrame(animate);
// //     return () => cancelAnimationFrame(frame);
// //   }, []);

// //   // useEffect(() => {
// //   //   if (removed) {
// //   //     const timer = setTimeout(() => {
// //   //       onRemove();
// //   //     }, fadeTime); // даём закончить анимацию
// //   //     return () => clearTimeout(timer);
// //   //   }
// //   // }, [removed]);
// //   useEffect(() => {
// //     if (removed) {
// //       console.log("⏳ removed=true for:", text);
// //       const timer = setTimeout(() => {
// //         console.log("🗑 calling onRemove for:", text);
// //         onRemove();
// //       }, fadeTime); // даём закончить анимацию
// //       return () => clearTimeout(timer);
// //     }
// //   }, [removed]);

// //   return (
// //     //     <div
// //     //       className="leading-snug
// //     //    tracking-tight
// //     //   italic
// //     //  font-thin  font-marck"
// //     //       style={{
// //     //         position: "fixed",
// //     //         pointerEvents: "none",
// //     //         userSelect: "none",
// //     //         whiteSpace: "nowrap",
// //     //         textShadow: "0 0 6px rgba(255,255,255,0.5)",
// //     //         color: "rgba(255,255,255,0.85)",
// //     //         opacity,
// //     //         transition: `opacity ${fadeTime}ms ease-in-out`,
// //     //         ...style,
// //     //       }}
// //     //     >
// //     //       {text}
// //     //     </div>
// //     <div
// //       //   style={{
// //       //     ...style,
// //       //     opacity,
// //       //     transition: `opacity ${fadeTime}ms ease-in-out`,
// //       //     position: "fixed",
// //       //     zIndex: 9999,
// //       //     top: 0,
// //       //     left: 0,
// //       //     backgroundColor: "rgba(255,0,0,0.4)",
// //       //     color: "white",
// //       //     fontSize: "14px",
// //       //     padding: "2px 6px",
// //       //     border: "1px solid white",
// //       //     pointerEvents: "none",
// //       //   }}
// //       // >
// //       style={{
// //         position: "fixed",
// //         zIndex: 9999,
// //         pointerEvents: "none",
// //         userSelect: "none",
// //         whiteSpace: "nowrap",
// //         fontFamily: "'Sora', sans-serif",
// //         textShadow: "0 0 6px rgba(255,255,255,0.6)",
// //         color: "rgba(255,255,255,0.96)",
// //         fontSize: `${fontSize}px`,
// //         opacity,
// //         transition: `opacity ${fadeTime}ms ease-in-out`,
// //         top: `${top}vh`,
// //         left: `${left}vw`,
// //       }}
// //     >
// //       {text}
// //     </div>
// //   );
// // };

// export default function FloatingDreamTexts() {
//   const snippets = useSelector((state) => state.snippets.snippets);

//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim().slice(0, 80))
//     .filter(Boolean);

//   const [floatingItems, setFloatingItems] = useState([]);

//   useEffect(() => {
//     if (!texts.length) return;

//     const interval = setInterval(() => {
//       setFloatingItems((prev) => {
//         if (prev.length >= 10) return prev;

//         const newText = texts[Math.floor(Math.random() * texts.length)];
//         const id = `${Date.now()}-${Math.random()}`;

//         return [...prev, { id, text: newText }];
//       });
//     }, 5000); // Каждые 5 секунд

//     console.log("Floating items on screen:", floatingItems.length);

//     return () => clearInterval(interval);
//   }, [texts]);

//   const remove = (id) => {
//     setFloatingItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <>
//       {floatingItems.map(({ id, text }) => (
//         <FloatingText key={id} text={text} onRemove={() => remove(id)} />
//       ))}
//     </>
//   );
// }

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);

// //   const texts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim().slice(0, 80))
// //     .filter(Boolean);

// //   // const [currentIndex, setCurrentIndex] = useState(0);

// //   const [floatingItems, setFloatingItems] = useState([]);

// //   // useEffect(() => {
// //   //   if (!texts.length) return;

// //   //   let isMounted = true;

// //   //   const spawnText = () => {
// //   //     if (!isMounted) return;
// //   //     if (floatingItems.length >= 10) return;

// //   //     const newText = texts[Math.floor(Math.random() * texts.length)];
// //   //     const id = Date.now() + Math.random();

// //   //     setFloatingItems((prev) => [...prev, { id, text: newText }]);

// //   //     // const nextDelay = getRandom(3000, 5000);
// //   //     const nextDelay = getRandom(5000, 8000);

// //   //     setTimeout(spawnText, nextDelay);
// //   //   };

// //   //   // Стартуем один запуск через секунду
// //   //   const startTimeout = setTimeout(spawnText, 1000);

// //   //   return () => {
// //   //     isMounted = false;
// //   //     clearTimeout(startTimeout);
// //   //   };
// //   // }, [texts]);

// //   // useEffect(() => {
// //   //   if (!texts.length) return;
// //   //   let isMounted = true;

// //   //   const spawn = () => {
// //   //     if (!isMounted) return;
// //   //     setFloatingItems((prev) => {
// //   //       if (prev.length >= 10) return prev;
// //   //       const nextText = texts[currentIndex % texts.length];
// //   //       setCurrentIndex((i) => i + 1);
// //   //       return [...prev, { id: Date.now() + Math.random(), text: nextText }];
// //   //     });
// //   //     const delay = getRandom(5000, 7000);
// //   //     setTimeout(spawn, delay);
// //   //   };

// //   //   const initial = setTimeout(spawn, 1000);

// //   //   return () => {
// //   //     isMounted = false;
// //   //     clearTimeout(initial);
// //   //   };
// //   // }, [texts]);

// //   useEffect(() => {
// //     if (!texts.length) return;

// //     const MAX_ITEMS = 10;
// //     const INTERVAL_MS = 4000;

// //     const interval = setInterval(() => {
// //       setFloatingItems((prev) => {
// //         if (prev.length >= MAX_ITEMS) return prev;

// //         const newText = texts[Math.floor(Math.random() * texts.length)];
// //         const id = `${Date.now()}-${Math.random()}`;

// //         return [...prev, { id, text: newText }];
// //       });
// //     }, INTERVAL_MS);

// //     return () => clearInterval(interval);
// //   }, [texts]);

// //   const remove = (id) => {
// //     setFloatingItems((prev) => prev.filter((item) => item.id !== id));
// //   };

// //   return (
// //     <>
// //       {floatingItems.map(({ id, text }) => (
// //         <FloatingText key={id} text={text} onRemove={() => remove(id)} />
// //       ))}
// //     </>
// //   );
// // }

// function getRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }
// import { useEffect, useState } from "react";
// import { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";

// const FloatingDreamTexts = () => {
//   const snippets = useSelector((state) => state.snippets.snippets);

//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean)
//     .slice(0, 10);

//   const [visibleItems, setVisibleItems] = useState([]);
//   const indexRef = useRef(0);
//   const timeoutRef = useRef(null);

//   const showNextItem = () => {
//     if (texts.length === 0) return;

//     const text = texts[indexRef.current];
//     const id = Date.now();

//     setVisibleItems((prev) => [...prev, { id, text }]);

//     setTimeout(() => {
//       setVisibleItems((prev) => prev.filter((item) => item.id !== id));
//     }, 8000);

//     indexRef.current = (indexRef.current + 1) % texts.length;
//     timeoutRef.current = setTimeout(showNextItem, 3000);
//   };

//   useEffect(() => {
//     showNextItem();
//     return () => clearTimeout(timeoutRef.current);
//   }, [texts.length]);

//   return (
//     <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
//       {visibleItems.map((item) => (
//         <FloatingText key={item.id} text={item.text} />
//       ))}
//     </div>
//   );
// };

// const FloatingText = ({ text }) => {
//   const style = {
//     left: `${Math.random() * 80 + 10}%`,
//     top: `${Math.random() * 80 + 10}%`,
//     animationDuration: `${10 + Math.random() * 5}s`,
//   };

//   return (
//     <div
//       className="absolute text-sm md:text-base max-w-[60%] opacity-0 animate-fadeInOut leading-snug tracking-tight italic font-thin font-marck text-white pointer-events-none"
//       style={style}
//     >
//       {text}
//     </div>
//   );
// };

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// export default FloatingDreamTexts;
// import { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";

// export default function FloatingDreamTexts3() {
//   const snippets = useSelector((state) => state.snippets.snippets);
//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean);

//   const [visibleTexts, setVisibleTexts] = useState([]);
//   const indexRef = useRef(0);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const showNext = () => {
//       if (texts.length === 0) return;

//       const text = texts[indexRef.current % texts.length];
//       const id = `${text.slice(0, 10)}-${Date.now()}`;
//       const item = { id, text };

//       setVisibleTexts((prev) => [...prev, item]);

//       // Удаляем через 6.5 секунд
//       setTimeout(() => {
//         setVisibleTexts((prev) => prev.filter((t) => t.id !== id));
//       }, 6500);

//       indexRef.current += 1;
//       timeoutRef.current = setTimeout(showNext, 2000);
//     };

//     timeoutRef.current = setTimeout(showNext, 200);
//     return () => clearTimeout(timeoutRef.current);
//   }, [texts]);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {visibleTexts.map((item) => (
//         <FloatingText key={item.id} text={item.text} />
//       ))}
//     </div>
//   );
// }

// function FloatingText({ text }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const x = Math.random() * 80 + 10;
//     const y = Math.random() * 60 + 10;
//     el.style.left = `${x}%`;
//     el.style.top = `${y}%`;
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className="absolute max-w-[40%] text-white text-sm opacity-0 animate-fade float-text transition-opacity duration-1000
//                  italic font-thin font-marck leading-snug"
//       style={{ animation: "fadeinout 6.5s ease-in-out forwards" }}
//     >
//       {text}
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function FloatingDreamTexts3() {
  const snippets = useSelector((state) => state.snippets.snippets);
  const texts = snippets
    .filter((s) => !!s.text)
    .map((s) => s.text.trim())
    .filter(Boolean);

  const [visibleTexts, setVisibleTexts] = useState([]);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const showNext = () => {
      if (texts.length === 0) return;

      const text = texts[indexRef.current % texts.length];
      const id = `${text.slice(0, 10)}-${Date.now()}`;
      const item = { id, text };

      setVisibleTexts((prev) => [...prev, item]);

      // Удаляем через 6.5 секунд
      setTimeout(() => {
        setVisibleTexts((prev) => prev.filter((t) => t.id !== id));
      }, 6500);

      indexRef.current += 1;
      timeoutRef.current = setTimeout(showNext, 2000);
    };

    timeoutRef.current = setTimeout(showNext, 200);
    return () => clearTimeout(timeoutRef.current);
  }, [texts]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {visibleTexts.map((item) => (
        <FloatingText key={item.id} text={item.text} />
      ))}
    </div>
  );
}

function FloatingText({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const x = Math.random() * 80 + 10;
    const y = Math.random() * 60 + 10;
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
  }, []);

  return (
    <div
      ref={ref}
      className="absolute max-w-[40%] text-white text-sm opacity-0 animate-fade float-text transition-opacity duration-1000
                 italic font-thin font-marck leading-snug"
      style={{ animation: "fadeinout 6.5s ease-in-out forwards" }}
    >
      {text}
    </div>
  );
}
