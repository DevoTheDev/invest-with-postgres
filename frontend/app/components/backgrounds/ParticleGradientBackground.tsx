import React, { useEffect, useRef, ReactNode } from "react";

// Component props definition
interface ParticleGradientProps {
  children: ReactNode;
  direction?: "up" | "down";      // Particle movement direction
  flakeCount?: number;           // Number of particles
  className?: string;            // Tailwind styles including gradient
  gradient?: string;             // Unused in current rendering logic
}

// Particle class responsible for motion and visual behavior
class GradientParticle {
  x = 0;
  y = 0;
  size = 0;
  speedY = 0;
  speedX = 0;
  opacity = 1;
  phase = Math.random() * Math.PI * 2; // Used for flickering animation

  constructor(
    private canvas: HTMLCanvasElement,
    private direction: "up" | "down"
  ) {
    this.reset(); // Initialize particle
  }

  // Reset particle to the top/bottom with random properties
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
    this.opacity = Math.random() * 0.4 + 0.5;
  }

  // Move the particle and reset if it leaves the screen
  update(wind: number) {
    this.y += this.speedY;
    this.x += this.speedX + wind;

    const { width, height } = this.canvas;
    if (
      (this.direction === "up" && this.y < -this.size) ||
      (this.direction === "down" && this.y > height + this.size) ||
      this.x > width + this.size ||
      this.x < -this.size
    ) {
      this.reset(); // Recycle particle
    }
  }

  // Render particle as a soft radial glow that inverts its color
  draw(
    ctx: CanvasRenderingContext2D,
    time: number,
    colorAt: (x: number, y: number) => [number, number, number]
  ) {
    const [r, g, b] = colorAt(this.x, this.y).map((v) => 255 - v); // Invert background color

    const flicker = Math.sin(time * 0.05 + this.phase) * 0.2; // Gentle flickering
    const size = this.size * (1 + flicker * 0.1);             // Flickering size
    const opacity = this.opacity * (1 + flicker * 0.2);       // Flickering alpha

    // Radial gradient creates glow effect
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      size
    );
    gradient.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
    gradient.addColorStop(0.5, `rgba(${r},${g},${b},${opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

const ParticleGradientBackground: React.FC<ParticleGradientProps> = ({
  children,
  direction = "down",
  flakeCount = 60,
  className = "",
  gradient = "linear-gradient(to bottom, #111827, #1f2937)", // Optional override (not applied here)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);          // Canvas for rendering particles
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);  // Offscreen canvas to sample gradient colors

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gradientCanvas = gradientCanvasRef.current;

    if (!canvas || !gradientCanvas || !container) return;

    const ctx = canvas.getContext("2d");
    const gtx = gradientCanvas.getContext("2d");
    if (!ctx || !gtx) return;

    const resize = () => {
      // Resize canvases to container size
      const { offsetWidth, offsetHeight } = container;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      gradientCanvas.width = offsetWidth;
      gradientCanvas.height = offsetHeight;

      // Manually draw the gradient background to the hidden canvas
      const grad = gtx.createLinearGradient(0, 0, 0, offsetHeight);
      grad.addColorStop(0, "#111827");   // Dark blue-gray top
      grad.addColorStop(1, "#1f2937");   // Slightly lighter gray bottom
      gtx.fillStyle = grad;
      gtx.fillRect(0, 0, offsetWidth, offsetHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const flakes = Array.from({ length: flakeCount }, () => new GradientParticle(canvas, direction));

    // Sample RGB color at a given pixel in the hidden gradient canvas
    const getColorAt = (x: number, y: number): [number, number, number] => {
      const imageData = gtx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
      return [imageData[0], imageData[1], imageData[2]];
    };

    let time = 0;
    let animationFrameId: number;

    // Main animation loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear frame
      const wind = Math.sin(time * 0.01) * 0.1;         // Gentle horizontal sway

      // Update and render all particles
      flakes.forEach((flake) => {
        flake.update(wind);
        flake.draw(ctx, time, getColorAt);
      });

      animationFrameId = requestAnimationFrame(animate); // Continue loop
    };

    animate();

    return () => {
      // Cleanup on unmount
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, flakeCount, gradient]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Offscreen canvas used to sample gradient colors */}
      <canvas ref={gradientCanvasRef} style={{ display: "none" }} />

      {/* Canvas that draws visible glowing particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Foreground content layered above the particles */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParticleGradientBackground;

