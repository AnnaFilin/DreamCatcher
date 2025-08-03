import SnippetInput from "../snippetInput/SnippetInput";
import { themeFonts, themeColors, themeRadii } from "../../utils/themeTokens";
import LucidStats from "./LucidStats";
import { useTranslation } from "react-i18next";

const DreamJournalCard = () => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col flex-grow basis-[66%] max-h-[75vh] z-10
            ${themeColors.blockBg}
            ${themeColors.blockBlur}
            ${themeColors.blockBorder}
            ${themeColors.blockGlow}
            ${themeRadii.base}
            p-4 md:px-6 md:py-4 xl:py-8
          `}
    >
      <div className="flex justify-between items-start mb-4 xl:mb-6 gap-4">
        <div className="inline-block text-balance text-left">
          <h2 className={`${themeFonts.sectionTitle} `}>
            {t("dream_journal.title")}
          </h2>
        </div>
        <div className="hidden lg:block pt-1 text-xs text-white/50">
          <LucidStats />
        </div>
      </div>

      <p className={`${themeFonts.subtitle} mb-5 xl:mb-6`}>
        {t("dream_journal.description")}
      </p>

      <SnippetInput />
    </div>
  );
};

export default DreamJournalCard;
