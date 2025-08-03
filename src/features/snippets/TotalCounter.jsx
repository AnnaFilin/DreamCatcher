import { useSelector } from "react-redux";
import { themeFonts } from "../../utils/themeTokens";
import { useTranslation } from "react-i18next";

const TotalCounter = () => {
  const { t } = useTranslation();
  const snippets = useSelector((state) => state.snippets.snippets);

  return (
    <div className={themeFonts.smallInfo}>
      {t("total_counter.label", { count: snippets.length })}
    </div>
  );
};

export default TotalCounter;
