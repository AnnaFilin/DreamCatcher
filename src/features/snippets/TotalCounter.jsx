import { useSelector } from "react-redux";
import { themeFonts } from "../../utils/themeTokens";

const TotalCounter = () => {
  const snippets = useSelector((state) => state.snippets.snippets);

  return (
    // <div className="text-xs text-white/50 tracking-wide">
    <div className={themeFonts.smallInfo}>
      Total: {snippets.length} dreams saved
    </div>
  );
};

export default TotalCounter;
