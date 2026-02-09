import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

// Replace with your own mp3 path
import bgMusic from "../assets/music.mp3";

export default function AutoPlayAudio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay (may be blocked by browser until user interaction)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 md:right-5 z-50 flex items-center gap-3 bg-white shadow-xl rounded-full px-2 md:px-4 py-2">
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />

      <button
        onClick={togglePlay}
        className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <span className="text-sm font-medium text-gray-700 hidden md:block">
        {isPlaying ? "Playing" : "Paused"}
      </span>
    </div>
  );
}
