import { motion } from 'framer-motion';

interface BackgroundGraphicsProps {
  variant?: 'hero' | 'services' | 'portfolio' | 'default';
  className?: string;
}

export default function BackgroundGraphics({ variant = 'default', className = '' }: BackgroundGraphicsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Glossy Amorphous 3D Object */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.5), rgba(16, 185, 129, 0.5), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.3))',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          filter: 'blur(60px)',
          transform: 'perspective(1000px) rotateX(20deg) rotateY(-20deg)',
        }}
        animate={{
          borderRadius: [
            '40% 60% 70% 30% / 40% 50% 60% 50%',
            '60% 40% 30% 70% / 50% 40% 50% 60%',
            '30% 70% 60% 40% / 60% 50% 40% 50%',
            '40% 60% 70% 30% / 40% 50% 60% 50%',
          ],
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glowing Concentric Circles (Target/Radar Effect) */}
      {variant === 'services' && (
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 md:w-96 md:h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: `rgba(251, 191, 36, ${0.6 / ring})`,
                boxShadow: `0 0 ${ring * 20}px rgba(251, 191, 36, ${0.4 / ring})`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6 / ring, 0.8 / ring, 0.6 / ring],
              }}
              transition={{
                duration: 3 + ring,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ring * 0.3,
              }}
            />
          ))}
          {/* Center pointer */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}

      {/* Glowing Eye Graphic */}
      {variant === 'services' && (
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80"
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
          {/* Iris */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8), rgba(236, 72, 153, 0.6))',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(236, 72, 153, 0.4)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Pupil */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-12 h-12 md:w-16 md:h-16 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), inset 0 0 10px rgba(59, 130, 246, 0.6)',
            }}
          />
        </motion.div>
      )}

      {/* Wireframe Rocket/Spacecraft */}
      {variant === 'portfolio' && (
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-96 md:w-80 md:h-[500px]"
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${50 + (i % 4) * 10}%`,
                bottom: `${20 + Math.floor(i / 4) * 15}%`,
                boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
              }}
              animate={{
                y: [0, -100],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.3,
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
            {[0, 1, 2].map((wave) => (
              <motion.path
                key={wave}
                d={`M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`}
                fill="none"
                stroke={`rgba(${wave === 0 ? '16, 185, 129' : wave === 1 ? '59, 130, 246' : '251, 191, 36'}, 0.6)`}
                strokeWidth="2"
                animate={{
                  d: [
                    `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                    `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? -20 : 20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                    `M 0 ${100 + wave * 30} Q 300 ${80 + wave * 30 + (wave % 2 === 0 ? 20 : -20)} 600 ${100 + wave * 30} T 1200 ${100 + wave * 30}`,
                  ],
                }}
                transition={{
                  duration: 4 + wave,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Additional Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 md:w-36 md:h-36 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
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
}

