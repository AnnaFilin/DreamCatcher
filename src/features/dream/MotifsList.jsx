import { formatMotif } from "../../utils/formatMotif";

const MotifsList = ({ motifs }) => {
  if (!motifs || motifs.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-12 mt-2 md:mt-4">
      {motifs.map((m) => {
        const label = formatMotif(m);

        return (
          <span
            key={label}
            className="text-sm font-sans text-white/40 tracking-wider cursor-default drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] [text-shadow:_0_0_8px_rgba(255,255,255,0.15)]"
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

export default MotifsList;
