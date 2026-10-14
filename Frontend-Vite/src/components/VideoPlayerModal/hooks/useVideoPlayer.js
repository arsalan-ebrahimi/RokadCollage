import { useState, useRef, useEffect, useCallback } from "react";

export function useVideoPlayer({ isOpen, videoUrl, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideControlsTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [skipAnim, setSkipAnim] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, videoUrl]);

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setControlsVisible(false);
        setShowSpeedMenu(false);
      }, 2800);
    }
  };

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const skipSeconds = useCallback((sec) => {
    const v = videoRef.current;
    if (!v) return;
    const target = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec));
    v.currentTime = target;
    setCurrentTime(target);

    setSkipAnim({
      dir: sec < 0 ? "right" : "left",
      text: sec < 0 ? "۱۰ ثانیه عقب" : "۱۰ ثانیه جلو",
    });
    setTimeout(() => setSkipAnim(null), 650);
  }, []);

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const seekTo = (parseFloat(e.target.value) / 100) * (v.duration || 1);
    v.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleSpeedSelect = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);

    if (v.buffered.length > 0) {
      const buffEnd = v.buffered.end(v.buffered.length - 1);
      setBuffered((buffEnd / (v.duration || 1)) * 100);
    }
  };

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
        case "j":
        case "J":
          e.preventDefault();
          skipSeconds(-10);
          break;
        case "ArrowRight":
        case "l":
        case "L":
          e.preventDefault();
          skipSeconds(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (videoRef.current) {
            const nextVol = Math.min(1, volume + 0.1);
            setVolume(nextVol);
            videoRef.current.volume = nextVol;
            videoRef.current.muted = false;
            setIsMuted(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (videoRef.current) {
            const nextVol = Math.max(0, volume - 0.1);
            setVolume(nextVol);
            videoRef.current.volume = nextVol;
          }
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "Escape":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            onClose();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, togglePlay, skipSeconds, volume, isMuted, onClose]);

  return {
    videoRef,
    containerRef,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    buffered,
    volume,
    isMuted,
    playbackRate,
    showSpeedMenu,
    setShowSpeedMenu,
    isFullscreen,
    controlsVisible,
    skipAnim,
    handleMouseMove,
    togglePlay,
    skipSeconds,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    handleSpeedSelect,
    toggleFullscreen,
    onTimeUpdate,
    onLoadedMetadata,
  };
}
