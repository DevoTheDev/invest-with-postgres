import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimationDefinition } from 'framer-motion';
import clsx from 'clsx';

interface SectionProps {
  id: string;
  backgroundColor?: string;
  textColor?: string;
  children: React.ReactNode;
  scrollDirection?: 'horizontal' | 'vertical';
}

const Section: React.FC<SectionProps> = ({ id, backgroundColor = 'bg-white', textColor = 'text-black', children, scrollDirection = 'vertical' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    const animation: AnimationDefinition = {
      opacity: inView ? 1 : 0,
      ...(scrollDirection === 'horizontal' ? { x: inView ? 0 : 50 } : { y: inView ? 0 : 1 }),
      transition: {
        duration: 1.8, // slowed down
        ease: [0.22, 1, 0.36, 1], // smoother easing
      },
    };

    controls.start(animation);
  }, [inView, controls, scrollDirection]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={clsx(
        'flex items-center justify-center snap-start',
        scrollDirection === 'horizontal' ? 'min-w-full h-screen' : 'w-full h-lvh',
        backgroundColor
      )}
      initial={{ opacity: 0, [scrollDirection === 'horizontal' ? 'x' : 'y']: 50 }}
      animate={controls}
    >
      <div className={clsx(`
      flex
      text-center items-center
       justify-center w-full h-screen`, textColor)}>
        {children}
      </div>
    </motion.section>
  );
};

interface SmoothTransitionProps {
  children: React.ReactNode;
  scrollDirection?: 'horizontal' | 'vertical';
}

const SmoothTransition: React.FC<SmoothTransitionProps> & { Section: typeof Section } = ({ children, scrollDirection = 'vertical' }) => {
  return (
    <div
      className={clsx(
        'scroll-container',
        scrollDirection === 'horizontal'
          ? 'overflow-x-auto flex snap-x w-full h-screen'
          : 'overflow-y-auto snap-y snap-mandatory scroll-smooth w-full h-screen'
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<SectionProps>(child)
          ? React.cloneElement<SectionProps>(child, { scrollDirection } as Partial<SectionProps>)
          : child
      )}
    </div>
  );
};

SmoothTransition.Section = Section;

export default SmoothTransition;