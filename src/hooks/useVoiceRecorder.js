import { useRef, useState } from "react";

export const useVoiceRecorder = ({
  onResult,
  // onDebug,
  useMock = false,
  language = "en",
  mimeType
}) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const startRecording = async () => {
    try {
      console.log("🎙️ Starting recording...");
      if (useMock) {
        console.log("🧪 Using MOCK Whisper");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = { text: "🌙 This is a fake dream transcription." };
        console.log("🧪 Mock Whisper result:", data);
        onResult(data.text);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
   
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());

        const actualType = mediaRecorderRef.current?.mimeType || mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunksRef.current, { type: actualType });

        console.log("🎙️ Audio Blob:", audioBlob);

        if (audioBlob.size < 2000) {
          alert("Record is too short or empty");
          return;
        }

        const formData = new FormData();
        // formData.append("file", audioBlob, "recording.webm");
        const t = audioBlob.type || actualType;

        const ext =
          t.includes("webm") ? "webm" :
          t.includes("mp4") ? "mp4" :
          t.includes("ogg") ? "ogg" :
          "webm";

        formData.append("file", audioBlob, `recording.${ext}`);
        formData.append("model", "whisper-1");
        // formData.append("language", language);
        const whisperLang = (language || "").toLowerCase().split("-")[0]; // "ru-ru" -> "ru"
if (whisperLang) {
  formData.append("language", whisperLang);
}

        console.log("🎙️ Upload:", { size: audioBlob.size, type: audioBlob.type });

        // onDebug?.({
        //   stage: "blob",
        //   blobType: audioBlob.type,
        //   blobSize: audioBlob.size,
        // });
        

        try {
          const response = await fetch(`${baseUrl}/whisper`, {
            method: "POST",
            body: formData,
          });
          
          // onDebug?.({
          //   stage: "response",
          //   status: response.status,
          //   ok: response.ok,
          // });
          
          let data;
          try {
            data = await response.json();
          } catch (e) {
            // onDebug?.({
            //   stage: "whisper_json_parse_failed",
            //   message: String(e?.message || e),
            // });
            alert("❌ Whisper JSON parse failed");
            return;
          }
          
          const summary = {
            keys: data && typeof data === "object" ? Object.keys(data) : [],
            textLen: typeof data?.text === "string" ? data.text.length : null,
            segmentsLen: Array.isArray(data?.segments) ? data.segments.length : null,
            hasError: !!data?.error,
            errorType: data?.error?.type || null,
            errorMessage: data?.error?.message || null,
          };
          
          // onDebug?.({
          //   stage: "whisper_json",
          //   summary,
          //   preview: JSON.stringify(data).slice(0, 500),
          // });
          
          let finalText = "";
          if (typeof data?.text === "string") {
            finalText = data.text.trim();
          }
          
          if (!finalText && Array.isArray(data?.segments) && data.segments.length) {
            finalText = data.segments.map((s) => s?.text || "").join(" ").trim();
          }
          
          // onDebug?.({
          //   stage: "whisper_parse",
          //   finalTextLen: finalText.length,
          // });
          
          if (finalText) {
            onResult(finalText);
            return;
          }
          
          // onDebug?.({ stage: "whisper_empty_final" });
          

        } catch (error) {
          console.error("Whisper API error:", error);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Could not start recording:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return { startRecording, stopRecording, isRecording };
};
