import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav } from '@/content'
import { btnPrimary } from '@/lib/utils'
import { ease } from '@/components/ui/motion'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const reduce = useReducedMotion()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#171513]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#home" className="font-display text-2xl tracking-tight">
          Beza Alehegn
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground aria-[current=true]:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className={`${btnPrimary} hidden md:inline-flex`}>
          Get in touch
        </a>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-[#171513] px-6 py-4 md:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease }}
          >
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border text-lg last:border-0"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
