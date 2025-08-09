import { useState, useEffect } from "react";
import LucidToggle from "./LucidToggle";
import SearchField from "./SearchField";
import MotifSelector from "./MotifSelector";
import { lucidControlClass } from "../../utils/themeTokens";
import { useTranslation } from "react-i18next";

const MotifFilterBlock = ({
  lucidOnly,
  setLucidOnly,
  searchQuery,
  setSearchQuery,
  resetFilters,
  selectedMotif,
  toggleMotif,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setFiltersOpen(true);
      else setFiltersOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto pb-4 md:pb-6">
      <div className="flex justify-between items-center mb-4 md:mb-0">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden text-sm text-white/60 underline"
        >
          {filtersOpen ? t("filters.hide") : t("filters.show")}
        </button>
      </div>

      <div
        className={`flex flex-col md:flex-row justify-between gap-6 items-start ${
          filtersOpen ? "" : "hidden"
        } md:flex`}
      >
        <div className="md:w-2/3">
          <MotifSelector
            selectedMotif={selectedMotif}
            toggleMotif={toggleMotif}
          />
        </div>

        <div className="flex flex-col gap-4 md:w-1/3 w-full">
          <SearchField
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            resetFilters={resetFilters}
          />

          <div className="flex items-center justify-between">
            <LucidToggle lucidOnly={lucidOnly} setLucidOnly={setLucidOnly} />
            <button onClick={resetFilters} className={lucidControlClass}>
              {t("filters.reset")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotifFilterBlock;
