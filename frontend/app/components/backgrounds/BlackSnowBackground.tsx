import React, { useEffect, useRef, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface BlackSnowBackgroundProps {
  children: ReactNode;
  direction?: "up" | "down";
  backgroundClassName?: string; // ← new prop for custom background
}

class SnowFlake {
  x = 0;
  y = 0;
  size = 0;
  baseSize = 0;
  speedY = 0;
  speedX = 0;
  opacity = 0;
  baseOpacity = 0;
  phase = Math.random() * Math.PI * 2;

  constructor(canvas: HTMLCanvasElement, direction: "up" | "down") {
    this.reset(canvas, direction);
  }

  reset(canvas: HTMLCanvasElement, direction: "up" | "down") {
    this.x = Math.random() * canvas.width;
    this.y = direction === "up" ? canvas.height + this.size : -this.size;
    this.baseSize = Math.random() * 3 + 2;
    this.size = this.baseSize;
    this.speedY = direction === "up" ? -(Math.random() * 2 + 1) : Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.baseOpacity = Math.random() * 0.3 + 0.5;
    this.opacity = this.baseOpacity;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(wind: number, canvas: HTMLCanvasElement, time: number, direction: "up" | "down") {
    this.y += this.speedY;
    this.x += this.speedX + wind;
    const flicker = Math.sin(time * 0.05 + this.phase) * 0.2;
    this.size = this.baseSize * (1 + flicker * 0.1);
    this.opacity = this.baseOpacity * (1 + flicker * 0.2);
    if (
      (direction === "up" && this.y < -this.size) ||
      (direction === "down" && this.y > canvas.height + this.size) ||
      this.x > canvas.width ||
      this.x < 0
    ) {
      this.reset(canvas, direction);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(0, 0, 0, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(0, 0, 0, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const BlackSnowBackground: React.FC<BlackSnowBackgroundProps> = ({
  children,
  direction = "down",
  backgroundClassName = "bg-white", // default fallback
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const snowFlakes: SnowFlake[] = Array.from({ length: 100 }, () => new SnowFlake(canvas, direction));

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const wind = Math.sin(time * 0.01) * 0.2;
      snowFlakes.forEach((flake) => {
        flake.update(wind, canvas, time, direction);
        flake.draw(ctx);
      });
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${backgroundClassName}`}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-[1]" />
      <motion.div
        className="relative z-[2] w-full h-full flex flex-col items-center justify-center bg-white/30 text-black rounded"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BlackSnowBackground;
