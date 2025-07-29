import { useContext } from "react";
import { DreamContext } from "../../contexts/DreamContext";
import LucidDreamIcon from "../icons/LucidDreamIcon";

// import { themeColors, themeRadii, themeSpacing } from "../../utils/themeTokens";

const SnippetCard = ({ snippet }) => {
  const { setIsModalOpen, setCurrentDream } = useContext(DreamContext);

  const dreamDate = snippet.createdAt
    ? new Date(snippet.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    : "—";

  return (
    <div
      onClick={() => {
        setCurrentDream(snippet);
        setIsModalOpen(true);
      }}
      className="
            relative
            w-full
            rounded-2xl
            backdrop-blur-md
            bg-white/5
            border border-white/10
            shadow-soft
            hover:shadow-lg
            transition
            cursor-pointer
            sm:p-6 sm:mb-4 pt-6
            px-4 py-3 mb-2
       "
    >
      <div className="absolute top-4 right-4 text-xs text-white/40 font-sans italic select-none">
        {dreamDate}
      </div>

      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
        {snippet.isLucid && <LucidDreamIcon className="w-4 h-4" />}
        {snippet.vividness && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </div>

      <p
        className="
    text-white/60
    leading-snug
    tracking-tight
    italic
    font-thin 
    font-marck

    max-sm:leading-relaxed
    max-sm:tracking-normal
    max-sm:font-normal
    max-sm:text-[1.1rem]
  "
      >
        {snippet.text}
      </p>
    </div>
  );
};

export default SnippetCard;
