import React from "react";
import { Button } from './button';

export default function GrainHeroSection({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  children,
  className,
  style,
  innerRef
}) {
  // WebGL shaders cause extreme scroll lag on desktops, so we use a pure CSS animated gradient with SVG noise
  return (
    <section 
      ref={innerRef}
      className={className || "relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]"}
      style={style}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1e3a8a] to-[#0f172a] opacity-90" />
        
        {/* Slow rotating conic glow */}
        <div 
          className="absolute -inset-[100%] opacity-40 animate-[spin_60s_linear_infinite]"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #3b82f6 0%, transparent 30%, transparent 70%, #1e3a8a 100%)',
          }}
        />

        {/* Static SVG Grain Overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" 
          }}
        />
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        {children ? (
          children
        ) : (
          <div className="text-center px-6 sm:px-8 max-w-4xl mx-auto">
            <h1 
              role="heading" 
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              {title}
            </h1>
            
            <p className="max-w-2xl text-lg sm:text-xl text-gray-200 mx-auto mb-8">
              {subtitle}
            </p>
            
            <Button 
              onClick={onCtaClick}
              size="lg"
              className="text-lg px-8 py-3 bg-white text-black hover:bg-gray-100"
            >
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
