// import { useContext, useEffect, useState } from "react";
import { DreamContext } from "../../contexts/DreamContext";
import { db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
import { generateDreamInterpretation } from "../../utils/generateDreamInterpretation";

// export const DreamModal = () => {
//   const { isModalOpen, setIsModalOpen, currentDream } =
//     useContext(DreamContext);

//   const [symbols, setSymbols] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [interpretation, setInterpretation] = useState("");

//   useEffect(() => {
//     if (!currentDream || !currentDream.motifs) return;

//     const fetchSymbols = async () => {
//       const promises = currentDream.motifs.map(async (motif) => {
//         const ref = doc(db, "symbols", motif);
//         const snap = await getDoc(ref);
//         if (snap.exists()) return snap.data();
//         return null;
//       });

//       const results = await Promise.all(promises);
//       setSymbols(results.filter(Boolean));
//     };

//     fetchSymbols();
//   }, [currentDream]);

//   if (!isModalOpen || !currentDream) return null;

//   const dreamDate = currentDream.createdAt
//     ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//       })
//     : "Dream Detail";

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     try {
//       const result = await generateDreamInterpretation({
//         text: currentDream.text,
//         symbols,
//       });
//       setInterpretation(result);
//     } catch (err) {
//       console.error("❌ Interpretation error:", err);
//       setInterpretation(
//         "Something went wrong while generating interpretation."
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
//       onClick={() => setIsModalOpen(false)}
//     >
//       <div
//         className="
//       relative max-w-2xl w-full mx-4 px-10 py-10
//       rounded-3xl bg-white/5 backdrop-blur-2xl
//       ring-1 ring-white/10 shadow-2xl
//       text-white text-center space-y-6 overflow-hidden
//     "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Внешний ореол */}
//         <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl"></div>

//         {/* Кнопка закрытия */}
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
//         >
//           ✕
//         </button>

//         {/* Заголовок */}
//         <h2 className="text-base uppercase tracking-[0.15em] text-white/50 font-light">
//           Dream Note
//         </h2>

//         {/* 🟢 Блок с датой и текстом + слой под ним */}
//         <div
//           className="
//   bg-white/5
//   border border-white/10
//   rounded-2xl
//   shadow-md
//   px-6 py-5
//   max-w-prose mx-auto space-y-2
// "
//         >
//           <p className="text-xs uppercase tracking-wider text-white/40">
//             {dreamDate}
//           </p>

//           <p className="font-lora italic font-thin text-base text-white/90 leading-relaxed text-justify">
//             {currentDream.text}
//           </p>
//         </div>

//         {currentDream.motifs?.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-12 mt-4">
//             {currentDream.motifs.map((m) => (
//               <span
//                 key={m}
//                 className="
//     px-4 py-1.5
//     text-base text-white/40
//     drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]
//     tracking-wider
//     filter blur-[0.5px]
//   "
//               >
//                 {m}
//               </span>
//             ))}
//           </div>
//         )}

//         {interpretation && (
//           <div className="pt-4 border-t border-white/10 max-w-prose mx-auto">
//             <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1">
//               Interpretation
//             </h3>
//             <p className="text-sm text-white/80 font-lora whitespace-pre-line text-justify">
//               {interpretation}
//             </p>
//           </div>
//         )}

//         <div>
//           <button
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className="
//     mt-4 text-sm uppercase tracking-widest
//     text-white/70 hover:text-white/90
//      drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]
//     transition
//     disabled:opacity-40
//   "
//           >
//             {isGenerating ? "Generating..." : "Generate Interpretation"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// import { useContext, useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { DreamContext } from "../contexts/DreamContext";
// import { generateDreamInterpretation } from "../utils/generateDreamInterpretation";
// import {
//   themeColors,
//   themeEffects,
//   themeFonts,
//   themeMotif,
//   themeRadii,
//   themeBorders,
//   themeBlur,
//   themeSpacing,
// } from "../../utils/themeTokens";
// import { themeFonts } from "../../utils/themeTokens";

// export const DreamModal = () => {
//   const { isModalOpen, setIsModalOpen, currentDream } =
//     useContext(DreamContext);

//   const [symbols, setSymbols] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [interpretation, setInterpretation] = useState("");

//   useEffect(() => {
//     if (!currentDream?.motifs) return;

//     const fetchSymbols = async () => {
//       const promises = currentDream.motifs.map(async (motif) => {
//         const ref = doc(db, "symbols", motif);
//         const snap = await getDoc(ref);
//         return snap.exists() ? snap.data() : null;
//       });
//       const results = await Promise.all(promises);
//       setSymbols(results.filter(Boolean));
//     };

//     fetchSymbols();
//   }, [currentDream]);

//   if (!isModalOpen || !currentDream) return null;

//   const dreamDate = currentDream.createdAt
//     ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//       })
//     : "Dream Detail";

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     try {
//       const result = await generateDreamInterpretation({
//         text: currentDream.text,
//         symbols,
//       });
//       setInterpretation(result);
//     } catch (err) {
//       console.error("❌ Interpretation error:", err);
//       setInterpretation(
//         "Something went wrong while generating interpretation."
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
//       onClick={() => setIsModalOpen(false)}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`
//           relative w-full max-w-2xl mx-4 sm:mx-6 px-6 sm:px-10 py-10
//           ${themeRadii.lg}
//           ${themeColors.blockBg}
//           ${themeBorders.subtle}
//           ${themeBlur.strong}
//           shadow-2xl text-white text-center space-y-6 overflow-hidden
//         `}
//       >
//         {/* Glow backdrop */}
//         <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl" />

//         {/* Закрыть */}
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
//         >
//           ✕
//         </button>

//         {/* Заголовок */}
//         <h2 className={themeFonts.labelMuted}>Dream Note</h2>

//         {/* Основной блок текста */}
//         <div
//           className={`
//             ${themeColors.blockBg} ${themeBorders.subtle} ${themeRadii.base} shadow-md
//             px-6 py-5 max-w-prose mx-auto space-y-2
//           `}
//         >
//           <p className={themeFonts.controlLabel}>{dreamDate}</p>

//           <p className={`italic font-lora ${themeFonts.input} text-justify`}>
//             {currentDream.text}
//           </p>
//         </div>

//         {/* Мотивы */}
//         {currentDream.motifs?.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
//             {currentDream.motifs.map((m) => (
//               <span
//                 key={m}
//                 className={`${themeMotif.base} ${themeMotif.hover} text-sm`}
//               >
//                 {m}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Интерпретация */}
//         {interpretation && (
//           <div className="pt-4 border-t border-white/10 max-w-prose mx-auto">
//             <h3 className={`${themeFonts.controlLabel} mb-1`}>
//               Interpretation
//             </h3>
//             <p
//               className={`whitespace-pre-line text-justify italic font-lora ${themeFonts.input}`}
//             >
//               {interpretation}
//             </p>
//           </div>
//         )}

//         {/* Кнопка */}
//         <div>
//           <button
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className={`
//               mt-4 ${themeFonts.labelMuted} ${themeSpacing.button}
//               ${themeEffects.button.hover} ${themeEffects.button.active}
//               disabled:opacity-40
//             `}
//           >
//             {isGenerating ? "Generating..." : "Generate Interpretation"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FontTest = ({ text }) => {
//   return (
//     <div className="p-8 space-y-6">
//       <p className="font-caveat">Caveat: I am writing my dream here. {text}</p>
//       <p className="font-patrick ">
//         Patrick Hand: I am writing my dream here. {text}
//       </p>
//       <p className="font-labelle ">
//         La Belle Aurore: I am writing my dream here. {text}
//       </p>
//       <p className="font-sacramento ">
//         Sacramento: I am writing my dream here. {text}
//       </p>
//     </div>
//   );
// };

// export const DreamModal = () => {
//   const { isModalOpen, setIsModalOpen, currentDream } =
//     useContext(DreamContext);
//   const [symbols, setSymbols] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [interpretation, setInterpretation] = useState("");

//   useEffect(() => {
//     if (!currentDream?.motifs) return;
//     const fetchSymbols = async () => {
//       const promises = currentDream.motifs.map(async (motif) => {
//         const ref = doc(db, "symbols", motif);
//         const snap = await getDoc(ref);
//         return snap.exists() ? snap.data() : null;
//       });
//       const results = await Promise.all(promises);
//       setSymbols(results.filter(Boolean));
//     };
//     fetchSymbols();
//   }, [currentDream]);

//   if (!isModalOpen || !currentDream) return null;

//   const dreamDate = currentDream.createdAt
//     ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//       })
//     : "Dream Detail";

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     try {
//       const result = await generateDreamInterpretation({
//         text: currentDream.text,
//         symbols,
//       });
//       setInterpretation(result);
//     } catch (err) {
//       console.error("❌ Interpretation error:", err);
//       setInterpretation(
//         "Something went wrong while generating interpretation."
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
//       onClick={() => setIsModalOpen(false)}
//     >
//       <div
//         className="
//           relative w-full max-w-3xl mx-auto
//           rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-2xl
//           text-white text-center space-y-6 overflow-hidden py-12 px-8 sm:px-12 md:px-16
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Свечение фона */}
//         <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl" />

//         {/* Закрытие */}
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-6 right-6 text-white/30 hover:text-white/90 transition text-lg"
//         >
//           ✕
//         </button>

//         {/* Заголовок */}
//         <h2 className="text-sm uppercase tracking-[0.18em] text-white/40 font-light">
//           Dream Note
//         </h2>

//         {/* Текст сна */}
//         <div className="bg-white/5 border border-white/10 rounded-2xl shadow-md px-6 py-5 max-w-prose mx-auto space-y-2">
//           <p className="text-xs uppercase tracking-wider text-white/40">
//             {dreamDate}
//           </p>
//           <p className="font-lora italic font-thin text-base text-white/90 leading-relaxed text-justify">
//             {currentDream.text}
//           </p>
//         </div>

//         {/* Мотивы */}
//         {currentDream.motifs?.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2">
//             {currentDream.motifs.map((m) => (
//               <span
//                 key={m}
//                 className="
//                   px-4 py-1.5 rounded-full
//                   text-sm tracking-widest
//                   text-white/50 bg-white/10
//                   shadow-[0_0_8px_rgba(255,255,255,0.1)]
//                   hover:bg-white/20 hover:text-white
//                   transition-all duration-200
//                 "
//               >
//                 {m}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Интерпретация */}
//         {interpretation && (
//           <div className="pt-4 border-t border-white/10 max-w-prose mx-auto">
//             <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1">
//               Interpretation
//             </h3>
//             <p className="text-sm text-white/80 font-lora whitespace-pre-line text-justify">
//               {interpretation}
//             </p>
//           </div>
//         )}

//         {/* Кнопка */}
//         <div>
//           <button
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className="
//               mt-6 text-xs uppercase tracking-[0.18em]
//               px-6 py-2 rounded-full
//               bg-white/10 text-white/70 hover:bg-white/20 hover:text-white
//               backdrop-blur-sm shadow-[0_0_6px_rgba(255,255,255,0.15)]
//               transition-all duration-200
//               disabled:opacity-30
//             "
//           >
//             {isGenerating ? "Generating..." : "Generate Interpretation"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export const DreamModal = () => {
//   const { isModalOpen, setIsModalOpen, currentDream } =
//     useContext(DreamContext);

//   const [symbols, setSymbols] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [interpretation, setInterpretation] = useState("");

//   useEffect(() => {
//     if (!currentDream || !currentDream.motifs) return;

//     const fetchSymbols = async () => {
//       const promises = currentDream.motifs.map(async (motif) => {
//         const ref = doc(db, "symbols", motif);
//         const snap = await getDoc(ref);
//         if (snap.exists()) return snap.data();
//         return null;
//       });

//       const results = await Promise.all(promises);
//       setSymbols(results.filter(Boolean));
//     };

//     fetchSymbols();
//   }, [currentDream]);

//   if (!isModalOpen || !currentDream) return null;

//   const dreamDate = currentDream.createdAt
//     ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//       })
//     : "Dream Detail";

//   const handleGenerate = async () => {
//     setIsGenerating(true);
//     try {
//       const result = await generateDreamInterpretation({
//         text: currentDream.text,
//         symbols,
//       });
//       setInterpretation(result);
//     } catch (err) {
//       console.error("❌ Interpretation error:", err);
//       setInterpretation(
//         "Something went wrong while generating interpretation."
//       );
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
//       onClick={() => setIsModalOpen(false)}
//     >
//       <div
//         className="
//           relative max-w-2xl w-full mx-4 px-10 py-10
//           rounded-3xl bg-white/5 backdrop-blur-2xl
//           ring-1 ring-white/10 shadow-2xl
//           text-white text-center space-y-6 overflow-hidden
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl" />

//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
//         >
//           ✕
//         </button>

//         <h2 className="text-base uppercase tracking-[0.15em] text-white/50 font-light">
//           Dream Note
//         </h2>

//         <div
//           className="
//             bg-white/5 border border-white/10
//             rounded-2xl shadow-md px-6 py-5
//             max-w-prose mx-auto space-y-2
//           "
//         >
//           <p className="text-xs uppercase tracking-wider text-white/40">
//             {dreamDate}
//           </p>

//           <p className="font-lora italic font-thin text-base text-white/90 leading-relaxed text-justify">
//             {currentDream.text}
//           </p>
//         </div>

//         {currentDream.motifs?.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-6 mt-4">
//             {currentDream.motifs.map((m) => (
//               <span
//                 key={m}
//                 className="
//                   text-sm font-lora italic text-white/40
//                   tracking-wider drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]
//                   hover:text-white/80 transition cursor-default
//                 "
//               >
//                 {m}
//               </span>
//             ))}
//           </div>
//         )}

//         {interpretation && (
//           <div className="pt-4 border-t border-white/10 max-w-prose mx-auto">
//             <h3 className="text-xs uppercase tracking-widest text-white/40 mb-1">
//               Interpretation
//             </h3>
//             <p className="text-sm text-white/80 font-lora whitespace-pre-line text-justify">
//               {interpretation}
//             </p>
//           </div>
//         )}

//         <div>
//           <button
//             onClick={handleGenerate}
//             disabled={isGenerating}
//             className="
//               mt-4 text-sm font-medium tracking-wide uppercase
//               text-white/50 hover:text-white/90 transition
//               disabled:opacity-40
//             "
//           >
//             {isGenerating ? "Generating..." : "Generate Interpretation"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
// import { DreamContext } from "../context/DreamContext";
import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { generateDreamInterpretation } from "../utils/openai";

const DreamModal = () => {
  const { isModalOpen, setIsModalOpen, currentDream } =
    useContext(DreamContext);
  const [symbols, setSymbols] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [interpretation, setInterpretation] = useState("");

  useEffect(() => {
    if (!currentDream || !currentDream.motifs) return;

    const fetchSymbols = async () => {
      const promises = currentDream.motifs.map(async (motif) => {
        const ref = doc(db, "symbols", motif);
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() : null;
      });
      const results = await Promise.all(promises);
      setSymbols(results.filter(Boolean));
    };

    fetchSymbols();
  }, [currentDream]);

  if (!isModalOpen || !currentDream) return null;

  const dreamDate = currentDream.createdAt
    ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateDreamInterpretation({
        text: currentDream.text,
        symbols,
      });
      setInterpretation(result);
    } catch (err) {
      console.error("❌ Interpretation error:", err);
      setInterpretation(
        "Something went wrong while generating interpretation."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative max-w-2xl w-full mx-2 md:mx-4 px-2 md:px-6 py-8 rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-2xl text-white text-center space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl" />

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
        >
          ✕
        </button>

        <div className="text-xs uppercase italic tracking-[0.15em] text-white/40 font-light">
          {dreamDate}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-md px-4 md:px-6 py-5 max-w-prose mx-auto space-y-2">
          <p
            className=" text-white/60
  
  tracking-tight
  italic
 font-thin  font-marck leading-relaxed text-justify"
          >
            {currentDream.text}
          </p>
        </div>

        {currentDream.motifs?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-12 mt-2 md:mt-4">
            {currentDream.motifs.map((m) => (
              <span
                key={m}
                className="
          text-sm font-sans text-white/40 tracking-wider cursor-default
          drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]
          [text-shadow:_0_0_8px_rgba(255,255,255,0.15)]
        "
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {interpretation && (
          <div className="pt-4 border-t border-white/10 max-w-prose mx-auto">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">
              Interpretation
            </h3>
            <div className="space-y-3 text-sm text-white/80 font-sans leading-relaxed text-justify">
              {interpretation.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {!interpretation && (
          <div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-2 md:mt-4 text-sm font-medium tracking-wide uppercase text-white/60 hover:text-white/90 transition disabled:opacity-40"
            >
              {isGenerating ? "Generating..." : "Generate Interpretation"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamModal;
