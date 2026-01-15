import { useTranslation } from "react-i18next";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeEffects,
  audioMobileLabel,
} from "../../utils/themeTokens";
import { MicIcon } from "../icons/MicIcon";

const ButtonStop = ({ onClick, variant, isRecording }) => {
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
                <span className={audioMobileLabel}>STOP</span>
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
        ${themeColors.accentRed}
        ${themeSpacing.button}
        ${themeEffects.button.base}
        ${themeEffects.button.hover}
        ${themeEffects.button.active}
      `}
    >
      <MicIcon
        className={`
          w-5 h-5 stroke-[1.4] transition-all duration-700 ease-in-out
          ${
            isRecording
              ? "text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-pulse"
              : "text-white/60"
          }
        `}
      />
      {t("buttons.stop")}
    </button>
  );
};

export default ButtonStop;