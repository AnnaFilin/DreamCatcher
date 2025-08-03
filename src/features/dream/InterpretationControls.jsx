import { useState } from "react";
import GenerateButton from "./GenerateButton";
import { useTranslation } from "react-i18next";
import InterpretationBlock from "./InterpretationBlock";

const InterpretationControls = ({
  interpretations = [],
  handleGenerate,
  isGenerating,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const toggleShow = () => setShowAll((prev) => !prev);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 min-h-[42px]">
        <button
          onClick={toggleShow}
          className="
  w-full px-4 py-3 border border-white/20 text-sm text-white/80 rounded-md text-center transition
  hover:bg-white/10 hover:text-white active:bg-white/10
  sm:w-auto sm:px-6 sm:py-2 sm:text-xs sm:uppercase sm:tracking-wider sm:text-white/60 sm:border-none
"
          // className="text-sm font-medium tracking-wide uppercase text-white/60 hover:text-white/90   focus:outline-none focus:ring-0 transition"
        >
          {showAll
            ? t("buttons.hideInterpretations")
            : t("buttons.showInterpretations", {
                count: interpretations.length,
              })}
        </button>

        <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />
      </div>

      {showAll && (
        <div
          className="
      max-h-[28vh]
      overflow-y-auto
      overflow-x-hidden
      border border-white/10
      rounded-2xl
      px-4 py-4 pr-5
      custom-scrollbar
    "
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          <div className="py-4 space-y-6 text-left">
            {interpretations.map((interp, idx) => (
              <InterpretationBlock
                key={interp.id || idx}
                interpretation={interp}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterpretationControls;
