import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32 md:w-40 md:h-40',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center`}>
        {/* Glow behind the logo */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Elegant Gold Gradient */}
            <linearGradient id="gold-grad" x1="100" y1="100" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF1C5" />
              <stop offset="25%" stopColor="#E9C168" />
              <stop offset="50%" stopColor="#D29A38" />
              <stop offset="75%" stopColor="#F5D88D" />
              <stop offset="100%" stopColor="#9C6B1B" />
            </linearGradient>

            {/* Glowing Space Orbit Gradient */}
            <linearGradient id="cosmic-grad" x1="100" y1="450" x2="450" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="30%" stopColor="#2979FF" />
              <stop offset="60%" stopColor="#651FFF" />
              <stop offset="85%" stopColor="#D500F9" />
              <stop offset="100%" stopColor="#FF1744" />
            </linearGradient>

            {/* Inner A-Counter Gradient */}
            <linearGradient id="neon-cyan-blue" x1="250" y1="280" x2="330" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2979FF" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#311B92" />
            </linearGradient>

            {/* Star Flare Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND SPACE ORBIT SWIRL (Glowing purple-blue ring) */}
          <path
            d="M 50 350 C 60 410, 160 470, 320 440 C 440 410, 480 300, 450 200 C 420 100, 310 80, 290 85 C 310 110, 380 150, 410 240 C 440 330, 390 410, 290 420 C 190 430, 100 370, 60 320 Z"
            fill="url(#cosmic-grad)"
            className="animate-pulse"
            opacity="0.95"
          />

          {/* Cosmic Nebula Speckles (Stars on Orbit) */}
          <circle cx="380" cy="380" r="3" fill="#FFF" opacity="0.8" />
          <circle cx="410" cy="310" r="2.5" fill="#FFF" opacity="0.9" />
          <circle cx="430" cy="240" r="2" fill="#FFF" opacity="0.6" />
          <circle cx="340" cy="420" r="1.5" fill="#FFF" opacity="0.7" />
          <circle cx="280" cy="430" r="2" fill="#FFF" opacity="0.8" />
          
          {/* THE "F" LETTER (Elegant Serif Gothic) */}
          <path
            d="M 150 120 L 320 120 C 330 120, 340 125, 340 135 L 340 145 C 340 155, 330 160, 320 160 L 200 160 L 200 240 L 280 240 C 290 240, 295 245, 295 255 L 295 265 C 295 275, 290 280, 280 280 L 200 280 L 200 380 C 200 420, 170 430, 110 410 C 130 400, 150 380, 150 350 L 150 120 Z"
            fill="url(#gold-grad)"
          />

          {/* THE INTERSECTING "A" LETTER */}
          <path
            d="M 312 150 L 390 380 L 345 380 L 327 320 L 255 320 L 245 300 L 333 300 L 312 240 L 298 280 C 285 300, 260 330, 210 365 C 260 340, 290 300, 312 150 Z"
            fill="url(#gold-grad)"
          />

          {/* INNER BLUE/PURPLE ACCENT OF A */}
          <path
            d="M 302 265 L 316 300 C 310 340, 270 380, 230 405 C 270 375, 295 320, 302 265 Z"
            fill="url(#neon-cyan-blue)"
            filter="url(#glow)"
            opacity="0.9"
          />

          {/* GLOWING LENS FLARE / STAR (At the top peak of A) */}
          <g transform="translate(306, 120)">
            {/* Outer golden halo */}
            <circle cx="0" cy="0" r="45" fill="#FFE57F" opacity="0.15" filter="url(#glow)" />
            <circle cx="0" cy="0" r="20" fill="#FFE57F" opacity="0.3" filter="url(#glow)" />
            
            {/* 4-pointed central flare */}
            {/* Vertical */}
            <path d="M -8 0 Q 0 0 0 -75 Q 0 0 8 0 Q 0 0 0 75 Q 0 0 -8 0 Z" fill="#FFF" filter="url(#glow)" />
            {/* Horizontal */}
            <path d="M 0 -8 Q 0 0 -75 0 Q 0 0 75 0 Q 0 0 0 8 Q 0 0 0 -8 Z" fill="#FFF" filter="url(#glow)" />
            
            {/* Rotated 45-deg smaller flare */}
            {/* Diagonal 1 */}
            <path d="M -5 0 Q 0 0 0 -35 Q 0 0 5 0 Q 0 0 0 35 Q 0 0 -5 0 Z" fill="#FFFDE7" transform="rotate(45)" />
            {/* Diagonal 2 */}
            <path d="M 0 -5 Q 0 0 -35 0 Q 0 0 35 0 Q 0 0 0 5 Q 0 0 0 -5 Z" fill="#FFFDE7" transform="rotate(45)" />

            {/* Solid sparkling diamond core */}
            <polygon points="0,-12 12,0 0,12 -12,0" fill="#FFF" />
            <circle cx="0" cy="0" r="5" fill="#FFF" />
          </g>

          {/* Small star sparkling to the right */}
          <g transform="translate(380, 100) scale(0.4)">
            <path d="M -6 0 Q 0 0 0 -30 Q 0 0 6 0 Q 0 0 0 30 Q 0 0 -6 0 Z" fill="#FFF" />
            <path d="M 0 -6 Q 0 0 -30 0 Q 0 0 30 0 Q 0 0 0 6 Q 0 0 0 -6 Z" fill="#FFF" />
            <circle cx="0" cy="0" r="3" fill="#FFF" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Fandom Aurora
          </span>
          <span className="text-[9px] md:text-[10px] text-blue-400 font-extrabold tracking-widest uppercase -mt-1 font-mono">
            Professional Network
          </span>
        </div>
      )}
    </div>
  );
}
