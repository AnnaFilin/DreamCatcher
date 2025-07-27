// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
// // const MSpan = motion.span;
// const MDiv = motion.div;

// function truncateText(text, maxLength = 100) {
//   if (!text) return "";
//   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// }

// function getRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }

// export default function FloatingText({ text, onComplete }) {
//   const duration = 20000 + Math.random() * 10000; // 20–30 сек
//   const delay = Math.random() * 2000;

//   const xStart = Math.random() * 80 + 10; // vw
//   const yStart = Math.random() * 70 + 10; // vh

//   const xEnd = xStart + Math.random() * 20 - 10;
//   const yEnd = yStart + Math.random() * 20 - 10;

//   const scaleStart = 0.9;
//   const scaleEnd = 1.15;

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onComplete?.();
//     }, duration + delay);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <motion.div
//       className="fixed pointer-events-none select-none text-white/80 font-marck italic font-thin text-shadow-sm leading-[1.2] max-w-[24ch]"
//       style={{
//         top: 0,
//         left: 0,
//         fontSize: "1.3rem",
//         lineHeight: "1.4",
//         textShadow: "0 0 6px rgba(255,255,255,0.5)",
//       }}
//       initial={{
//         opacity: 0,
//         scale: scaleStart,
//         x: `${xStart}vw`,
//         y: `${yStart}vh`,
//       }}
//       animate={{
//         opacity: [0, 1, 1, 0],
//         scale: [scaleStart, scaleEnd, scaleEnd, scaleStart],
//         x: [`${xStart}vw`, `${xEnd}vw`, `${xStart}vw`],
//         y: [`${yStart}vh`, `${yEnd}vh`, `${yStart}vh`],
//       }}
//       transition={{
//         duration: duration / 1000,
//         delay: delay / 1000,
//         ease: "easeInOut",
//       }}
//     >
//       {text}
//     </motion.div>
//   );
// }

// export default function FloatingDreamTexts() {
//   const snippets = useSelector((state) => state.snippets.snippets);
//   const texts = snippets
//     .filter((s) => !!s.text)
//     .map((s) => s.text.trim())
//     .filter(Boolean);

//   const [activeTexts, setActiveTexts] = useState([]);
//   const globalIndexRef = useRef(0); // <-- фикс вместо globalIndex

//   useEffect(() => {
//     if (texts.length === 0) return;

//     const interval = setInterval(() => {
//       setActiveTexts((prev) => {
//         if (prev.length >= 7) return prev;

//         const nextText = texts[globalIndexRef.current % texts.length];
//         globalIndexRef.current++;

//         return [
//           ...prev,
//           {
//             id: Date.now() + Math.random(),
//             text: nextText,
//           },
//         ];
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [texts]);

//   const handleComplete = (id) => {
//     setActiveTexts((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <>
//       {activeTexts.map((entry) => (
//         <FloatingText
//           key={entry.id}
//           text={entry.text}
//           onComplete={() => handleComplete(entry.id)}
//         />
//       ))}
//     </>
//   );
// }

// //     <div
// //       className="  leading-snug
// //   tracking-tight
// //   italic
// //  font-thin  font-marck text-white/80 text-shadow-sm pointer-events-none select-none fixed transition-opacity duration-1000 ease-in-out line-clamp-2 max-w-[24ch]"
// //       style={{
// //         top: style.top,
// //         left: style.left,
// //         fontSize: style.fontSize,
// //         opacity: style.opacity,

// //         textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
// //       }}
// //     >
// //       {truncateText(text)}
// //     </div>

// //     //   {text}
// //     // </div>
// //   );
// // };

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);

// //   const texts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim())
// //     .filter(Boolean)
// //     .slice(0, 10);

// //   return (
// //     <>
// //       {texts.map((text, index) => (
// //         <FloatingText key={index} text={text} index={index} />
// //       ))}
// //     </>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { motion, AnimatePresence } from "framer-motion";

// // const MSpan = motion.span;

// // function truncateText(text, maxLength = 100) {
// //   if (!text) return "";
// //   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// // }

