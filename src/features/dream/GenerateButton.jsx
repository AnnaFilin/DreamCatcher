import { useTranslation } from "react-i18next";
import Spinner from "../icons/Spinner";

const GenerateButton = ({ onClick, isGenerating }) => {
  const { t } = useTranslation();
  return isGenerating ? (
    <div className="flex justify-center items-center w-9 h-9">
      <Spinner className="w-6 h-6 text-white/60" />
    </div>
  ) : (
    <button
      onClick={onClick}
      className="
  w-full px-4 py-3 border border-white/20 text-sm text-white/80 rounded-md text-center transition
  hover:bg-white/10 hover:text-white active:bg-white/10
  sm:w-auto sm:px-6 sm:py-2 sm:text-xs sm:uppercase sm:tracking-wider sm:text-white/60 sm:border-none
"
    >
      {t("buttons.generate")}
    </button>
  );
};

export default GenerateButton;
