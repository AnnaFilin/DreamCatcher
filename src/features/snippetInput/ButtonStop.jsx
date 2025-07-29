import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeEffects,
} from "../../utils/themeTokens";

const ButtonStop = ({ onClick, variant }) => {
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
      <MicIcon className="w-5 h-5 opacity-80" />
      Stop
    </button>
  );
};
// ${themeRadii.md}

export default ButtonStop;
