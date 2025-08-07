import { useSelector } from "react-redux";
import { themeFonts, themeMotif, themeSpacing } from "../../utils/themeTokens";
import { formatMotif } from "../../utils/formatMotif";

const MotifSelector = ({ selectedMotif, toggleMotif }) => {
  const motifs = useSelector((state) => state.motifs.motifs);

  return (
    <div className="relative mask-fade-bottom-wrapper">
      <div className="max-h-[4.5rem] overflow-y-auto custom-scrollbar pr-1">
        <div className="flex flex-wrap gap-2 pr-2">
          {motifs.map((motifObj) => {
            const label = formatMotif(motifObj);

            return (
              <button
                key={label}
                onClick={() => toggleMotif(label)}
                className={`h-6 md:h-8  ${
                  themeSpacing.inputControl.paddingX
                } rounded-full border border-white/20 bg-white/5 text-white/40
                ${
                  selectedMotif === label ? themeMotif.active : themeMotif.hover
                }
                ${themeFonts.subtitle}
                cursor-pointer
              `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MotifSelector;
