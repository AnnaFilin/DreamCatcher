import { themeFonts, themeSpacing } from "../../utils/themeTokens";
import { cleanString, LIMITS } from "../../utils/sanitize";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

const SearchField = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const next = cleanString(e.target.value).slice(0, LIMITS.searchMax || 200);
    setSearchQuery(next);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={t("search.placeholder")}
        className={`bg-transparent border border-white/20 rounded ${themeSpacing.inputControl.height} ${themeSpacing.inputControl.paddingX} ${themeFonts.subtitle} text-white w-full focus:outline-none focus:ring-0 focus:border-white/40`}
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        lang={i18n.language}
        dir={i18n.language === "he" ? "rtl" : "ltr"}
      />
    </div>
  );
};
export default SearchField;
