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
        <div className="flex flex-col h-full  justify-between ">
          <div className="block md:hidden mb-3">
            <LucidStats />
          </div>

          <DreamJournalCard />

          <div className="mt-4 pb-4 lg:pb-0 hidden lg:block">
            <div className="relative w-full">
              <div className="absolute -inset-2 bg-white opacity-5 blur-2xl rounded-2xl pointer-events-none z-0" />

              <div
                className={`
                  relative z-10
                    w-full
                    flex flex-col

                      ${themeColors.blockBg}
                      ${themeColors.blockBlur}
                      ${themeColors.blockBorder}
                      ${themeColors.blockGlow}
                      ${themeSpacing.card.padding.mobile}/2
                      ${themeSpacing.card.padding.tablet}/2
                      ${themeRadii.base}
                        h-20    
                    md:h-24   
                    lg:h-28  
                    xl:h-32    
                    2xl:h-48 
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