// // function getRandom(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // const FloatingText = ({ text, onComplete }) => {
// //   const [style, setStyle] = useState({
// //     top: getRandom(10, 90) + "vh",
// //     left: getRandom(5, 95) + "vw",
// //     fontSize: getRandom(12, 24) + "px",
// //   });

// //   useEffect(() => {
// //     const lifetime = getRandom(30000, 45000); // 30-45 сек
// //     const timeout = setTimeout(() => {
// //       onComplete(); // сигнал родителю удалить этот текст
// //     }, lifetime);
// //     return () => clearTimeout(timeout);
// //   }, [onComplete]);

// //   return (
// //     <motion.div
// //       className="leading-snug tracking-tight italic font-thin font-marck text-white/80 text-shadow-sm pointer-events-none select-none fixed line-clamp-2 max-w-[24ch]"
// //       style={{
// //         top: style.top,
// //         left: style.left,
// //         fontSize: style.fontSize,
// //         textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
// //       }}
// //       initial={{ opacity: 0, scale: 0.9 }}
// //       animate={{
// //         opacity: 1,
// //         scale: 1,
// //         y: [0, 5, 0, -5, 0],
// //         x: [0, -5, 0, 5, 0],
// //       }}
// //       exit={{ opacity: 0, scale: 0.8 }}
// //       transition={{ duration: 2, ease: "easeInOut" }}
// //     >
// //       {truncateText(text)}
// //     </motion.div>
// //   );
// // };

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);
// //   const allTexts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim())
// //     .filter(Boolean);

// //   const [activeTexts, setActiveTexts] = useState([]);

// //   useEffect(() => {
// //     if (!allTexts.length) return;

// //     const spawn = () => {
// //       setActiveTexts((prev) => {
// //         const nextText = allTexts[Math.floor(Math.random() * allTexts.length)];
// //         return [...prev, { id: Date.now() + Math.random(), text: nextText }];
// //       });
// //     };

// //     const interval = setInterval(() => {
// //       spawn();
// //     }, 8000); // раз в 8 секунд появляется новая

// //     spawn(); // первый запуск

// //     return () => clearInterval(interval);
// //   }, [allTexts]);

// //   const handleComplete = (id) => {
// //     setActiveTexts((prev) => prev.filter((item) => item.id !== id));
// //   };

// //   return (
// //     <AnimatePresence>
// //       {activeTexts.map((item) => (
// //         <FloatingText
// //           key={item.id}
// //           text={item.text}
// //           onComplete={() => handleComplete(item.id)}
// //         />
// //       ))}
// //     </AnimatePresence>
// //   );
// // }
// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { motion } from "framer-motion";
// // const MSpan = motion.span;

// // function truncateText(text, maxLength = 100) {
// //   if (!text) return "";
// //   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// // }

// // function getRandom(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // const FloatingText = ({ textPool, index }) => {
// //   const [text, setText] = useState(
// //     textPool[Math.floor(Math.random() * textPool.length)]
// //   );

// //   const [style, setStyle] = useState({
// //     top: getRandom(10, 90),
// //     left: getRandom(5, 95),
// //     fontSize: getRandom(14, 22),
// //     scale: 1,
// //     opacity: 0,
// //   });

// //   useEffect(() => {
// //     let animationFrame;
// //     let startTime;
// //     let lifeSpan = getRandom(20000, 30000); // 20-30 сек
// //     let breathDuration = 5000; // 5 сек цикл дыхания
// //     const initialTop = style.top;
// //     const initialLeft = style.left;
// //     const delayBeforeStart = getRandom(0, 4000);

// //     const animate = (time) => {
// //       if (!startTime) startTime = time;
// //       const elapsed = time - startTime;
// //       const progress = Math.min(elapsed / lifeSpan, 1);
// //       const breathProgress = (elapsed % breathDuration) / breathDuration;

// //       // Движение по кругу
// //       const newTop = initialTop + 2 * Math.sin(progress * 2 * Math.PI + index);
// //       const newLeft =
// //         initialLeft + 2 * Math.cos(progress * 2 * Math.PI + index);

