import { themeFonts } from "../../utils/themeTokens";

const InterpretationBlock = ({ interpretation }) => {
  if (!interpretation) return null;

  return (
    <div
      className={`
        mt-2 sm:mt-4
        max-h-screen-safe 
 border border-white/10 rounded-2xl shadow-md px-4 pr-2 md:px-6 md:pr-3 py-5 max-w-prose mx-auto space-y-2 
      md:py-6 
      `}
    >
      <h3 className={`${themeFonts.sectionTitle} mb-4 sm:mb-0`}>
        INTERPRETATION
      </h3>

      <div
        className={`
    overflow-visible
    sm:overflow-y-auto
    sm:max-h-[28vh]
    custom-scrollbar pr-4
    ${themeFonts.base}
    text-white/40
    leading-[1.65] sm:leading-[1.75]
    text-left
    space-y-4
  `}
      >
        {interpretation.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
};

export default InterpretationBlock;
