import { useContext } from "react";
import { DreamContext } from "../../contexts/DreamContext";

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
        {snippet.isLucid && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12 4.5C7.305 4.5 3.216 7.47 1.5 12c1.716 4.53 5.805 7.5 10.5 7.5s8.784-2.97 10.5-7.5C20.784 7.47 16.695 4.5 12 4.5zM12 15a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        )}
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
      font-thin  font-marck
        "
      >
        {snippet.text}
      </p>
    </div>
  );
};

export default SnippetCard;
