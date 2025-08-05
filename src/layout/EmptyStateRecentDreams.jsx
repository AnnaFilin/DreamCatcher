import { useTranslation } from "react-i18next";

const EmptyStateRecentDreams = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-white/50 space-y-2">
      <p className="text-white/40 text-sm italic mt-4">
        {t("placeholders.no_recent_dreams")}
      </p>
    </div>
  );
};

export default EmptyStateRecentDreams;
