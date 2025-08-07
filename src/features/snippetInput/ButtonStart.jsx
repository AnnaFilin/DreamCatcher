import { useTranslation } from "react-i18next";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeEffects,
} from "../../utils/themeTokens";
import { MicIcon } from "../icons/MicIcon";

const ButtonStart = ({ onClick, variant }) => {
  const { t } = useTranslation();
  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        className={`
              group
          flex items-center justify-center sm:hidden
          ${themeEffects.iconButton.base}
          ${themeEffects.iconButton.hover}
          ${themeEffects.iconButton.active}
        `}
      >
        <MicIcon className="w-8 h-8 sm:w-9 sm:h-9 opacity-60 group-hover:opacity-90 group-active:opacity-100 transition-opacity duration-200 stroke-[1.4]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2
        ${themeFonts.tag}
        ${themeColors.glowSoft}
        ${themeSpacing.button}
        ${themeEffects.button.base}
        ${themeEffects.button.hover}
        ${themeEffects.button.active}
      `}
    >
      <MicIcon className="w-5 h-5 opacity-80" />
      {t("buttons.record")}
    </button>
  );
};

export default ButtonStart;
