import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import VividnessIcon from "../icons/VividnessIcon";
import { themeEffects, themeFonts } from "../../utils/themeTokens";
import { useTranslation } from "react-i18next";

const TooltipButton = ({ label, active, onClick, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          ${themeEffects.iconButton.base}
          ${themeEffects.iconButton.hover}
          ${themeEffects.iconButton.active}
          ${
            active
              ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              : "text-white/50"
          }
        `}
      >
        {children}
      </button>

      {label && (
        <>
          <span className={`md:hidden mt-1 ${themeFonts.controlLabelMobile}`}>
            {label}
          </span>
          <span className={`hidden md:inline mt-1 ${themeFonts.controlLabel}`}>
            {label}
          </span>
        </>
      )}

      {showTooltip && label && (
        <div className="absolute top-full mt-1 w-max max-w-xs bg-black/70 text-white text-xs rounded px-2 py-1 shadow-lg select-none pointer-events-none z-50">
          {label}
        </div>
      )}
    </div>
  );
};

export default function LucidVividnessControls({
  isLucid,
  setIsLucid,
  vividness,
  setVividness,
}) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-start gap-4 justify-between">
      <TooltipButton
        label={t("input.lucid")}
        active={isLucid}
        onClick={() => setIsLucid(!isLucid)}
      >
        <EyeIcon active={isLucid} className="w-6 h-6" />
      </TooltipButton>

      <div className="flex flex-col items-center ml-auto">
        <div className="flex items-center gap-4">
          {["Low", "Medium", "High"].map((level) => (
            <TooltipButton
              key={level}
              label=""
              active={vividness === level}
              onClick={() => setVividness(level)}
            >
              <VividnessIcon level={level} active={vividness === level} />
            </TooltipButton>
          ))}
        </div>

       
        <span className={`md:hidden mt-1 ${themeFonts.controlLabelMobile}`}>
  {t("input.vividness_short", { defaultValue: t("input.vividness") })}
</span>

        <span className={`hidden md:inline mt-1 ${themeFonts.controlLabel}`}>
          {t("input.vividness")}
        </span>
      </div>
    </div>
  );
}
