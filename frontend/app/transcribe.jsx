"use client";

import { Mic } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const SpeechToTextPage = ({
  onTranscriptChange,
  autoStart = false,
  className = "",
  showControls = true,
}) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionConstructor) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => {
            const updated = prev + chunk + " ";
            if (onTranscriptChange) onTranscriptChange(updated);
            return updated;
          });
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    if (autoStart) {
      startListening();
    }

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (!listening && recognitionRef.current) {
      setTranscript("");
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className={`speech-to-text ${className}`}>
      {showControls && (
        <button
          onClick={listening ? stopListening : startListening}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            listening
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div
            className={`${listening ? "bg-white animate-pulse" : "bg-red-600"}`}
          ></div>
          {listening ? (
            <>
              <Mic size={16} />
              Recording...
            </>
          ) : (
            "Record"
          )}
        </button>
      )}
    </div>
  );
};

export default SpeechToTextPage;
