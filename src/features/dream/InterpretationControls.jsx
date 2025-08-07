import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import GenerateButton from "./GenerateButton";
import InterpretationBlock from "./InterpretationBlock";

const InterpretationControls = ({
  interpretations = [],
  handleGenerate,
  isGenerating,
  forceShow = false,
  onHide,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (forceShow) {
      const timer = setTimeout(() => {
        setShowAll(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const toggleShow = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next && onHide) onHide();
      return next;
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 min-h-[42px]">
        {interpretations.length > 0 && (
          <button
            onClick={toggleShow}
            className="
              w-full px-4 py-3 border border-white/20 text-sm text-white/80 rounded-md text-center transition
              hover:bg-white/10 hover:text-white active:bg-white/10
              sm:w-auto sm:px-6 sm:py-2 sm:text-xs sm:uppercase sm:tracking-wider sm:text-white/60 sm:border-none
            "
          >
            {showAll
              ? t("buttons.hideInterpretations")
              : t("buttons.showInterpretations", {
                  count: interpretations.length,
                })}
          </button>
        )}

        <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />
      </div>

      {showAll && (
        <div
          className={`
            ${isMobile ? "" : "max-h-[28vh] overflow-y-auto overflow-x-hidden"}
            border border-white/10
            rounded-2xl
            px-4 py-4 pr-5
            custom-scrollbar
          `}
          style={{ scrollbarGutter: isMobile ? "auto" : "stable both-edges" }}
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
