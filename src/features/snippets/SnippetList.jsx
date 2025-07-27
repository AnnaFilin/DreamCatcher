import { useSelector } from "react-redux";
import SnippetCard from "./SnippetCard";

const SnippetList = ({ limit }) => {
  const snippets = useSelector((state) => state.snippets.snippets);
  const sortedSnippets = [...snippets].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const shownSnippets = limit ? sortedSnippets.slice(0, limit) : sortedSnippets;

  return (
    <div className="h-auto lg:h-[calc(100vh-360px)] flex flex-col">
      <div className="relative overflow-hidden flex-1 custom-scrollbar overflow-y-auto lg:pr-2">
        {shownSnippets.map((s) => (
          <SnippetCard key={s.id} snippet={s} />
        ))}
      </div>
    </div>
  );
};

export default SnippetList;
