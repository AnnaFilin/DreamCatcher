import { useTranslation } from "react-i18next";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeEffects,
} from "../../utils/themeTokens";
import { MicIcon } from "./ButtonStart";

const ButtonStop = ({ onClick, variant, isRecording }) => {
  const { t } = useTranslation();

  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center w-9 h-9 sm:hidden
          ${themeEffects.iconButton.base}
          ${themeEffects.iconButton.hover}
          ${themeEffects.iconButton.active}
        `}
      >
        {isRecording && (
          <>
            <span className="absolute w-10 h-10 rounded-full bg-red-500 opacity-70 animate-ping" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-red-500" />
          </>
        )}
        <MicIcon className="w-7 h-7 opacity-90 stroke-[1.4] text-red-500" />
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
      {isRecording && (
        <>
          <span className="absolute w-10 h-10 rounded-full bg-red-500 opacity-70 animate-ping" />
          <span className="absolute w-2.5 h-2.5 rounded-full bg-red-500" />
        </>
      )}

      <MicIcon className="w-5 h-5 opacity-80" />
      {t("buttons.stop")}
    </button>
  );
};

export default ButtonStop;
