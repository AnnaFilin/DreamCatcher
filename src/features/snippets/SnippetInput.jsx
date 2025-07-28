import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSnippet } from "./SnippetSlice";
import { fetchMotifs } from "../motifs/MotifsSlice";
import {
  themeFonts,
  themeColors,
  themeSpacing,
  themeRadii,
  themeBorders,
  themeBackgrounds,
  themeEffects,
} from "../../utils/themeTokens";
import LucidVividnessControls from "./LucidVividnessControls";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const SnippetInput = () => {
  const [text, setText] = useState("");
  const [isLucid, setIsLucid] = useState(false);
  const [vividness, setVividness] = useState("");
  const { startRecording, stopRecording, isRecording } = useVoiceRecorder({
    onResult: (result) => setText((prev) => `${prev} ${result}`),
    useMock: true,
  });
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  const dispatch = useDispatch();
  const knownMotifs = useSelector((state) => state.motifs.motifs);

  const handleAdd = async () => {
    if (!text.trim()) {
      console.warn("⚠️ Text is empty!");
      return;
    }

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
  };

  return (
    <div className="flex flex-col flex-grow">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your dream..."
        className={`
                w-full h-full resize-none
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
          <LucidVividnessControls />
        </div>
        <ButtonSave onClick={handleAdd} fullWidth />
      </div>

      {isLargeScreen && (
        <div className="hidden sm:flex items-center justify-between w-full sm:mt-4 mt-0  md:mt-4 lg:mt-6 xl:mt-6 gap-2">
          <div className="flex items-center gap-4">
            <LucidVividnessControls />
          </div>

          <div className="flex items-center gap-2">
            {!isRecording ? (
              <ButtonStart onClick={startRecording} />
            ) : (
              <ButtonStop onClick={stopRecording} />
            )}
            <ButtonSave onClick={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

const MicIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1v11m0 0a3 3 0 0 0 3-3V8a3 3 0 0 0-6 0v1a3 3 0 0 0 3 3zM5 10v1a7 7 0 0 0 14 0v-1"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8" />
  </svg>
);

const ButtonStart = ({ onClick, variant }) => {
  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        className={`
              group
          flex items-center justify-center sm:hidden
          ${themeEffects.iconButton.base}
          ${themeEffects.iconButton.hover}
          ${themeEffects.iconButton.active}
        `}
      >
        <MicIcon className="w-8 h-8 sm:w-9 sm:h-9 opacity-60 group-hover:opacity-90 group-active:opacity-100 transition-opacity duration-200 stroke-[1.4]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2
        ${themeFonts.tag}
        ${themeColors.glowSoft}
        ${themeSpacing.button}
        ${themeEffects.button.base}
        ${themeEffects.button.hover}
        ${themeEffects.button.active}
      `}
    >
      <MicIcon className="w-5 h-5 opacity-80" />
      Record
    </button>
  );
};

const ButtonStop = ({ onClick, variant }) => {
  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center w-9 h-9 sm:hidden
          ${themeEffects.iconButton.base}
          ${themeEffects.iconButton.hover}
          ${themeEffects.iconButton.active}
        `}
      >
        <MicIcon className="w-7 h-7 opacity-90 stroke-[1.4] text-red-500" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2
        ${themeFonts.tag}
        ${themeColors.accentRed}
        ${themeSpacing.button}
        ${themeRadii.md}
        ${themeEffects.button.base}
        ${themeEffects.button.hover}
        ${themeEffects.button.active}
      `}
    >
      <MicIcon className="w-5 h-5 opacity-80" />
      Stop
    </button>
  );
};

const ButtonSave = ({ onClick, fullWidth = false }) => (
  <button
    onClick={onClick}
    className={`
    ${fullWidth ? "w-full border border-white/20" : ""}
    ${themeFonts.tag}
    ${themeColors.glowSoft}
    ${themeSpacing.button}
    ${themeRadii.sm}
    ${themeEffects.button.base}
    ${themeEffects.button.hover}
    ${themeEffects.button.active}
    text-center
  `}
  >
    Save
  </button>
);

export default SnippetInput;
