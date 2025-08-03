import { useTranslation } from "react-i18next";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeRadii,
  themeEffects,
} from "../../utils/themeTokens";

const ButtonSave = ({ onClick, fullWidth = false }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick?.();
      }}
      className={`
      ${fullWidth ? "w-full border border-white/20" : ""}
      ${themeFonts.tag}
      ${themeColors.glowSoft}
      ${themeSpacing.button}
      ${themeRadii.sm}
      ${themeEffects.button.base}
      ${themeEffects.button.hover}
      ${themeEffects.button.active}
      text-center
    `}
    >
      {t("buttons.save")}
    </button>
  );
};

export default ButtonSave;
