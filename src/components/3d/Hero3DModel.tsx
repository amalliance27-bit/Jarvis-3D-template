import React, { useEffect, useRef, useState } from 'react';
import { SplineScene } from '@/components/ui/splite';
import { Sparkles, RefreshCw, Maximize2, ShieldCheck } from 'lucide-react';

interface Hero3DModelProps {
  isPrimary?: boolean;
  className?: string;
  badgeLabel?: string;
}

/**
 * High-performance 60 FPS WebGL/2D Canvas Interactive Holographic Core.
 * Used for duplicate infinite-scroll replicas to prevent browser WebGL context exhaustion,
 * and as an instantaneous resilient fallback.
 */
function InteractiveCoreCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = (e.clientX - rect.left) / rect.width - 0.5;
      const rawY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = rawX * 2;
      mouseRef.current.targetY = rawY * 2;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Particles for cybernetic ring
    const particleCount = 120;
    const particles: Array<{
      radius: number;
      speed: number;
      angle: number;
      tilt: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#adff2f', '#ffffff', '#22d3ee', '#38bdf8', '#84cc16'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: 70 + Math.random() * 150,
        speed: (0.006 + Math.random() * 0.014) * (Math.random() > 0.5 ? 1 : -1),
        angle: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * Math.PI,
        size: 1 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.25 + Math.random() * 0.75,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const centerX = width / 2 + mouseRef.current.x * 25;
      const centerY = height / 2 + mouseRef.current.y * 25;

      // Outer ambient glow
      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );
      radialGradient.addColorStop(0, 'rgba(173, 255, 47, 0.12)');
      radialGradient.addColorStop(0.35, 'rgba(34, 211, 238, 0.05)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw rotating 3D rings
      const rings = [
        { radius: 140, rotX: 1.1 + mouseRef.current.y * 0.3, rotY: time * 0.4 + mouseRef.current.x * 0.3, color: 'rgba(173, 255, 47, 0.35)' },
        { radius: 110, rotX: -0.8 + mouseRef.current.y * 0.2, rotY: -time * 0.6, color: 'rgba(255, 255, 255, 0.25)' },
        { radius: 170, rotX: 0.4, rotY: time * 0.2, color: 'rgba(56, 189, 248, 0.2)' },
      ];

      rings.forEach(ring => {
        ctx.beginPath();
        const segments = 60;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const x3d = ring.radius * Math.cos(theta);
          const y3d = ring.radius * Math.sin(theta) * Math.cos(ring.rotX);
          const z3d = ring.radius * Math.sin(theta) * Math.sin(ring.rotX);

          // Rotate around Y
          const finalX = x3d * Math.cos(ring.rotY) + z3d * Math.sin(ring.rotY);
          const finalY = y3d;

          const screenX = centerX + finalX;
          const screenY = centerY + finalY;

          if (i === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Central glowing geometric core
      const corePulse = 18 + Math.sin(time * 3) * 4;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, corePulse * 2);
      coreGrad.addColorStop(0, '#adff2f');
      coreGrad.addColorStop(0.3, 'rgba(173, 255, 47, 0.6)');
      coreGrad.addColorStop(1, 'rgba(173, 255, 47, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, corePulse * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core polygon nucleus (Octahedron projection)
      const polySize = 32 + Math.sin(time * 2) * 2;
      const numVertices = 6;
      ctx.beginPath();
      for (let i = 0; i < numVertices; i++) {
        const angle = (i / numVertices) * Math.PI * 2 + time;
        const vx = centerX + Math.cos(angle) * polySize;
        const vy = centerY + Math.sin(angle) * polySize * 0.7;
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render orbiting cyber particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = centerX + Math.cos(p.angle) * p.radius;
        const py = centerY + Math.sin(p.angle) * p.radius * Math.sin(p.tilt);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className || ''}`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute bottom-4 left-6 text-xs text-neutral-400 font-mono tracking-wider flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#adff2f] animate-pulse" />
        <span>Jarvis Spatial Engine - 60 FPS Lock</span>
      </div>
    </div>
  );
}

export function Hero3DModel({ isPrimary = true, className = '', badgeLabel }: Hero3DModelProps) {
  const [useCanvasCore, setUseCanvasCore] = useState(!isPrimary);
  const [loadError, setLoadError] = useState(false);

  return (
    <div className={`relative w-full h-[520px] lg:h-[720px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#adff2f]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Primary Spline vs Optimized Fallback Core */}
      {isPrimary && !useCanvasCore && !loadError ? (
        <div className="relative w-full h-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      ) : (
        <InteractiveCoreCanvas />
      )}

      {/* Top status bar overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs text-neutral-300 font-mono backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#adff2f] animate-pulse" />
          <span>{badgeLabel || (isPrimary ? 'Primary Spline 3D' : 'Replication Core')}</span>
        </div>

        {isPrimary && (
          <button
            onClick={() => setUseCanvasCore(!useCanvasCore)}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors duration-200"
            title="Toggle between Spline 3D and 60 FPS Hologram Core"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">
              {useCanvasCore ? 'Switch to Spline' : 'Performance Core'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
