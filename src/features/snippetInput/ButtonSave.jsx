import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeRadii,
  themeEffects,
} from "../../utils/themeTokens";

const ButtonSave = ({ onClick, fullWidth = false }) => (
  <button
    onClick={onClick}
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
    Save
  </button>
);

export default ButtonSave;
