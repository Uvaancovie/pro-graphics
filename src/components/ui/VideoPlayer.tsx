import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, title, className }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isLoaded || !videoRef.current) return;
    const video = videoRef.current;
    video.play().catch((err) => {
      setPlayError(err.message || "Playback failed");
    });
  }, [isLoaded]);

  const handlePlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleEnded = useCallback(() => {
    setHasEnded(true);
  }, []);

  const handleReplay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch((err) => {
      setPlayError(err.message || "Playback failed");
    });
    setHasEnded(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-xl overflow-hidden bg-black shadow-lg group cursor-pointer",
        className
      )}
      style={{ aspectRatio: "16 / 9" }}
      onClick={isLoaded ? undefined : handlePlay}
      role="button"
      tabIndex={0}
      aria-label={title || "Play video"}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isLoaded) {
          e.preventDefault();
          handlePlay();
        }
      }}
    >
      <img
        src={poster}
        alt={title || "Video poster"}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {isLoaded && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          preload="none"
          playsInline
          controls
          onEnded={handleEnded}
        />
      )}

      {!isLoaded && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          "bg-black/30 transition-opacity duration-300",
          "group-hover:bg-black/40"
        )}>
          <div className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 rounded-full",
            "bg-white/90 flex items-center justify-center",
            "shadow-lg transition-transform duration-300",
            "group-hover:scale-110"
          )}>
            <svg
              className="w-7 h-7 sm:w-9 sm:h-9 text-blue-950 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {hasEnded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          onClick={handleReplay}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
            <svg
              className="w-7 h-7 text-blue-950 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
