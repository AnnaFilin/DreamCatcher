import { themeFonts } from "../utils/themeTokens";

function PageHeader({ title, className = "" }) {
  return (
    <div className={`w-full max-w-4xl mb-6  mt-6 md:mt-10 ${className}`}>
      <h1 className={themeFonts.title}>{title}</h1>
    </div>
  );
}

export default PageHeader;
