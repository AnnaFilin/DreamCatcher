import { useEffect, useMemo, useState } from "react";
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

const MIME_OPTIONS = ["audio/mp4", "audio/webm", "audio/ogg"];


const pickMimeType = () => {
  if (typeof window === "undefined" || typeof window.MediaRecorder === "undefined") {
    return "";
  }

  const isAndroid = /Android/i.test(navigator.userAgent);

  const options = isAndroid
    ? ["audio/webm", "audio/ogg"]
    : ["audio/mp4", "audio/webm", "audio/ogg"];

  for (const mime of options) {
    if (
      typeof window.MediaRecorder.isTypeSupported !== "function" ||
      window.MediaRecorder.isTypeSupported(mime)
    ) {
      return mime;
    }
  }
  return "";
};


const supportsMimeType = (mimeType) => {
  if (!mimeType) {
    return false;
  }
  if (typeof window === "undefined" || typeof window.MediaRecorder === "undefined") {
    return false;
  }
  if (typeof window.MediaRecorder.isTypeSupported !== "function") {
    return true;
  }
  return window.MediaRecorder.isTypeSupported(mimeType);
};

const SnippetInput = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isLucid, setIsLucid] = useState(false);
  const [vividness, setVividness] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [permissionState, setPermissionState] = useState("unknown");
  const selectedMimeType = useMemo(() => pickMimeType(), []);

  const selectedMimeTypeSupported = useMemo(
    () => supportsMimeType(selectedMimeType),
    [selectedMimeType]
  );

  const canUseMediaDevices =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function";

  const mediaRecorderAvailable =
    typeof window !== "undefined" && typeof window.MediaRecorder !== "undefined";

  const [recorderDiagnostics, setRecorderDiagnostics] = useState(() => ({
    userMediaSupported: canUseMediaDevices,
    mediaRecorderSupported: mediaRecorderAvailable,
    selectedMimeType,
    isMimeTypeSupported: selectedMimeTypeSupported,
    lastErrorName: "",
    lastErrorMessage: "",
  }));
  const [debugLog, setDebugLog] = useState([]);


  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const dispatch = useDispatch();
  const knownMotifs = useSelector((state) => state.motifs.motifs);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.permissions?.query) {
      return;
    }
    let cleanup;
    let cancelled = false;

    navigator.permissions
      .query({ name: "microphone" })
      .then((status) => {
        if (cancelled) return;
        const updateState = () => setPermissionState(status.state);
        updateState();
        if (status.addEventListener) {
          status.addEventListener("change", updateState);
          cleanup = () => status.removeEventListener("change", updateState);
        } else {
          status.onchange = updateState;
          cleanup = () => {
            status.onchange = null;
          };
        }
      })
      .catch(() => {
        setPermissionState((state) => (state === "unknown" ? "unavailable" : state));
      });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    setRecorderDiagnostics((prev) => ({
      ...prev,
      userMediaSupported: canUseMediaDevices,
      mediaRecorderSupported: mediaRecorderAvailable,
      selectedMimeType,
      isMimeTypeSupported: selectedMimeTypeSupported,
    }));
  }, [canUseMediaDevices, mediaRecorderAvailable, selectedMimeType, selectedMimeTypeSupported]);

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
    onDebug: (info) => {
      setRecorderDiagnostics((prev) => ({
        ...prev,
        lastErrorName: info?.stage || prev.lastErrorName,
        lastErrorMessage: JSON.stringify(info),
      }));
    
      setDebugLog((prev) => {
        const line = `${new Date().toISOString().slice(11, 19)} ${info?.stage} ${JSON.stringify(info)}`;
        const next = [...prev, line];
        return next.slice(-20); // keep last 20 lines
      });
    },
    
    

    useMock: false,
    language: i18n.language,
    mimeType: selectedMimeType,

  });

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

  const handleStartRecording = async () => {
    setRecorderDiagnostics((prev) => ({
      ...prev,
      userMediaSupported: canUseMediaDevices,
      mediaRecorderSupported: mediaRecorderAvailable,
      selectedMimeType,
      isMimeTypeSupported: selectedMimeTypeSupported,
      lastErrorName: "",
      lastErrorMessage: "",
    }));

    try {
      await startRecording();
    } catch (error) {
      setRecorderDiagnostics((prev) => ({
        ...prev,
        lastErrorName: error?.name || "Unknown",
        lastErrorMessage: error?.message || "",
      }));
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
              <span className="text-white/60 text-sm">{t("loading.transcribing")}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-4 sm:hidden mt-4">
        <div className="flex items-center justify-between gap-12 w-full">
          {!isRecording ? (
            <ButtonStart onClick={handleStartRecording} variant="icon" />
          ) : (
            <ButtonStop onClick={handleStopRecording} isRecording={isRecording} variant="icon" />
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
          <ButtonSave
            onClick={handleAdd}
            fullWidth
            disabled={isRecording || isProcessingAudio}
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
              <ButtonStart onClick={handleStartRecording} />
            ) : (
              <ButtonStop onClick={handleStopRecording} isRecording={isRecording} />
            )}
            <ButtonSave onClick={handleAdd} disabled={isRecording || isProcessingAudio} />
          </div>
        </div>
      )}

      <div className="mt-3 text-[11px] text-white/60 space-y-1">
        <div>
          <span className="font-semibold text-white/80">getUserMedia</span>:{" "}
          {recorderDiagnostics.userMediaSupported ? "available" : "missing"}
        </div>
        <div>
          <span className="font-semibold text-white/80">Permission</span>: {permissionState}
        </div>
        <div>
          <span className="font-semibold text-white/80">MediaRecorder</span>:{" "}
          {recorderDiagnostics.mediaRecorderSupported ? "supported" : "missing"}
        </div>
        <div>
          <span className="font-semibold text-white/80">Selected mimeType</span>:{" "}
          {recorderDiagnostics.selectedMimeType} (
          {recorderDiagnostics.isMimeTypeSupported ? "supported" : "unsupported"})
        </div>
        <div>
          <span className="font-semibold text-white/80">Error</span>:{" "}
          {recorderDiagnostics.lastErrorName || "none"}
          {recorderDiagnostics.lastErrorMessage && ` — ${recorderDiagnostics.lastErrorMessage}`}
        </div>
      </div>
      {debugLog.length > 0 && (
  <div className="mt-3 text-[10px] text-white/60 whitespace-pre-wrap break-words">
    <div className="font-semibold text-white/80 mb-1">Debug log</div>
    {debugLog.map((line, idx) => (
      <div key={idx}>{line}</div>
    ))}
  </div>
)}
    </div>
  );
};

export default SnippetInput;