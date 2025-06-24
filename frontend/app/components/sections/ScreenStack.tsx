import React, { useState, useRef, useEffect } from 'react';

interface ScreenStackProps {
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  index: number;
  isActive: boolean;
  isPrevious: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
}

interface ScreenStackComponent extends React.FC<ScreenStackProps> {
  Card: React.ForwardRefExoticComponent<CardProps>;
}

const ScreenStack: ScreenStackComponent = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle scroll events to detect when a card is fully scrolled
  const handleScroll = (index: number) => (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 1;

    const childCount = React.Children.count(children);
    if (isAtBottom && index < childCount - 1) {
      setActiveIndex(index + 1);
    } else if (element.scrollTop === 0 && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  // Reset scroll position when active card changes
  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (ref && i !== activeIndex) {
        ref.scrollTop = 0;
      }
    });
  }, [activeIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden perspective-1000">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<CardProps>(child) || child.type !== ScreenStack.Card) {
          return null;
        }
        const isActive = index === activeIndex;
        const isPrevious = index < activeIndex;

        return React.cloneElement<CardProps & { ref?: React.Ref<HTMLDivElement> }>(child, {
          index,
          isActive,
          isPrevious,
          onScroll: handleScroll(index),
          ref: (el: HTMLDivElement | null) => (cardRefs.current[index] = el),
        });
      })}
    </div>
  );
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, index, isActive, isPrevious, onScroll }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 bg-white shadow-2xl rounded-2xl overflow-y-auto transition-all duration-500 ease-in-out ${
          isActive
            ? 'translate-y-0 rotate-0 opacity-100 z-20'
            : isPrevious
            ? 'translate-y-[-100%] rotate-x-[-10deg] opacity-50 z-10'
            : 'translate-y-[100%] rotate-x-[10deg] opacity-50 z-10'
        }`}
        onScroll={onScroll}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="min-h-screen p-6">{children}</div>
      </div>
    );
  }
);

ScreenStack.Card = Card;

export default ScreenStack;