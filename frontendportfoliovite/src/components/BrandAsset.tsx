import { useTheme } from '../ThemeContext';
import brandasset from '../assets/brand-asset.png';
import brandLilac from '../assets/brand_monochrome_lilac.svg';

interface BrandAssetProps {
  className?: string;
}

export function BrandAsset({ className }: BrandAssetProps) {
  const { theme } = useTheme();
  const src = theme === 'spicy-tech' ? brandLilac : brandasset;

  return (
    <img
      id="brandasset"
      src={src}
      alt=""
      className={className}
    />
  );
}
