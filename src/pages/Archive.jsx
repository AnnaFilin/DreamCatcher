import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SnippetCard from "../features/snippets/SnippetCard";
import MotifFilterBlock from "../features/archive/MotifFilterBlock";
import PageHeader from "../layout/PageHeader";
import PageWrapper from "../layout/PageWrapper";
import { fetchSnippets } from "../features/snippets/SnippetSlice";
import { fetchMotifs } from "../features/motifs/MotifsSlice";

const ArchivePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const allSnippets = useSelector((state) => state.snippets.snippets);

  useEffect(() => {
    if (allSnippets.length === 0) {
      dispatch(fetchSnippets());
      dispatch(fetchMotifs());
    }
  }, [allSnippets.length, dispatch]);

  const [lucidOnly, setLucidOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMotif, setSelectedMotif] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const resetFilters = () => {
    setLucidOnly(false);
    setSearchQuery("");
    setSelectedMotif(null);
    setSortOrder("newest");
  };

  const toggleMotif = (motif) => {
    if (selectedMotif === motif) {
      setSelectedMotif(null);
    } else {
      setSelectedMotif(motif);
    }
  };

  const filteredSnippets = allSnippets
    .filter((s) => !lucidOnly || s.isLucid)
    .filter((s) => s.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(
      (s) => !selectedMotif || (s.motifs && s.motifs.includes(selectedMotif))
    );

  const sortedSnippets = [...filteredSnippets].sort((a, b) =>
    sortOrder === "newest"
      ? b.createdAt - a.createdAt
      : a.createdAt - b.createdAt
  );

  return (
    <PageWrapper>
      <PageHeader title={t("archive.title")} />

      <MotifFilterBlock
        lucidOnly={lucidOnly}
        setLucidOnly={setLucidOnly}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetFilters={resetFilters}
        selectedMotif={selectedMotif}
        toggleMotif={toggleMotif}
      />

      <div className=" h-auto lg:h-[calc(100vh-370px)] relative flex flex-col">
        <div className="custom-scrollbar overflow-y-auto pr-2 flex-1 space-y-4 ">
          {sortedSnippets.map((s) => (
            <SnippetCard key={s.id} snippet={s} />
          ))}
        </div>

        <div
          className="pointer-events-none absolute bottom-[0px] left-[-20px] w-[calc(100%+40px)] h-30 z-10"
          style={{
            background: `
      linear-gradient(
        to bottom,
        rgba(34, 26, 44, 0) 0%,
        rgba(34, 26, 44, 0.15) 30%,
        rgba(31, 23, 38, 0.4) 60%,
        rgba(31, 23, 38, 0.75) 85%,
        rgba(31, 23, 38, 1) 100%
      )
    `,
            filter: "blur(0.5px)",
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default ArchivePage;
