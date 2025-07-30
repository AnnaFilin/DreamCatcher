import { useContext, useEffect, useState } from "react";
import { DreamContext } from "../../contexts/DreamContext";
import { db } from "../../firebase/firebase";
// import { generateDreamInterpretation } from "../../utils/generateDreamInterpretation";
import { doc, getDoc } from "firebase/firestore";

import InterpretationBlock from "./InterpretationBlock";
import MotifsList from "./MotifsList";
import DreamTextBlock from "./DreamTextBlock";
import DreamDate from "./DreamDate";
import ModalContainer from "./ModalContainer";
import GenerateButton from "./GenerateButton";
import DreamModalMobile from "./DreamModalMobile";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { generateDreamInterpretationMock } from "../../utils/generateDreamInterpretationMock";

const DreamModal = () => {
  const { isModalOpen, setIsModalOpen, currentDream } =
    useContext(DreamContext);
  const [symbols, setSymbols] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [interpretation, setInterpretation] = useState("");

  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (!currentDream || !currentDream.motifs) return;

    setInterpretation("");

    const fetchSymbols = async () => {
      const promises = currentDream.motifs.map(async (motif) => {
        const ref = doc(db, "symbols", motif);
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() : null;
      });
      const results = await Promise.all(promises);
      setSymbols(results.filter(Boolean));
    };

    fetchSymbols();
  }, [currentDream]);

  useEffect(() => {
    if (isModalOpen && isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isModalOpen, isMobile]);

  if (!isModalOpen || !currentDream) return null;

  const dreamDate = currentDream.createdAt
    ? new Date(currentDream.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // const result = await generateDreamInterpretation({
      const result = await generateDreamInterpretationMock({
        text: currentDream.text,
        symbols,
      });
      setInterpretation(result);
    } catch (err) {
      console.error("❌ Interpretation error:", err);
      setInterpretation(
        "Something went wrong while generating interpretation."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (isMobile) {
    return (
      <DreamModalMobile
        currentDream={currentDream}
        setIsModalOpen={setIsModalOpen}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        interpretation={interpretation}
        dreamDate={dreamDate}
      />
    );
  }

  return (
    <ModalContainer onClose={() => setIsModalOpen(false)}>
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
      >
        ✕
      </button>

      <DreamDate date={dreamDate} />

      <DreamTextBlock text={currentDream.text} />

      <MotifsList motifs={currentDream.motifs} />

      <InterpretationBlock interpretation={interpretation} />

      {!interpretation && (
        <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />
      )}
    </ModalContainer>
  );
};

export default DreamModal;
