import { useMediaQuery } from "../../hooks/useMediaQuery";

const DreamTextBlock = ({ text }) => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-md px-4 md:px-6 py-5 max-w-prose mx-auto space-y-2">
      <p
        className={`
          text-white/60
          italic
          ${
            isLargeScreen
              ? `
            font-marck
            font-thin
            text-left
            leading-[1.7]
            tracking-tight
          `
              : `
            font-manrope
            tracking-normal
            leading-normal
          `
          }
        `}
      >
        {text}
      </p>
    </div>
  );
};

export default DreamTextBlock;
