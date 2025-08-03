import SnippetList from "./SnippetList";
import TotalCounter from "./TotalCounter";
import { Link } from "react-router-dom";
import { themeFonts } from "../../utils/themeTokens";
import { useTranslation } from "react-i18next";

const RecentDreams = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex flex-col h-full space-y-6">
      <h2 className={`${themeFonts.sectionTitle} `}>
        {t("recent_dreams.title")}
      </h2>

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto lg:pr-2 custom-scrollbar">
          <SnippetList limit={5} />

          <div
            className="pointer-events-none absolute bottom-[24px] left-[-20px] w-[calc(100%+40px)] h-50 z-10"
            style={{
              background: `
      linear-gradient(
        to bottom,
        rgba(29, 22, 29, 0) 0%,
        rgba(29, 22, 29, 0.2) 30%,
        rgba(29, 22, 29, 0.5) 60%,
        rgba(29, 22, 29, 0.9) 90%,
        rgba(29, 22, 29, 1) 100%
      )
    `,
              filter: "blur(0.5px)",
            }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center text-white/70 text-sm select-none shrink-0">
          <TotalCounter />

          <Link
            to="/archive"
            className={`${themeFonts.smallInfo} hover:text-white/80 transition-colors`}
          >
            {t("recent_dreams.link")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentDreams;
