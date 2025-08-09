import { useEffect, useRef, useState } from "react";

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
    (window as any).toggleAudioMute = toggleMute;
    (window as any).isAudioMuted = () => isMuted;

    return () => {
      delete (window as any).toggleAudioMute;
      delete (window as any).isAudioMuted;
    };
  }, [isMuted, audioLoaded]);

  return <audio ref={audioRef} loop muted={isMuted} preload="none" />;
};

export default AudioPlayer;