// //       // Появление / исчезновение
// //       let newOpacity =
// //         progress < 0.1
// //           ? progress * 10
// //           : progress > 0.9
// //           ? (1 - progress) * 10
// //           : 1;

// //       // Дыхание (scale)
// //       let newScale = 1 + 0.05 * Math.sin(breathProgress * 2 * Math.PI);

// //       setStyle((prev) => ({
// //         ...prev,
// //         top: newTop,
// //         left: newLeft,
// //         opacity: newOpacity,
// //         scale: newScale,
// //       }));

// //       if (progress < 1) {
// //         animationFrame = requestAnimationFrame(animate);
// //       } else {
// //         // Выбираем новое значение
// //         setText(textPool[Math.floor(Math.random() * textPool.length)]);
// //         setStyle({
// //           top: getRandom(10, 90),
// //           left: getRandom(5, 95),
// //           fontSize: getRandom(14, 22),
// //           scale: 1,
// //           opacity: 0,
// //         });
// //         startTime = null;
// //         animationFrame = requestAnimationFrame(animate);
// //       }
// //     };

// //     const delayTimeout = setTimeout(() => {
// //       animationFrame = requestAnimationFrame(animate);
// //     }, delayBeforeStart);

// //     return () => {
// //       clearTimeout(delayTimeout);
// //       cancelAnimationFrame(animationFrame);
// //     };
// //   }, [textPool, index]);

// //   return (
// //     <MSpan
// //       style={{
// //         position: "fixed",
// //         top: `${style.top}vh`,
// //         left: `${style.left}vw`,
// //         fontSize: `${style.fontSize}px`,
// //         opacity: style.opacity,
// //         scale: style.scale,
// //         lineHeight: 1.2,
// //         pointerEvents: "none",
// //         userSelect: "none",
// //         textShadow: "0 0 5px rgba(255,255,255,0.6)",
// //       }}
// //       className="italic font-thin font-marck text-white/80 text-shadow-sm transition-all ease-linear duration-[1000ms] leading-snug max-w-[24ch] line-clamp-2"
// //     >
// //       {truncateText(text)}
// //     </MSpan>
// //   );
// // };

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);

// //   const texts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim())
// //     .filter(Boolean);

// //   return (
// //     <>
// //       {Array.from({ length: 10 }).map((_, i) => (
// //         <FloatingText key={i} index={i} textPool={texts} />
// //       ))}
// //     </>
// //   );
// // }
// // FloatingDreamTexts.jsx
// // import { useEffect, useState, useRef } from "react";
// // import { useSelector } from "react-redux";

// // const TOTAL_VISIBLE = 7;
// // const CYCLE_TIME = 40000; // 40 сек на полную жизнь
// // const FADE_TIME = 5000; // fade-in и fade-out по 5 сек

// // function truncateText(text, maxLength = 100) {
// //   if (!text) return "";
// //   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// // }

// // function getRandom(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // function FloatingText({ text, onDone }) {
// //   const [style, setStyle] = useState({
// //     top: getRandom(10, 85) + "vh",
// //     left: getRandom(5, 90) + "vw",
// //     opacity: 0,
// //     fontSize: getRandom(12, 24) + "px",
// //     scale: 0.8,
// //   });

// //   useEffect(() => {
// //     let mounted = true;
// //     let frame;
// //     let start;

// //     const animate = (t) => {
// //       if (!start) start = t;
// //       const elapsed = t - start;

// //       const progress = Math.min(elapsed / CYCLE_TIME, 1);

// //       const opacity =
// //         progress < 0.1
// //           ? progress / 0.1
// //           : progress > 0.9
// //           ? (1 - progress) / 0.1
// //           : 1;

// //       const scale = 0.9 + 0.1 * Math.sin(progress * Math.PI);

// //       const top =
// //         parseFloat(style.top) + 1.5 * Math.sin(progress * 2 * Math.PI);
// //       const left =
// //         parseFloat(style.left) + 1.5 * Math.cos(progress * 2 * Math.PI);

