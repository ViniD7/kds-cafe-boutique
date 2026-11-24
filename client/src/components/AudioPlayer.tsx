import { useEffect, useRef, useState, useCallback } from "react";

// Declaração tipada para as funções de áudio expostas globalmente
declare global {
  interface Window {
    toggleAudioPlay?: () => Promise<boolean>;
    isAudioPlaying?: () => boolean;
    toggleAudioMute?: () => void;
    isAudioMuted?: () => boolean;
  }
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioLoadedRef = useRef(false);
  const isPlayingRef = useRef(false);

  // Manter ref sincronizado com o estado
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    window.dispatchEvent(
      new CustomEvent("kds:audio-state", { detail: { isPlaying } })
    );
  }, [isPlaying]);

  // Carrega e inicia o áudio
  const startAudio = useCallback(async (): Promise<boolean> => {
    try {
      if (!audioRef.current) return false;

      // Se ainda não carregou o módulo de áudio
      if (!audioLoadedRef.current) {
        const audioModule = await import("../Assets/audio/fundoMusic.mp3");
        audioRef.current.src = audioModule.default;
        audioRef.current.volume = 0.25; // Volume de ateliê elegante e suave
        audioLoadedRef.current = true;
      }

      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch (err) {
      console.warn("KDS Atelier Soundscape: erro ou bloqueio de reprodução:", err);
      setIsPlaying(false);
      return false;
    }
  }, []);

  // Pausa o áudio
  const pauseAudio = useCallback((): boolean => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    return false;
  }, []);

  // Alterna reprodução (play / pause)
  const togglePlay = useCallback(async (): Promise<boolean> => {
    if (isPlayingRef.current) {
      pauseAudio();
      return false;
    } else {
      return await startAudio();
    }
  }, [pauseAudio, startAudio]);

  // Expor funções globais para o Header e outros componentes
  useEffect(() => {
    window.toggleAudioPlay = togglePlay;
    window.isAudioPlaying = () => isPlayingRef.current;
    
    // Compatibilidade com código legado
    window.toggleAudioMute = () => {
      togglePlay();
    };
    window.isAudioMuted = () => !isPlayingRef.current;

    return () => {
      delete window.toggleAudioPlay;
      delete window.isAudioPlaying;
      delete window.toggleAudioMute;
      delete window.isAudioMuted;
    };
  }, [togglePlay]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="none"
      style={{ display: "none" }}
      onEnded={() => setIsPlaying(false)}
      onPause={() => setIsPlaying(false)}
      onPlay={() => setIsPlaying(true)}
    />
  );
};

export default AudioPlayer;
