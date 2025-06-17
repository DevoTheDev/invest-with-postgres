// components/ColoredText.tsx
'use client';
import React from 'react';
import clsx from 'clsx';

type ColoredTextProps = {
  children: React.ReactNode;
  colors: [string] | [string, string] | [string, string, string];
  size?: string; // Optional Tailwind text size class (e.g. "text-4xl")
  weight?: string; // Optional Tailwind font weight class
  shadow?: boolean; // Apply drop-shadow
};

const ColoredText: React.FC<ColoredTextProps> = ({
  children,
  colors,
  size = 'text-3xl',
  weight = 'font-bold',
  shadow = true,
}) => {
  const isGradient = colors.length > 1;

  const style = isGradient
    ? {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        backgroundSize: '200%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        animation: 'gradient-x 6s ease-in-out infinite',
      }
    : {
        color: colors[0],
      };

  return (
    <span
      className={clsx(size, weight, shadow && 'drop-shadow', 'inline-block')}
      style={style}
    >
      {children}
    </span>
  );
};

export default ColoredText;
