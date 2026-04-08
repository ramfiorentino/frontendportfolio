import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';

export function useThemePrimaryColor(): string {
  const { theme } = useTheme();
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--p').trim();
      setColor(raw ? `oklch(${raw})` : '#000000');
    };
    requestAnimationFrame(read);
  }, [theme]);

  return color;
}
