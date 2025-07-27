import EyeIcon from "../icons/EyeIcon";
import { lucidControlClass } from "../../utils/themeTokens";

// const LucidToggle = ({ lucidOnly, setLucidOnly }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <label htmlFor="lucidToggle" className={lucidControlClass}>
//         Lucid
//       </label>
//       <EyeIcon
//         active={lucidOnly}
//         onChange={() => setLucidOnly(!lucidOnly)}
//         className="w-6 h-6 cursor-pointer transition-opacity hover:opacity-80"
//       />
//     </div>
//   );
// };
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
