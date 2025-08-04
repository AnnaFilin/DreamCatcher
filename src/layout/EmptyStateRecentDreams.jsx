import { useTranslation } from "react-i18next";

const EmptyStateRecentDreams = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-white/50 space-y-2">
      {/* <div className="text-3xl md:text-4xl font-serif">No dreams yet</div> */}
      {/* <div className="text-base md:text-lg font-sans max-w-md">
        Start writing your dreams to see them here. Your archive will grow with
        each entry.
      </div> */}
      <p className="text-white/40 text-sm italic mt-4">
        {t("placeholders.no_recent_dreams")}
      </p>
    </div>
  );
};

export default EmptyStateRecentDreams;
