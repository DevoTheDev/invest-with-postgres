import React, { useEffect, useRef, ReactNode } from "react";

// Define color options and their corresponding hex codes
type ColorOption = "white" | "black" | "red" | "blue" | "green" | "yellow" | "purple";
const colorMap: Record<ColorOption, string> = {
  white: "#FFFFFF",
  black: "#000000",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  yellow: "#FFFF00",
  purple: "#800080",
};

interface ParticleProps {
  children: ReactNode;
  direction?: "up" | "down";
  invert?: boolean;
  flakeCount?: number;
  className?: string;
  flakeColor?: ColorOption;
}

class ParticleFlake {
  x = 0;
  y = 0;
  size = 0;
  baseOpacity = 1;
  speedY = 0;
  speedX = 0;
  phase = Math.random() * Math.PI * 2;
  invert = false;
  isActive = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private direction: "up" | "down",
    invert: boolean,
    private color: string
  ) {
    this.invert = invert;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;
    this.size = Math.random() * 3 + 2;
    this.x = Math.random() * width;
    this.y = this.direction === "up" ? height + this.size : -this.size;
    this.speedY =
      this.direction === "up"
        ? -(Math.random() * 1 + 0.5)
        : Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.baseOpacity = Math.random() * 0.3 + 0.5;
    this.isActive = true;
  }

  update(wind: number, time: number) {
    if (!this.isActive) return;

    this.y += this.speedY;
    this.x += this.speedX + wind;

    const { width, height } = this.canvas;
    if (
      (this.direction === "up" && this.y < -this.size) ||
      (this.direction === "down" && this.y > height + this.size) ||
      this.x > width + this.size ||
      this.x < -this.size
    ) {
      this.isActive = false; // Deactivate instead of resetting immediately
    }
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    if (!this.isActive) return;

    const flicker = Math.sin(time * 0.05 + this.phase) * 0.2;
    const size = this.size * (1 + flicker * 0.1);
    const opacity = this.baseOpacity * (1 + flicker * 0.2);

    const color = this.color || (this.invert ? "#FFFFFF" : "#000000");

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      size
    );
    gradient.addColorStop(0, `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`);
    gradient.addColorStop(0.5, `${color}${Math.round(opacity * 0.4 * 255).toString(16).padStart(2, "0")}`);
    gradient.addColorStop(1, `${color}00`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const ParticleBackground: React.FC<ParticleProps> = ({
  children,
  direction = "down",
  invert = false,
  flakeCount = 50,
  className = "",
  flakeColor = invert ? "white" : "black",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flakesRef = useRef<ParticleFlake[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!canvas || !container || !content) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const { offsetWidth, offsetHeight } = container;
      const dpr = window.devicePixelRatio || 1;

      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;

      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      flakesRef.current.forEach((flake) => {
        if (flake.isActive) flake.reset();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(content);

    // Initialize flakes array with capacity for max flakeCount
    flakesRef.current = Array.from({ length: flakeCount }, () =>
      new ParticleFlake(canvas, direction, invert, colorMap[flakeColor])
    );

    // Initially deactivate all flakes
    flakesRef.current.forEach((flake) => (flake.isActive = false));

    let animationFrameId: number;
    let time = 0;
    const spawnInterval = 100; // Spawn new flake every 100ms
    let lastSpawnTime = 0;

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const wind = Math.sin(time * 0.01) * 0.1;

      // Count active flakes
      const activeFlakes = flakesRef.current.filter((flake) => flake.isActive).length;

      // Spawn new flakes if below desired count
      if (time - lastSpawnTime > spawnInterval && activeFlakes < flakeCount) {
        const inactiveFlake = flakesRef.current.find((flake) => !flake.isActive);
        if (inactiveFlake) {
          inactiveFlake.reset();
          lastSpawnTime = time;
        }
      }

      flakesRef.current.forEach((flake) => {
        flake.update(wind, time);
        flake.draw(ctx, time);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, invert, flakeCount, flakeColor]);

  const overlayStyle = invert
    ? "bg-black/10 text-white"
    : "bg-white/10 text-black";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />
      <div
        ref={contentRef}
        className={`relative z-10 w-full h-full ${overlayStyle}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ParticleBackground;