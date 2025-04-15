"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props<T> = {
  data: T[];
  label?: string;
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
};

const HorizontalTickerScroll = <T,>({
  data,
  label,
  className = "",
  renderItem,
}: Props<T>) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!tickerRef.current || !containerRef.current) return;

    const ticker = tickerRef.current;
    const container = containerRef.current;

    // Clone for seamless loop
    const clone = ticker.cloneNode(true);
    (clone as HTMLElement).style.marginLeft = "0"; // remove spacing between sets
    container.appendChild(clone);

    const totalWidth = ticker.offsetWidth;

    // Setup the animation
    const tween = gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
      if (container.contains(clone)) {
        container.removeChild(clone);
      }
    };
  }, [data]);

  // Hover to slow
  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.timeScale(0.5);
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.timeScale(1);
  };

  return (
    <div
      className={`w-full overflow-hidden relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label && (
        <h2 className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-200">
          {label}
        </h2>
      )}

      <div className="flex w-max gap-24" ref={containerRef}>
        {/* This inner div gets cloned */}
        <div className="flex items-center" ref={tickerRef}>
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center">
              {renderItem(item, idx)}
              {idx < data.length - 1 && (
                <span className="text-zinc-400 text-xs mx-6 select-none">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalTickerScroll;
