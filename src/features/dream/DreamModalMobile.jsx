import DreamDate from "./DreamDate";
import DreamTextBlock from "./DreamTextBlock";
import MotifsList from "./MotifsList";
import InterpretationControls from "./InterpretationControls";
import { modalContentPaddingTop } from "../../utils/themeTokens";

const DreamModalMobile = ({
  currentDream,
  handleGenerate,
  isGenerating,
  interpretations,
  dreamDate,
  showInterpretations,
  onResetShow,
  onCloseModal,
}) => {
  if (!currentDream) return null;

  return (
    <div className="fixed inset-0 z-40 bg-[#2d2330] text-white flex flex-col overflow-y-auto">
      <div className="sticky top-[72px] z-50 px-4 py-3 flex items-center justify-between bg-[#2d2330] border-b border-white/10">
        <button
          onClick={onCloseModal}
          className="text-sm text-white/60 hover:text-white/90 transition"
        >
          ← Back
        </button>
        <DreamDate date={dreamDate} />
      </div>

      <div className={`${modalContentPaddingTop} pb-24 px-4 space-y-6`}>
        <DreamTextBlock text={currentDream.text} />
        <MotifsList motifs={currentDream.motifs} />

        <InterpretationControls
          interpretations={interpretations}
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          forceShow={showInterpretations}
          onHide={onResetShow}
        />
      </div>
    </div>
  );
};

export default DreamModalMobile;
