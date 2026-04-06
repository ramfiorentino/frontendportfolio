import { useTheme } from '../../ThemeContext';
import { AnimatedBackground } from './AnimatedBackground';

export function ThemeAwareBackground() {
  const { theme } = useTheme();
  if (theme !== 'spicy-tech') return null;
  return <AnimatedBackground />;
}
