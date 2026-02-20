import { useEffect, useRef, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  golden: boolean;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const initParticles = useCallback((w: number, h: number) => {
    // Drastically reduce particles on mobile or reduced motion for performance
    const count = isMobile || prefersReducedMotion 
      ? Math.min(Math.floor((w * h) / 25000), 15)  // Max 15 particles on mobile/reduced
      : Math.min(Math.floor((w * h) / 8000), 80);  // Max 80 on desktop
    
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isGolden = Math.random() > 0.4;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.05,
        size: isGolden ? Math.random() * 2 + 1 : Math.random() * 1 + 0.5,
        opacity: isGolden ? Math.random() * 0.5 + 0.3 : Math.random() * 0.2 + 0.1,
        golden: isGolden,
      });
    }
    particlesRef.current = particles;
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Use reduced frame rate on mobile
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const draw = (timestamp: number) => {
      // Throttle frame rate on mobile
      if (timestamp - lastTime < frameInterval) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Skip mouse interaction on mobile for performance
        if (!isMobile) {
          // Damping for mouse movement
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        // Draw particle (simplified - no glow on mobile)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.golden) {
          ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(234, 234, 234, ${p.opacity * 0.4})`;
        }
        ctx.fill();

        // Only draw connections on desktop, and with fewer connections
        if (!isMobile && i < particles.length - 1) {
          const p2 = particles[i + 1];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Reduced connection distance
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.golden || p2.golden 
              ? `rgba(255, 215, 0, ${alpha})` 
              : `rgba(234, 234, 234, ${alpha * 0.3})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: isMobile ? 0.5 : prefersReducedMotion ? 0.3 : 0.7 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
