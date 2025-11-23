import { motion } from 'framer-motion';
import logoImage from '@assets/images/logo/logolas.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
};

export default function Logo({ size = 'md', showGlow = true, className = '', onClick }: LogoProps) {
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      animate={
        showGlow
          ? {
              filter: [
                'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))',
                'drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))',
                'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))',
              ],
            }
          : {}
      }
      style={{
        ...(showGlow ? { willChange: 'filter' } : {}),
        ...(onClick ? { cursor: 'pointer' } : {}),
      }}
      transition={
        showGlow
          ? {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : { type: 'spring', stiffness: 300 }
      }
    >
      <img
        src={logoImage}
        alt="Heditra Logo"
        className={`${sizeClass} w-auto object-contain transition-all`}
        loading="eager"
        fetchpriority="high"
        style={{
          filter: 'brightness(1.1) contrast(1.1)',
        }}
      />
    </motion.div>
  );
}

