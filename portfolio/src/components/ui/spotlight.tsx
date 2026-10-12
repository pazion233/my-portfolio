'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
};

export function Spotlight({
  className,
  size = 280,
  springOptions = { bounce: 0 },
  fill = '#F97316',
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightX = useTransform(mouseX, (x) => x - size / 2);
  const spotlightY = useTransform(mouseY, (y) => y - size / 2);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', enter);
    parentElement.addEventListener('mouseleave', leave);
    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', enter);
      parentElement.removeEventListener('mouseleave', leave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full blur-2xl transition-opacity duration-300',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        x: spotlightX,
        y: spotlightY,
        background: `radial-gradient(circle, ${fill} 0%, rgba(249, 115, 22, 0.25) 40%, transparent 70%)`
      }}
    />
  );
}
