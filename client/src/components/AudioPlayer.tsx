import { useEffect, useRef, useState } from "react";

// Declaração tipada para as funções de áudio expostas globalmente
declare global {
  interface Window {
    toggleAudioMute?: () => void;
    isAudioMuted?: () => boolean;
  }
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Carregar áudio apenas quando necessário
  useEffect(() => {
    const savedPreference = localStorage.getItem("musicPreference");
    const shouldMute = savedPreference === "muted";

    setIsMuted(shouldMute);

    // Carregar áudio apenas após interação do usuário
    const handleUserInteraction = () => {
      if (!audioLoaded) {
        import("../Assets/audio/fundoMusic.mp3")
          .then((module) => {
            if (audioRef.current) {
              audioRef.current.src = module.default;
              audioRef.current.volume = 0.3;
              audioRef.current.muted = shouldMute;
              setAudioLoaded(true);

              // Tentar tocar após carregar
              audioRef.current
                .play()
                .then(() => {
                  setAudioReady(true);
                })
                .catch((error) => {
                  console.log("Autoplay prevented:", error);
                });
            }
          })
          .catch((error) => {
            console.log("Failed to load audio:", error);
          });

        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [audioLoaded]);

  const toggleMute = () => {
    if (audioRef.current && audioLoaded) {
      if (isMuted) {
        audioRef.current.play().catch((error) => {
          console.log("Play failed:", error);
        });
      }

      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      localStorage.setItem("musicPreference", !isMuted ? "muted" : "unmuted");
    }
  };

  // Expor toggleMute globalmente para o botão de controle
  useEffect(() => {
    window.toggleAudioMute = toggleMute;
    window.isAudioMuted = () => isMuted;

    return () => {
      delete window.toggleAudioMute;
      delete window.isAudioMuted;
    };
  }, [isMuted, audioLoaded]);

  const [showMusicControl, setShowMusicControl] = useState(false);

  return (
    <>
      <audio ref={audioRef} loop muted={isMuted} preload="none" style={{ display: 'none' }} />
      
      <div
        className={`music-control ${showMusicControl ? "visible" : ""}`}
        onMouseEnter={() => setShowMusicControl(true)}
        onMouseLeave={() => setShowMusicControl(false)}
      >
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Ativar música" : "Silenciar música"}
        >
          <span>{isMuted ? "🔇" : "🔊"}</span>
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
