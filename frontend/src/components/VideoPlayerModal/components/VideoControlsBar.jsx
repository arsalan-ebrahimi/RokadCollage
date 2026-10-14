import React from "react";

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (n) => String(n).replace(/\d/g, (d) => FA[d]);

export function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null) return "۰۰:۰۰";
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const pad = (num) => (num < 10 ? "0" + num : String(num));
  if (h > 0) {
    return toFa(`${pad(h)}:${pad(m)}:${pad(s)}`);
  }
  return toFa(`${pad(m)}:${pad(s)}`);
}

export default function VideoControlsBar({
  controlsVisible,
  isPlaying,
  togglePlay,
  skipSeconds,
  buffered,
  progressPercent,
  handleSeek,
  isMuted,
  volume,
  toggleMute,
  handleVolumeChange,
  currentTime,
  duration,
  playbackRate,
  showSpeedMenu,
  setShowSpeedMenu,
  handleSpeedSelect,
  isFullscreen,
  toggleFullscreen,
}) {
  return (
    <div className={`vpm-controls ${!controlsVisible && isPlaying ? "fade-out" : ""}`}>
      {/* Timeline Scrubber */}
      <div className="vpm-timeline-container">
        <div className="vpm-timeline-track">
          <div className="vpm-timeline-buffer" style={{ width: `${buffered}%` }} />
          <div className="vpm-timeline-progress" style={{ width: `${progressPercent}%` }} />
          <div className="vpm-timeline-thumb" style={{ right: `${progressPercent}%` }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent || 0}
          onChange={handleSeek}
          className="vpm-timeline-input"
          aria-label="زمان ویدیو"
        />
      </div>

      {/* Buttons Row */}
      <div className="vpm-buttons-row">
        {/* Right: Play / Skip / Volume / Timer (RTL order) */}
        <div className="vpm-btn-group">
          <button className="vpm-ctrl-btn" onClick={togglePlay} aria-label={isPlaying ? "توقف" : "پخش"}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Skip -10s */}
          <button className="vpm-skip-btn" onClick={() => skipSeconds(-10)} title="۱۰ ثانیه عقب (کلید چپ)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>۱۰-</span>
          </button>

          {/* Skip +10s */}
          <button className="vpm-skip-btn" onClick={() => skipSeconds(10)} title="۱۰ ثانیه جلو (کلید راست)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16">
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
            </svg>
            <span>۱۰+</span>
          </button>

          {/* Volume & Mute */}
          <div className="vpm-volume-wrap">
            <button className="vpm-ctrl-btn" onClick={toggleMute} aria-label={isMuted ? "وصل صدا" : "قطع صدا"}>
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="vpm-volume-slider"
              aria-label="میزان صدا"
            />
          </div>

          {/* Time Indicator */}
          <div className="vpm-time-display">
            <span>{formatTime(currentTime)}</span>
            <span className="total"> / {formatTime(duration)}</span>
          </div>
        </div>

        {/* Left: Speed / Fullscreen */}
        <div className="vpm-btn-group">
          {/* Speed selector */}
          <div style={{ position: "relative" }}>
            <button
              className="vpm-speed-btn"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              title="سرعت پخش"
            >
              {playbackRate}x
            </button>

            {showSpeedMenu && (
              <div className="vpm-speed-menu">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`vpm-speed-opt ${playbackRate === rate ? "active" : ""}`}
                    onClick={() => handleSpeedSelect(rate)}
                  >
                    {rate}x {rate === 1 ? "(عادی)" : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button className="vpm-ctrl-btn" onClick={toggleFullscreen} title="تمام‌صفحه (F)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
