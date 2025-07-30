import Spinner from "../icons/Spinner";

const GenerateButton = ({ onClick, isGenerating }) => {
  return (
    <div className="flex justify-center items-center min-h-[42px] mt-2 md:mt-4">
      {isGenerating ? (
        <div className="flex justify-center items-center w-9 h-9">
          <Spinner className="w-6 h-6 text-white/60" />
        </div>
      ) : (
        <button
          onClick={onClick}
          className="text-sm font-medium tracking-wide uppercase text-white/60 hover:text-white/90 transition"
        >
          Generate Interpretation
        </button>
      )}
    </div>
  );
};

export default GenerateButton;