// //       if (mounted) {
// //         setStyle((prev) => ({
// //           ...prev,
// //           top: `${top}vh`,
// //           left: `${left}vw`,
// //           opacity,
// //           scale,
// //         }));
// //       }

// //       if (progress < 1) {
// //         frame = requestAnimationFrame(animate);
// //       } else {
// //         onDone();
// //       }
// //     };

// //     const delay = getRandom(0, 7000);
// //     const timer = setTimeout(() => {
// //       frame = requestAnimationFrame(animate);
// //     }, delay);

// //     return () => {
// //       mounted = false;
// //       clearTimeout(timer);
// //       cancelAnimationFrame(frame);
// //     };
// //   }, []);

// //   return (
// //     <div
// //       className="pointer-events-none select-none fixed italic font-marck leading-tight text-white/80 text-shadow-sm transition-opacity transition-transform duration-500 ease-in-out line-clamp-2 max-w-[24ch]"
// //       style={{
// //         top: style.top,
// //         left: style.left,
// //         fontSize: style.fontSize,
// //         opacity: style.opacity,
// //         transform: `scale(${style.scale})`,
// //         textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
// //       }}
// //     >
// //       {truncateText(text)}
// //     </div>
// //   );
// // }

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);
// //   const allTexts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim())
// //     .filter(Boolean);

// //   const [visible, setVisible] = useState([]);
// //   const queueRef = useRef([...allTexts]);

// //   const handleDone = (id) => {
// //     setVisible((prev) => prev.filter((el) => el.id !== id));
// //   };

// //   useEffect(() => {
// //     if (!allTexts.length) return;

// //     const interval = setInterval(() => {
// //       setVisible((prev) => {
// //         if (prev.length >= TOTAL_VISIBLE) return prev;

// //         const nextText = queueRef.current.shift();
// //         if (!nextText) {
// //           queueRef.current = [...allTexts];
// //           return prev;
// //         }

// //         const newItem = {
// //           id: Date.now() + Math.random(),
// //           text: nextText,
// //         };
// //         return [...prev, newItem];
// //       });
// //     }, 4000);

// //     return () => clearInterval(interval);
// //   }, [allTexts]);

// //   return (
// //     <>
// //       {visible.map(({ id, text }) => (
// //         <FloatingText key={id} text={text} onDone={() => handleDone(id)} />
// //       ))}
// //     </>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";

// // const truncateText = (text, maxLength = 100) => {
// //   if (!text) return "";
// //   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// // };

// // function getRandom(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // const FloatingText = ({ text, index }) => {
// //   const [style, setStyle] = useState({
// //     top: getRandom(10, 90) + "vh",
// //     left: getRandom(5, 95) + "vw",
// //     opacity: 0,
// //     fontSize: getRandom(14, 20) + "px",
// //     scale: 1,
// //   });

// //   useEffect(() => {
// //     let frame;
// //     let startTime;
// //     const duration = getRandom(20000, 35000); // 20–35 сек
// //     const fadeTime = 3000;

// //     const initialTop = parseFloat(style.top);
// //     const initialLeft = parseFloat(style.left);
// //     const xShift = getRandom(-5, 5);
// //     const yShift = getRandom(-5, 5);
// //     const scaleBase = getRandom(0.95, 1.05);

// //     const animate = (time) => {
// //       if (!startTime) startTime = time;
// //       const t = time - startTime;
// //       const progress = Math.min(t / duration, 1);

// //       const newTop = initialTop + yShift * Math.sin(progress * 2 * Math.PI);
// //       const newLeft = initialLeft + xShift * Math.cos(progress * 2 * Math.PI);
// //       const newScale = scaleBase + 0.02 * Math.sin(progress * 2 * Math.PI);
// //       const fadeInOut =
// //         t < fadeTime
// //           ? t / fadeTime
// //           : t > duration - fadeTime
// //           ? (duration - t) / fadeTime
// //           : 1;

// //       setStyle((prev) => ({
// //         ...prev,
// //         top: `${newTop}vh`,
// //         left: `${newLeft}vw`,
// //         opacity: Math.max(0, fadeInOut),
// //         scale: newScale,
// //       }));

