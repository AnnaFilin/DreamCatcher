import { useTranslation } from "react-i18next";

const supportedLanguages = ["en", "ru", "he"];
const languageLabels = {
  en: "en",
  ru: "ru",
  he: "he",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center font-light tracking-widest uppercase text-xs   text-white/40">
      {supportedLanguages.map((lng, index) => (
        <span key={lng} className="flex items-center">
          <button
            onClick={() => changeLanguage(lng)}
            className={`transition hover:text-white/60 ${
              i18n.language === lng
                ? "text-white/60 underline underline-offset-4"
                : ""
            }`}
          >
            {languageLabels[lng]}
          </button>
          {index < supportedLanguages.length - 1 && (
            <span className="px-1 text-white/20">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
