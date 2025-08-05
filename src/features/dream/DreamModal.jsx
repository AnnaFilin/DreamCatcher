import { useContext, useEffect, useState } from "react";
import { DreamContext } from "../../contexts/DreamContext";
import { db } from "../../firebase/firebase";
import i18n from "../../i18n/i18n";
// import { generateDreamInterpretationMock } from "../../utils/generateDreamInterpretationMock";
import { generateDreamInterpretation } from "../../utils/generateDreamInterpretation";

import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { saveInterpretation } from "../snippets/SnippetSlice";
import { toast } from "react-toastify";

import MotifsList from "./MotifsList";
import DreamTextBlock from "./DreamTextBlock";
import DreamDate from "./DreamDate";
import ModalContainer from "./ModalContainer";
import DreamModalMobile from "./DreamModalMobile";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import InterpretationControls from "./InterpretationControls";

const DreamModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    currentDream,
    justGenerated,
    setJustGenerated,
  } = useContext(DreamContext);

  const [symbols, setSymbols] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [allInterpretations, setAllInterpretations] = useState([]);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (!currentDream || !currentDream.motifs) return;
    setAllInterpretations(currentDream.interpretations || []);

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
      const result = await generateDreamInterpretation({
        text: currentDream.text,
        symbols,
        lang: i18n.language,
      });
      // const result = await generateDreamInterpretationMock({
      //   text: currentDream.text,
      //   symbols,
      // });

      await dispatch(
        saveInterpretation({
          snippetId: currentDream.id,
          interpretationText: result,
        })
      );

      const updated = [
        ...allInterpretations,
        { text: result, createdAt: new Date().toISOString() },
      ];

      setAllInterpretations(updated);
      setJustGenerated(true);
      toast("Interpretation saved successfully.", { icon: false });
    } catch (err) {
      console.error("❌ Interpretation error:", err);
      toast.error("Failed to generate interpretation.", { icon: false });
    } finally {
      setIsGenerating(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJustGenerated(false);
  };

  if (isMobile) {
    return (
      <DreamModalMobile
        currentDream={currentDream}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        interpretations={allInterpretations}
        dreamDate={dreamDate}
        showInterpretations={justGenerated}
        onResetShow={() => setJustGenerated(false)}
        onCloseModal={closeModal}
      />
    );
  }

  return (
    <ModalContainer onClose={closeModal}>
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition"
      >
        ✕
      </button>

      <DreamDate date={dreamDate} />
      <DreamTextBlock text={currentDream.text} />
      <MotifsList motifs={currentDream.motifs} />

      <InterpretationControls
        interpretations={allInterpretations}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        forceShow={justGenerated}
        onHide={() => setJustGenerated(false)}
      />
    </ModalContainer>
  );
};

export default DreamModal;
