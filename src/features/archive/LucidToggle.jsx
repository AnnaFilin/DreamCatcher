import EyeIcon from "../icons/EyeIcon";
import { lucidControlClass } from "../../utils/themeTokens";
import { useTranslation } from "react-i18next";

const LucidToggle = ({ lucidOnly, setLucidOnly }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setLucidOnly(!lucidOnly)}
      className={`flex items-center gap-2 group ${lucidControlClass}`}
    >
      <span>{t("lucid.label")}</span>
      <EyeIcon
        active={lucidOnly}
        className="w-5 h-5 transition-opacity group-hover:opacity-80"
      />
    </button>
  );
};

export default LucidToggle;
