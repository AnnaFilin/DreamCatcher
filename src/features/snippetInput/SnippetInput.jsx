import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSnippet } from "../../store/SnippetSlice";
import { fetchMotifs } from "../../store/MotifsSlice";
import {
  themeFonts,
  themeSpacing,
  themeRadii,
  themeBorders,
  themeBackgrounds,
  themeEffects,
} from "../../utils/themeTokens";
import LucidVividnessControls from "./LucidVividnessControls";
import ButtonSave from "./ButtonSave";
import ButtonStart from "./ButtonStart";
import ButtonStop from "./ButtonStop";
import Spinner from "../icons/Spinner";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

const SnippetInput = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isLucid, setIsLucid] = useState(false);
  const [vividness, setVividness] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { startRecording, stopRecording, isRecording } = useVoiceRecorder({
    onResult: (result) => {
      if (typeof result === "string" && result.trim()) {
        setText((prev) => `${prev} ${result.trim()}`);
      } else {
        toast.warn(t("toasts.transcriptionError"));
      }
    },

    useMock: false,
    language: i18n.language,
  });
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const dispatch = useDispatch();
  const knownMotifs = useSelector((state) => state.motifs.motifs);

  const handleAdd = async () => {
    if (!text.trim()) {
      toast.warn(t("toasts.dreamEmpty"));
      return;
    }

    try {
      setIsSaving(true);
      await dispatch(
        addSnippet({
          text,
          isLucid,
          vividness,
          knownMotifs: knownMotifs || [],
        })
      );
      await dispatch(fetchMotifs());

      setText("");
      setIsLucid(false);
      setVividness("");

      toast.success(t("toasts.dreamSaved"), {
        icon: false,
      });
    } catch (error) {
      toast.error(t("toasts.dreamSaveError"), {
        icon: false,
      });
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <textarea
        value={typeof text === "string" ? text : ""}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("dream_input.placeholder")}
        className={`
                w-full h-full resize-none custom-scrollbar scrollbar-stable  overflow-y-auto
                ${themeSpacing.textarea.padding}
                ${themeFonts.input}
                ${themeBorders.input}
                ${themeBackgrounds.input}
                ${themeRadii.lg}
                ${themeEffects.input.base}
                ${themeEffects.input.hover}
                ${themeEffects.input.focus} 
              `}
      />
      {/* Mobile layout */}
      <div className="flex flex-col gap-4 sm:hidden mt-4">
        <div className="flex items-center justify-between gap-12 w-full">
          {!isRecording ? (
            <ButtonStart onClick={startRecording} variant="icon" />
          ) : (
            <ButtonStop onClick={stopRecording} variant="icon" />
          )}
          <LucidVividnessControls
            isLucid={isLucid}
            setIsLucid={setIsLucid}
            vividness={vividness}
            setVividness={setVividness}
          />
        </div>

        {isSaving ? (
          <div className="flex justify-center items-center w-full h-10">
            <Spinner className="w-6 h-6 text-white/50" />
          </div>
        ) : (
          <ButtonSave onClick={handleAdd} fullWidth />
        )}
      </div>

      {isLargeScreen && (
        <div className="hidden sm:flex items-center justify-between w-full sm:mt-4 mt-0  md:mt-4 lg:mt-6 xl:mt-6 gap-2">
          <div className="flex items-center gap-4">
            <LucidVividnessControls
              isLucid={isLucid}
              setIsLucid={setIsLucid}
              vividness={vividness}
              setVividness={setVividness}
            />
          </div>

          <div className="flex items-center gap-2">
            {isSaving ? (
              <div className="flex justify-center items-center w-9 h-9">
                <Spinner className="w-6 h-6 text-white/50" />
              </div>
            ) : !isRecording ? (
              <ButtonStart onClick={startRecording} />
            ) : (
              <ButtonStop onClick={stopRecording} isRecording={isRecording} />
            )}
            <ButtonSave onClick={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetInput;
