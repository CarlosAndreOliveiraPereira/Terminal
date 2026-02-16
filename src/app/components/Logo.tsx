/**
 * Terminal 404 Logo Component
 * 
 * Este componente renderiza a logo oficial do Terminal 404
 */

import { TERMINAL_404_LOGO } from "../utils/images";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 150 }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Logo Oficial */}
      <img
        src={TERMINAL_404_LOGO}
        alt="Terminal 404"
        className="w-full h-full object-contain"
      />
      
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}