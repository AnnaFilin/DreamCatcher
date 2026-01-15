import { useRef, useState } from "react";

export const useVoiceRecorder = ({
  onResult,
  onDebug,
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
        formData.append("language", language);

        console.log("🎙️ Upload:", { size: audioBlob.size, type: audioBlob.type });

        onDebug?.({
          stage: "blob",
          blobType: audioBlob.type,
          blobSize: audioBlob.size,
        });
        

        try {
          const response = await fetch(`${baseUrl}/whisper`, {
            method: "POST",
            body: formData,
          });

          onDebug?.({
            stage: "response",
            status: response.status,
            ok: response.ok,
          });
          

          const data = await response.json();
          console.log("🔤 Whisper result:", data);

          if (typeof data.text === "string" && data.text.trim()) {
            console.log("📥 Recognized text:", data.text);
            onResult(data.text);
          } else {
            // alert("❌ Whisper return empty");
            onDebug?.({ stage: "whisper_empty" });
alert("❌ Whisper return empty");
          }
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

  return { startRecording, stopRecording, isRecording, onDebug };
};
