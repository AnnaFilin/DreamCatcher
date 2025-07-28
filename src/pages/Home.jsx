import DreamJournalCard from "../features/snippets/DreamJournalCard";
import RecentDreams from "../features/snippets/RecentDreams";
import KeyMotifs from "../features/snippets/KeyMotifs";
import LucidStats from "../features/snippets/LucidStats";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMotifs } from "../features/motifs/MotifsSlice";
import { fetchSnippets } from "../features/snippets/SnippetSlice";
import { themeSpacing, themeColors, themeRadii } from "../utils/themeTokens";
import PageHeader from "../layout/PageHeader";
import PageWrapper from "../layout/PageWrapper";
import LeftColumn from "../features/snippets/LeftColumn";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSnippets());
    dispatch(fetchMotifs());
  }, [dispatch]);

  return (
    <PageWrapper>
      <PageHeader title="Sleep Log" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.95fr] gap-6 xl:gap-10 pb-2 md:pb-4 lg:pb-4 xl:pb-4">
        {/* <div className="flex flex-col h-full gap-4 xl:gap-6 2xl:gap-8"> */}
        <div className="flex flex-col h-full gap-6">
          <div className="block md:hidden mb-3">
            <LucidStats />
          </div>

          <DreamJournalCard />

          <div className="basis-[25%] min-h-[100px] max-h-[25vh]">
            <div className="relative w-full h-full">
              <div className="absolute -inset-2 bg-white opacity-5 blur-2xl rounded-2xl pointer-events-none z-0" />
              <div
                className={`
            relative z-10 w-full h-full flex flex-col
            ${themeColors.blockBg}
            ${themeColors.blockBlur}
            ${themeColors.blockBorder}
            ${themeColors.blockGlow}
            ${themeSpacing.card.padding.mobile}/2
            ${themeSpacing.card.padding.tablet}/2
            ${themeRadii.base}
          `}
              >
                <KeyMotifs />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <RecentDreams />
        </div>
      </div>
    </PageWrapper>
  );
}
