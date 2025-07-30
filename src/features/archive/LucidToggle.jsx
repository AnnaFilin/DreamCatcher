import EyeIcon from "../icons/EyeIcon";
import { lucidControlClass } from "../../utils/themeTokens";

const LucidToggle = ({ lucidOnly, setLucidOnly }) => {
  return (
    <button
      onClick={() => setLucidOnly(!lucidOnly)}
      className={`flex items-center gap-2 group ${lucidControlClass}`}
    >
      <span>Lucid</span>
      <EyeIcon
        active={lucidOnly}
        className="w-5 h-5 transition-opacity group-hover:opacity-80"
      />
    </button>
  );
};

export default LucidToggle;
