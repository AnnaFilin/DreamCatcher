import SnippetInput from "./SnippetInput";
import { themeFonts, themeColors, themeRadii } from "../../utils/themeTokens";
import LucidStats from "./LucidStats";

const DreamJournalCard = () => {
  return (
    <div className="relative flex-1 flex flex-col justify-between">
      <div className="absolute -inset-2 bg-white opacity-5 blur-2xl rounded-2xl"></div>

      <div
        className={`relative z-10  ${themeColors.blockBg} 
          ${themeColors.blockBlur}
          ${themeColors.blockBorder} ${themeColors.blockGlow}
          ${themeColors.blockGlow}   ${themeRadii.base}
          p-4 md:px-6 md:py-4 lg:px-8 lg:py-6 2xl:py-8`}
      >
        <div className="flex justify-between items-start mb-2 gap-4">
          <h2 className={`${themeFonts.sectionTitle} text-white `}>
            Dream Journal
          </h2>
          <div className="hidden lg:block pt-1 whitespace-nowrap text-xs text-white/50 font-sans">
            <LucidStats />
          </div>
        </div>

        <p
          className={`${themeFonts.subtitle} mb-6 lg:mb-4 2xl:mb-6 break-words`}
        >
          Write down your dreams right after waking up. The more often you do
          it, the better you’ll remember them — and the easier it becomes to
          recognize when you're dreaming.
        </p>

        <SnippetInput />
      </div>
    </div>
  );
};

export default DreamJournalCard;
