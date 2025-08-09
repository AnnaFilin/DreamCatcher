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
import { validateDreamText, cleanString, LIMITS } from "../../utils/sanitize";

const SnippetInput = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isLucid, setIsLucid] = useState(false);
  const [vividness, setVividness] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);

  const { startRecording, stopRecording, isRecording } = useVoiceRecorder({
    onResult: (result) => {
      setIsProcessingAudio(false);

      if (typeof result === "string") {
        const cleaned = cleanString(result);
        if (cleaned) {
          setText((prev) => `${prev ? prev + " " : ""}${cleaned}`);
        } else {
          toast.warn(t("toasts.transcriptionError"));
        }
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
    const checked = validateDreamText(text);
    if (!checked.ok) {
      if (checked.reason === "too_short") {
        toast.warn(t("toasts.dreamEmpty"));
      } else if (checked.reason === "too_long") {
        toast.warn(t("toasts.dreamTooLong") || "Dream is too long");
      }
      return;
    }
    const safeText = checked.value;

    try {
      setIsSaving(true);
      await dispatch(
        addSnippet({
          text: safeText,
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

  const handleStopRecording = async () => {
    setIsProcessingAudio(true);
    await stopRecording();
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="relative w-full h-full">
        <textarea
          value={typeof text === "string" ? text : ""}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("dream_input.placeholder")}
          maxLength={LIMITS.max}
          className={`
      w-full h-full resize-none custom-scrollbar scrollbar-stable overflow-y-auto
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

        {isProcessingAudio && (
          <div className="absolute inset-0 flex items-center justify-center  z-10 pointer-events-none">
            <div className="flex items-center gap-3">
              <Spinner className="w-5 h-5 text-white/70 animate-spin" />
              <span className="text-white/60 text-sm">
                {t("loading.transcribing")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-4 sm:hidden mt-4">
        <div className="flex items-center justify-between gap-12 w-full">
          {!isRecording ? (
            <ButtonStart onClick={startRecording} variant="icon" />
          ) : (
            <ButtonStop onClick={handleStopRecording} variant="icon" />
          )}
          <LucidVividnessControls
            isLucid={isLucid}
            setIsLucid={setIsLucid}
            vividness={vividness}
            setVividness={setVividness}
          />
        </div>

        {isSaving || isRecording || isProcessingAudio ? (
          <div className="flex justify-center items-center w-full h-10">
            <Spinner className="w-6 h-6 text-white/50" />
          </div>
        ) : (
          <ButtonSave
            onClick={handleAdd}
            fullWidth
            disabled={isRecording || isSaving || isProcessingAudio}
          />
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
              <ButtonStop
                onClick={handleStopRecording}
                isRecording={isRecording}
              />
            )}
            <ButtonSave
              onClick={handleAdd}
              disabled={isRecording || isSaving || isProcessingAudio}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetInput;
