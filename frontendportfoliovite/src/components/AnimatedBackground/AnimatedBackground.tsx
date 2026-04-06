import { useRef, useEffect, useState } from 'react';
import { useGlitterCursor } from '../../hooks/useGlitterCursor';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  videoSrc?: string;
}

export function AnimatedBackground({ videoSrc }: AnimatedBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { spotlightActive } = useGlitterCursor();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleCanPlay = () => {
      video.play().then(() => {
        setVideoReady(true);
      }).catch(() => {
        // Autoplay blocked — glitter fallback remains visible
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [videoSrc]);

  return (
    <>
      <div
        className="animated-bg__glitter"
        style={{ visibility: videoReady ? 'hidden' : 'visible' }}
        aria-hidden="true"
      />

      {videoSrc && (
        <video
          ref={videoRef}
          className="animated-bg__video"
          muted
          loop
          playsInline
          style={{ visibility: videoReady ? 'visible' : 'hidden' }}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        className={`animated-bg__spotlight${spotlightActive ? ' active' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
