
import { useTranslation } from "react-i18next";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeEffects,
  audioMobileLabel,
} from "../../utils/themeTokens";
import { MicIcon } from "../icons/MicIcon";

const MOBILE_LABEL_CLASS =
  "sm:hidden text-lg font-semibold tracking-[0.3em] pl-5 pr-4 py-2 uppercase text-white/70 leading-none min-h-[44px]";

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
      <span className={audioMobileLabel}>REC</span>

      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-variant={variant || "undefined"}
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

