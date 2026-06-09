import { useEffect } from 'react';
import './StadiumEgg.css';

export default function StadiumEgg({ isActive, onComplete }) {
  useEffect(() => {
    if (isActive) {
      // Play sound effects
      const crowd = new Audio('/pwlpl-stadium-chant-377306.mp3');
      const kick = new Audio('https://assets.mixkit.co/active_storage/sfx/2144/2144-preview.mp3');
      
      crowd.volume = 0.5;
      kick.volume = 1.0;

      crowd.play().catch(e => console.log('Audio play failed', e));
      
      // The CSS animation kicks at 0.5s, so play impact sound then
      const kickTimer = setTimeout(() => {
        kick.play().catch(e => console.log('Audio play failed', e));
      }, 500);

      // Clean up and notify parent when animation finishes
      const endTimer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => {
        clearTimeout(kickTimer);
        clearTimeout(endTimer);
        crowd.pause();
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const BootSvg = () => (
    <svg width="240" height="140" viewBox="0 0 200 120" className="stadium-egg-leg-svg" style={{ overflow: 'visible' }}>
      <defs>
        {/* Gradients for 3D realism */}
        <linearGradient id="skinShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5cfa7" />
          <stop offset="100%" stopColor="#d29d6a" />
        </linearGradient>
        <linearGradient id="sockShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b88d8" />
          <stop offset="70%" stopColor="#155799" />
          <stop offset="100%" stopColor="#0b3866" />
        </linearGradient>
        <linearGradient id="bootShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#444" />
          <stop offset="40%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <linearGradient id="bootHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#dropShadow)">
        {/* Skin (Thigh/Knee area) */}
        <path d="M -20 30 C 10 30, 25 35, 30 40 L 30 70 C 10 70, -10 65, -20 60 Z" fill="url(#skinShade)" />
        
        {/* Red Band at top of sock */}
        <path d="M 25 38 L 45 42 L 40 73 L 20 68 Z" fill="#E63946" />
        <path d="M 25 38 L 45 42 L 40 73 L 20 68 Z" fill="url(#bootHighlight)" />
        
        {/* Blue Sock (Anatomical: Shin top, Calf bottom) */}
        <path d="M 40 41 C 70 45, 95 50, 115 55 C 120 60, 125 70, 125 80 C 120 85, 110 88, 100 85 C 80 95, 50 90, 35 72 Z" fill="url(#sockShade)" />
        
        {/* Sock Folds/Wrinkles */}
        <path d="M 85 50 Q 95 65 85 80" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
        <path d="M 60 45 Q 70 60 55 75" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />

        {/* Boot Main Body */}
        <path d="M 115 55 C 130 50, 150 50, 175 60 C 190 65, 195 75, 185 85 C 160 90, 130 90, 110 85 C 100 82, 105 70, 115 55 Z" fill="url(#bootShade)" />
        <path d="M 115 55 C 130 50, 150 50, 175 60 C 190 65, 195 75, 185 85 C 160 90, 130 90, 110 85 C 100 82, 105 70, 115 55 Z" fill="url(#bootHighlight)" />
        
        {/* Boot Sole Plate */}
        <path d="M 110 85 C 130 90, 160 90, 185 85 C 185 88, 160 95, 110 88 Z" fill="#111" />
        
        {/* White detailing/dynamic swoosh */}
        <path d="M 130 60 C 150 65, 160 75, 140 80 C 155 70, 145 65, 130 60 Z" fill="#fff" />
        
        {/* Laces */}
        <path d="M 140 54 L 145 52 M 150 56 L 155 54 M 160 58 L 165 56 M 170 61 L 175 59" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Studs */}
        <path d="M 125 88 L 128 98 L 133 98 L 135 88 Z" fill="#222" />
        <path d="M 150 89 L 152 99 L 157 99 L 155 89 Z" fill="#222" />
        <path d="M 175 87 L 176 96 L 181 95 L 180 85 Z" fill="#222" />
      </g>
    </svg>
  );

  return (
    <div className="stadium-egg-overlay" onClick={onComplete}>
      <div className="stadium-egg-flash" />
      
      {/* 4 Corners */}
      <div className="stadium-egg-corner stadium-egg-tl">
        <span className="stadium-egg-leg"><BootSvg /></span>
        <span className="stadium-egg-ball">⚽</span>
      </div>
      
      <div className="stadium-egg-corner stadium-egg-tr">
        <span className="stadium-egg-leg"><BootSvg /></span>
        <span className="stadium-egg-ball">⚽</span>
      </div>
      
      <div className="stadium-egg-corner stadium-egg-bl">
        <span className="stadium-egg-leg"><BootSvg /></span>
        <span className="stadium-egg-ball">⚽</span>
      </div>
      
      <div className="stadium-egg-corner stadium-egg-br">
        <span className="stadium-egg-leg"><BootSvg /></span>
        <span className="stadium-egg-ball">⚽</span>
      </div>
      
      <div className="stadium-egg-center-text">GOAL!!!</div>
    </div>
  );
}
