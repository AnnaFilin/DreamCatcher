import { themeFonts, themeSpacing } from "../../utils/themeTokens";

const SearchField = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className={`bg-transparent border border-white/20 rounded ${themeSpacing.inputControl.height} ${themeSpacing.inputControl.paddingX} ${themeFonts.subtitle} text-white w-full`}
      />
    </div>
  );
};
export default SearchField;
