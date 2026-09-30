import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize, RotateCcw } from 'lucide-react';

interface PromoVideoPanelProps {
  page: 'lobby' | 'catalog';
  title?: string;
  subtitle?: string;
}

export function PromoVideoPanel({ page, title, subtitle }: PromoVideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isAudioCyclePlaying, setIsAudioCyclePlaying] = useState(false);
  const [audioCycleFinished, setAudioCycleFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previousTimeRef = useRef<number>(0);
  const cycleStartTimeRef = useRef<number>(0);
  const hasWrappedRef = useRef<boolean>(false);

  const isLobby = page === 'lobby';
  const primaryVideoSrc = isLobby ? '/tomorrowland-jarvis.mp4' : '/tomorrowland-motherearth.mp4';
  const fallbackVideoSrc = isLobby
    ? 'https://raw.githubusercontent.com/amalliance27-bit/Ask247-Website-Promo/a5438f98aecdbdf5c0cbf7752cf15ce09d92e427/tomorrowland%20jarvis.mp4'
    : 'https://raw.githubusercontent.com/amalliance27-bit/Ask247-Website-Promo/8d0bc66ac8734c4ffb18fd210369c4a1f6432629/tomorrowland%20motherearth.mp4';

  const defaultTitle = isLobby
    ? 'AMA Interactive Website Tour - Jarvis Live Demo'
    : 'AMA Website Design Catalogue - Live Architecture Showcase';

  const defaultSubtitle = isLobby
    ? 'Demonstration of custom website design with automated tours and 24/7 AI customer service.'
    : 'Comprehensive website design catalogue: fast launch without heavy agency overhead.';

  // Play audio for exactly 1 full cycle
  const startAudioCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isAudioCyclePlaying) {
      video.muted = true;
      setIsAudioCyclePlaying(false);
    } else {
      video.muted = false;
      cycleStartTimeRef.current = video.currentTime;
      previousTimeRef.current = video.currentTime;
      hasWrappedRef.current = false;
      setIsAudioCyclePlaying(true);
      setAudioCycleFinished(false);

      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !isAudioCyclePlaying) return;

    const current = video.currentTime;
    const prev = previousTimeRef.current;
    const duration = video.duration || 0;

    // Detect loop wrap around
    if (prev > 0.5 && current < prev - 0.5) {
      hasWrappedRef.current = true;
    }

    // A cycle has completed
    if (hasWrappedRef.current && current >= cycleStartTimeRef.current) {
      video.muted = true;
      setIsAudioCyclePlaying(false);
      setAudioCycleFinished(true);
    } else if (duration > 0 && Math.abs(current - duration) < 0.25) {
      video.muted = true;
      setIsAudioCyclePlaying(false);
      setAudioCycleFinished(true);
    }

    previousTimeRef.current = current;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      } else {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 my-10 sm:my-16">
      
      {/* Header bar above video with clean unboxed metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-[#adff2f]" />
          <span className="text-white font-semibold">{title || defaultTitle}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-400">16:9 Showcase Preview</span>
        </div>

        {/* Audio single-cycle control pill and fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={startAudioCycle}
            aria-label="Play audio for one cycle"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
              isAudioCyclePlaying
                ? 'bg-[#adff2f] text-black border-[#adff2f] shadow-[0_0_15px_rgba(173,255,47,0.4)]'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {isAudioCyclePlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Audio Playing (1 Cycle)</span>
              </>
            ) : audioCycleFinished ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-[#adff2f]" />
                <span className="text-neutral-200">Replay Audio (1 Cycle)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span>Play Audio (1 Cycle)</span>
              </>
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle full screen"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 hover:text-white transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 16:9 Video Container with ZERO overlay (clean footage) */}
      <div 
        onClick={togglePlay}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover block"
        >
          <source src={primaryVideoSrc} type="video/mp4" />
          <source src={fallbackVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Minimal Play/Pause indicator on click if paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-[#adff2f] shadow-2xl">
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Clean descriptive caption situated strictly BELOW the video with no overlay */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 px-1 text-xs text-neutral-400 font-mono">
        <p className="text-neutral-300">
          {subtitle || defaultSubtitle}
        </p>
        <div className="flex items-center gap-3 text-neutral-500">
          <span>AMA Portfolio Demo</span>
          <span aria-hidden="true">·</span>
          <span>Audio: 1-Cycle Safety Lock</span>
        </div>
      </div>

    </section>
  );
}
