import { motion } from 'framer-motion';
import { memo } from 'react';

interface BackgroundGraphicsProps {
  variant?: 'hero' | 'services' | 'portfolio' | 'default';
  className?: string;
}

const BackgroundGraphics = memo(function BackgroundGraphics({ variant = 'default', className = '' }: BackgroundGraphicsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute top-1/2 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.5), rgba(16, 185, 129, 0.5), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.3))',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          filter: 'blur(60px)',
          transform: 'perspective(1000px) rotateX(20deg) rotateY(-20deg)',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glowing Concentric Circles (Target/Radar Effect) - Optimized */}
      {variant === 'services' && (
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: `rgba(251, 191, 36, ${0.6 / ring})`,
                boxShadow: `0 0 ${ring * 20}px rgba(251, 191, 36, ${0.4 / ring})`,
                willChange: 'transform',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6 / ring, 0.7 / ring, 0.6 / ring],
              }}
              transition={{
                duration: 4 + ring,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ring * 0.4,
              }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
              willChange: 'transform',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.95, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}

      {/* Glowing Eye Graphic */}
      {variant === 'services' && (
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {/* Eye outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.4), 0 0 100px rgba(236, 72, 153, 0.3)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8), rgba(236, 72, 153, 0.6))',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(236, 72, 153, 0.4)',
              willChange: 'transform',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), inset 0 0 10px rgba(59, 130, 246, 0.6)',
            }}
          />
        </motion.div>
      )}

      {/* Wireframe Rocket/Spacecraft */}
      {variant === 'portfolio' && (
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-64 sm:w-56 sm:h-80 md:w-64 md:h-96 lg:w-80 lg:h-[500px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          <svg
            viewBox="0 0 200 300"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' }}
          >
            {/* Rocket body */}
            <motion.path
              d="M 100 250 L 80 200 L 100 50 L 120 200 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Rocket fins */}
            <motion.path
              d="M 80 200 L 60 220 L 80 240 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="2"
            />
            <motion.path
              d="M 120 200 L 140 220 L 120 240 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="2"
            />
            {/* Rocket window */}
            <motion.circle
              cx="100"
              cy="150"
              r="15"
              fill="none"
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
          {/* Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${50 + (i % 3) * 10}%`,
                bottom: `${20 + Math.floor(i / 3) * 15}%`,
                boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [0, -80],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Wavy Lines Pattern */}
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
          <svg
            viewBox="0 0 1200 200"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {[0, 1].map((wave) => (
              <motion.path
                key={wave}
                d={`M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`}
                fill="none"
                stroke={`rgba(${wave === 0 ? '16, 185, 129' : '59, 130, 246'}, 0.6)`}
                strokeWidth="2"
              style={{ willChange: 'transform' }}
              animate={{
                d: [
                  `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                  `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? -20 : 20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                  `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                ],
              }}
                transition={{
                  duration: 6 + wave,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </svg>
        </div>
      )}

      <motion.div
        className="absolute top-1/4 right-1/3 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Gradient Mesh Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
});

export default BackgroundGraphics;

