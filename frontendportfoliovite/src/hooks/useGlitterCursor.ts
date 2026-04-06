import { useEffect, useState } from 'react';

export function useGlitterCursor(): { spotlightActive: boolean } {
  const [spotlightActive, setSpotlightActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let spotlightTriggered = false;

    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty(
        '--ratio-x',
        String(e.clientX / window.innerWidth)
      );
      document.documentElement.style.setProperty(
        '--ratio-y',
        String(e.clientY / window.innerHeight)
      );

      if (!spotlightTriggered) {
        spotlightTriggered = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setSpotlightActive(true));
        });
      }
    };

    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return { spotlightActive };
}
