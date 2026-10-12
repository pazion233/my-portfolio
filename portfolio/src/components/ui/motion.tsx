import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const ease: [number, number, number, number] = [0.23, 1, 0.32, 1]

/** Fade + 14px rise on scroll-in. Opacity/transform only, once, skipped for reduced motion. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Mounts heavy children (WebGL, charts) only once they are near the viewport. */
export function OnView({ children, minHeight = 320 }: { children: ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return (
    <div ref={ref} style={{ minHeight: seen ? undefined : minHeight }}>
      {seen ? children : null}
    </div>
  )
}
