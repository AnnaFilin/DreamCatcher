import { useRef, useState } from "react";

export const useVoiceRecorder = ({ onResult, useMock = false }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      if (useMock) {
        console.log("🧪 Using MOCK Whisper");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = { text: "🌙 This is a fake dream transcription." };
        console.log("🧪 Mock Whisper result:", data);
        onResult(data.text);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("🎙️ Audio Blob:", audioBlob);

        if (audioBlob.size < 2000) {
          alert("Запись слишком короткая или пустая.");
          return;
        }

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        formData.append("model", "whisper-1");
        formData.append("language", "ru");

        try {
          const response = await fetch(
            "https://api.openai.com/v1/audio/transcriptions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
              body: formData,
            }
          );

          const data = await response.json();
          console.log("🔤 Whisper result:", data);

          if (data.text) {
            onResult(data.text);
          } else {
            alert("❌ Whisper вернул пусто");
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

  return { startRecording, stopRecording, isRecording };
};