// //       if (progress < 1) {
// //         frame = requestAnimationFrame(animate);
// //       }
// //     };

// //     const delay = getRandom(0, 5000);
// //     const timeout = setTimeout(() => {
// //       frame = requestAnimationFrame(animate);
// //     }, delay);

// //     return () => {
// //       cancelAnimationFrame(frame);
// //       clearTimeout(timeout);
// //     };
// //   }, [index]);

// //   return (
// //     <div
// //       className="fixed pointer-events-none select-none text-white/80 font-marck text-shadow-sm leading-tight tracking-tight italic font-thin line-clamp-2 max-w-[26ch] transition-opacity duration-1000 ease-in-out"
// //       style={{
// //         top: style.top,
// //         left: style.left,
// //         fontSize: style.fontSize,
// //         opacity: style.opacity,
// //         transform: `scale(${style.scale})`,
// //         textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
// //       }}
// //     >
// //       {truncateText(text)}
// //     </div>
// //   );
// // };

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);
// //   const [visibleTexts, setVisibleTexts] = useState([]);

// //   useEffect(() => {
// //     if (!snippets?.length) return;

// //     const addText = () => {
// //       setVisibleTexts((prev) => {
// //         const textsOnly = snippets
// //           .filter((s) => !!s.text)
// //           .map((s) => s.text.trim())
// //           .filter(Boolean);

// //         if (!textsOnly.length) return prev;

// //         const available = textsOnly.filter((t) => !prev.includes(t));
// //         const newText =
// //           available.length > 0
// //             ? available[Math.floor(Math.random() * available.length)]
// //             : textsOnly[Math.floor(Math.random() * textsOnly.length)];

// //         const updated = [...prev, newText];
// //         if (updated.length > 10) updated.shift();
// //         return updated;
// //       });
// //     };

// //     addText();
// //     const interval = setInterval(addText, getRandom(4000, 7000));
// //     return () => clearInterval(interval);
// //   }, [snippets]);

// //   return (
// //     <>
// //       {visibleTexts.map((text, index) => (
// //         <FloatingText key={`${text}-${index}`} text={text} index={index} />
// //       ))}
// //     </>
// //   );
// // }
// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";

// // function truncateText(text, maxLength = 100) {
// //   if (!text) return "";
// //   return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
// // }

// // function getRandom(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // let globalIndex = 0;

// // const FloatingText = ({ text, onComplete }) => {
// //   const [style, setStyle] = useState({
// //     top: getRandom(10, 85),
// //     left: getRandom(5, 90),
// //     scale: 0.7,
// //     opacity: 0,
// //   });

// //   useEffect(() => {
// //     let animationFrame;
// //     let startTime = null;
// //     const duration = getRandom(12000, 20000); // в мс
// //     const initialTop = style.top;
// //     const initialLeft = style.left;
// //     const initialScale = style.scale;

// //     const step = (time) => {
// //       if (!startTime) startTime = time;
// //       const elapsed = time - startTime;
// //       const progress = elapsed / duration;

// //       // Появление и исчезновение
// //       const fadeProgress =
// //         progress < 0.1
// //           ? progress * 10
// //           : progress > 0.9
// //           ? (1 - progress) * 10
// //           : 1;

// //       // Плавное движение по синусоиде
// //       const offsetX = 5 * Math.sin(progress * 2 * Math.PI);
// //       const offsetY = 5 * Math.cos(progress * 2 * Math.PI);

// //       const newScale = 0.7 + 0.3 * Math.sin(progress * Math.PI);

// //       setStyle({
// //         top: initialTop + offsetY,
// //         left: initialLeft + offsetX,
// //         opacity: 0.2 + 0.8 * fadeProgress,
// //         scale: newScale,
// //       });

// //       if (progress < 1) {
// //         animationFrame = requestAnimationFrame(step);
// //       } else {
// //         onComplete();
// //       }
// //     };

// //     animationFrame = requestAnimationFrame(step);
// //     return () => cancelAnimationFrame(animationFrame);
// //   }, []);

