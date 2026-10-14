import React from "react";
import { X, Play } from "lucide-react";
import "./videoPlayer.css";
import { useVideoPlayer } from "./hooks/useVideoPlayer.js";
import VideoControlsBar from "./components/VideoControlsBar.jsx";
import VideoLessonsFooter from "./components/VideoLessonsFooter.jsx";

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title = "ویدیو آموزشی کالج رکاد",
  lessonTitle = "پیش‌نمایش رایگان دوره",
  poster = "/assets/StatCard/blue.png",
  lessons = [],
  currentLesson = null,
  onSelectLesson = null,
}) {
  const {
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
  } = useVideoPlayer({ isOpen, videoUrl, onClose });

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVideoSrc = videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div
      className={`vpm-backdrop ${isOpen ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="vpm-modal" ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="vpm-header">
          <div className="vpm-header-info">
            <span className="vpm-badge" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Play size={11} fill="currentColor" />
              <span>ویدیو پلیر رکاد</span>
            </span>
            <div className="vpm-titles">
              <h3 className="vpm-title">{title}</h3>
              <p className="vpm-subtitle">{lessonTitle}</p>
            </div>
          </div>
          <div className="vpm-header-actions">
            <button className="vpm-close-btn" onClick={onClose} aria-label="بستن پنجره" style={{ display: "grid", placeItems: "center" }}>
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="vpm-body">
          <video
            ref={videoRef}
            className="vpm-video-element"
            src={currentVideoSrc}
            poster={poster}
            playsInline
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          <div className={`vpm-center-overlay ${isPlaying ? "hidden" : ""}`}>
            <button className="vpm-big-play-btn" onClick={togglePlay} aria-label="پخش ویدیو">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {skipAnim && (
            <div className={`vpm-skip-anim ${skipAnim.dir}`}>
              <span>{skipAnim.text}</span>
            </div>
          )}

          <VideoControlsBar
            controlsVisible={controlsVisible}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            skipSeconds={skipSeconds}
            buffered={buffered}
            progressPercent={progressPercent}
            handleSeek={handleSeek}
            isMuted={isMuted}
            volume={volume}
            toggleMute={toggleMute}
            handleVolumeChange={handleVolumeChange}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            showSpeedMenu={showSpeedMenu}
            setShowSpeedMenu={setShowSpeedMenu}
            handleSpeedSelect={handleSpeedSelect}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </div>

        <VideoLessonsFooter
          lessons={lessons}
          currentLesson={currentLesson}
          onSelectLesson={onSelectLesson}
        />
      </div>
    </div>
  );
}
