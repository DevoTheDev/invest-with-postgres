import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface EmberBackgroundProps {
  children: ReactNode;
}

class Ember {
  x: number;
  y: number;
  size: number;
  baseSize: number; // Base size for flickering
  speedY: number;
  speedX: number;
  opacity: number;
  baseOpacity: number; // Base opacity for flickering
  phase: number; // Unique phase for flickering

  constructor(canvas: HTMLCanvasElement) {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.baseSize = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.opacity = 0;
    this.baseOpacity = 0;
    this.phase = Math.random() * Math.PI * 2; // Random phase for flickering
    this.reset(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + this.size; // Start below canvas to rise
    this.baseSize = Math.random() * 3 + 2; // Larger base size for embers
    this.size = this.baseSize;
    this.speedY = -(Math.random() * 2 + 1); // Negative speed to rise
    this.speedX = Math.random() * 0.5 - 0.25; // Slight horizontal drift
    this.baseOpacity = Math.random() * 0.4 + 0.4; // Base opacity 0.4-0.8
    this.opacity = this.baseOpacity;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(wind: number, canvas: HTMLCanvasElement, time: number) {
    this.y += this.speedY;
    this.x += this.speedX + wind;
    // Flicker effect: modulate size and opacity
    const flicker = Math.sin(time * 0.05 + this.phase) * 0.3; // Slow flicker
    this.size = this.baseSize * (1 + flicker * 0.2); // Size varies ±20%
    this.opacity = this.baseOpacity * (1 + flicker * 0.3); // Opacity varies ±30%
    // Reset if ember moves off-screen
    if (this.y < -this.size || this.x > canvas.width || this.x < 0) {
      this.reset(canvas);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Create radial gradient for glowing effect
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );
    gradient.addColorStop(0, `rgba(255, 150, 0, ${this.opacity})`); // Bright orange center
    gradient.addColorStop(0.5, `rgba(255, 100, 0, ${this.opacity * 0.5})`); // Mid orange
    gradient.addColorStop(1, `rgba(200, 50, 0, 0)`); // Fade to transparent

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const EmberBackground: React.FC<EmberBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create embers
    const embers: Ember[] = Array.from({ length: 100 }, () => new Ember(canvas));

    // Animation loop
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const wind = Math.sin(time * 0.01) * 0.2; // Gentle wind effect
      embers.forEach((ember) => {
        ember.update(wind, canvas, time);
        ember.draw(ctx);
      });
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Framer Motion animation variants for the content
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[1]" />
      <motion.div
        className="relative z-[2] w-full h-full flex flex-col items-center justify-center text-white bg-black/30 rounded"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default EmberBackground;