// //   return (
// //     <div
// //       className="fixed pointer-events-none select-none text-white font-marck text-shadow-sm leading-[1.2] max-w-[24ch] line-clamp-2"
// //       style={{
// //         top: `${style.top}vh`,
// //         left: `${style.left}vw`,
// //         fontSize: `${style.scale * 1.5}rem`,
// //         opacity: style.opacity,
// //         lineHeight: `${1 + style.scale * 0.4}em`,
// //         transition: "opacity 1s linear, font-size 2s ease, line-height 2s ease",
// //       }}
// //     >
// //       {truncateText(text)}
// //     </div>
// //   );
// // };

// // export default function FloatingDreamTexts() {
// //   const snippets = useSelector((state) => state.snippets.snippets);
// //   const texts = snippets
// //     .filter((s) => !!s.text)
// //     .map((s) => s.text.trim())
// //     .filter(Boolean);

// //   const [activeTexts, setActiveTexts] = useState([]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setActiveTexts((prev) => {
// //         if (prev.length >= 7) return prev;
// //         const nextText = texts[globalIndex % texts.length];
// //         globalIndex++;
// //         return [...prev, { id: Date.now(), text: nextText }];
// //       });
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, [texts]);

// //   const handleComplete = (id) => {
// //     setActiveTexts((prev) => prev.filter((t) => t.id !== id));
// //   };

// //   return (
// //     <>
// //       {activeTexts.map((entry) => (
// //         <FloatingText
// //           key={entry.id}
// //           text={entry.text}
// //           onComplete={() => handleComplete(entry.id)}
// //         />
// //       ))}
// //     </>
// //   );
// // }
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const MSpan = motion.span;
const MDiv = motion.div;
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function truncateText(text, maxLength = 100) {
  if (!text) return "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "…";
}

const FloatingText = ({ text, onComplete }) => {
  const duration = getRandom(20000, 30000); // 20–30 сек
  const delay = getRandom(0, 3000);

  const xStart = getRandom(5, 90); // vw
  const yStart = getRandom(5, 85); // vh

  const xEnd = xStart + getRandom(-10, 10);
  const yEnd = yStart + getRandom(-10, 10);

  const scaleStart = getRandom(0.8, 1);
  const scaleEnd = getRandom(1.1, 1.3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete?.();
    }, duration + delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <MDiv
      className="fixed pointer-events-none select-none text-white/80 font-marck italic font-thin text-shadow-sm max-w-[24ch]"
      style={{
        top: 0,
        left: 0,
        fontSize: "1.2rem",
        lineHeight: "1.4",
        textShadow: "0 0 6px rgba(255,255,255,0.5)",
      }}
      initial={{
        opacity: 0,
        scale: scaleStart,
        x: `${xStart}vw`,
        y: `${yStart}vh`,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [scaleStart, scaleEnd, scaleEnd, scaleStart],
        x: [`${xStart}vw`, `${xEnd}vw`, `${xStart}vw`],
        y: [`${yStart}vh`, `${yEnd}vh`, `${yStart}vh`],
      }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: "easeInOut",
      }}
    >
      {truncateText(text)}
    </MDiv>
  );
};

export default function FloatingDreamTexts() {
  const snippets = useSelector((state) => state.snippets.snippets);
  const texts = snippets
    .filter((s) => !!s.text)
    .map((s) => s.text.trim())
    .filter(Boolean);

  const [activeTexts, setActiveTexts] = useState([]);
  const globalIndexRef = useRef(0);

  useEffect(() => {
    if (texts.length === 0) return;

    const interval = setInterval(() => {
      setActiveTexts((prev) => {
        if (prev.length >= 7) return prev;

        const nextText = texts[globalIndexRef.current % texts.length];
        globalIndexRef.current++;

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: nextText,
          },
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [texts]);

  const handleComplete = (id) => {
    setActiveTexts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {activeTexts.map((entry) => (
        <FloatingText
          key={entry.id}
          text={entry.text}
          onComplete={() => handleComplete(entry.id)}
        />
      ))}
    </>
  );
}
