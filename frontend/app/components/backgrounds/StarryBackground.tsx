import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface StarryBackgroundProps {
  children: ReactNode;
  shootingStarFrequency?: number;
}

interface StarColor {
  r: number;
  g: number;
  b: number;
}

class Star {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  phase: number;
  color: StarColor;

  constructor(canvas: HTMLCanvasElement) {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.baseSize = 0;
    this.opacity = 0;
    this.baseOpacity = 0;
    this.phase = 0;
    this.color = { r: 255, g: 255, b: 255 }; // Default white
    this.reset(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = Math.random() * 1.5 + 0.5; // 0.5–2px
    this.size = this.baseSize;
    this.baseOpacity = Math.random() * 0.5 + 0.5; // 0.5–1
    this.opacity = this.baseOpacity;
    this.phase = Math.random() * Math.PI * 2;
    // Randomly select color from palette
    const colors: StarColor[] = [
      { r: 255, g: 255, b: 255 }, // White
      { r: 200, g: 220, b: 255 }, // Pale blue
      { r: 255, g: 255, b: 200 }, // Pale yellow
      { r: 255, g: 200, b: 200 }, // Pale red
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(time: number) {
    const twinkle = Math.sin(time * 0.03 + this.phase) * 0.2;
    this.size = this.baseSize * (1 + twinkle * 0.3);
    this.opacity = this.baseOpacity * (1 + twinkle * 0.4);
    this.x += Math.sin(time * 0.01 + this.phase) * 0.02;
    this.y += Math.cos(time * 0.01 + this.phase) * 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 2
    );
    gradient.addColorStop(
      0,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
    );
    gradient.addColorStop(
      0.3,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`
    );
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

class ShootingStar {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.opacity = 0;
    this.life = 0;
    this.maxLife = 0;
    this.reset(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    this.y = Math.random() * canvas.height * 0.2;
    this.size = Math.random() * 2 + 1; // 1–3px
    const angle = Math.PI / 4 + Math.random() * Math.PI / 6;
    const speed = Math.random() * 5 + 5; // 5–10px per frame
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.opacity = 1;
    this.life = 0;
    this.maxLife = Math.random() * 20 + 30; // 30–50 frames
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    this.opacity = 1 - this.life / this.maxLife;
    if (
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
      this.y < 0 ||
      this.life >= this.maxLife
    ) {
      this.reset(canvas);
      this.opacity = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;

    const trailLength = this.size * 5;
    const endX = this.x - this.speedX * trailLength;
    const endY = this.y - this.speedY * trailLength;
    const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 200, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  children,
  shootingStarFrequency = 0.005,
}) => {
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

    // Create stars and shooting stars
    const stars: Star[] = Array.from({ length: 200 }, () => new Star(canvas));
    const shootingStars: ShootingStar[] = [];

    // Animation loop
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn shooting stars
      if (Math.random() < shootingStarFrequency && shootingStars.length < 3) {
        shootingStars.push(new ShootingStar(canvas));
      }

      // Update and draw stars
      stars.forEach((star) => {
        star.update(time);
        star.draw(ctx);
      });

      // Update and draw shooting stars
      shootingStars.forEach((star, index) => {
        star.update(canvas);
        star.draw(ctx);
        if (star.life >= star.maxLife) {
          shootingStars.splice(index, 1);
        }
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
  }, [shootingStarFrequency]);

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
        className="relative z-[2] w-full h-full flex flex-col items-center justify-center text-white bg-black/50 p-4 rounded"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StarryBackground;