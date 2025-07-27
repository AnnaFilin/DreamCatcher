import { useSelector } from "react-redux";

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    className="inline-block mr-1"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const LucidStats = () => {
  const snippets = useSelector((state) => state.snippets.snippets);
  const total = snippets.length;
  const lucid = snippets.filter((s) => s.isLucid).length;

  return (
    <div className="text-sm text-white/70 flex items-center gap-1">
      {total > 0 ? (
        <>
          <MoonIcon />
          <span>
            {lucid} of {total} dreams — Lucid
          </span>
        </>
      ) : (
        `No dreams yet.`
      )}
    </div>
  );
};

export default LucidStats;
