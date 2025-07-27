import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const MSpan = motion.span;

const KeyMotifs = () => {
  const motifs = useSelector((state) => state.motifs.motifs);

  const limitedMotifs = motifs.slice(0, 10).map((label) => ({
    label,
    frequency: Math.random(),
  }));

  const gridCols = 5;
  const gridRows = 2;
  const cellW = 100 / gridCols; // %
  const cellH = 100 / gridRows;

  const used = new Set();
  const motifsWithPos = limitedMotifs.map((m) => {
    let pos;
    let col, row;

    do {
      col = Math.floor(Math.random() * gridCols);
      row = Math.floor(Math.random() * gridRows);
      pos = `${col},${row}`;
    } while (used.has(pos));

    used.add(pos);

    return {
      ...m,
      top: row * cellH + Math.random() * (cellH / 3),
      left: col * cellW + Math.random() * (cellW / 3),
    };
  });

  return (
    <div className="w-full h-full p-4">
      <div className="relative w-full h-full">
        {motifsWithPos.map((m, i) => {
          const baseScale = 0.8 + m.frequency * 0.4;
          const baseOpacity = 0.3 + m.frequency * 0.4;

          return (
            <MSpan
              key={i}
              initial={{ opacity: baseOpacity, scale: baseScale }}
              animate={{
                opacity: [baseOpacity, baseOpacity * 1.1, baseOpacity],
                scale: [baseScale, baseScale * 1.08, baseScale],
              }}
              transition={{
                duration: 14 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute text-white/60 font-sora pointer-events-none select-none whitespace-nowrap"
              style={{
                top: `${m.top}%`,
                left: `${m.left}%`,
                fontSize: `${1 + m.frequency * 0.8}rem`,
              }}
            >
              {m.label}
            </MSpan>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMotifs;
