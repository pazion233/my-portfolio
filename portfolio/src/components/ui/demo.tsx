'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { btnGhost, btnPrimary } from '@/lib/utils'

/** The 3D scene only mounts on large screens without reduced-motion; elsewhere the hero is pure type. */
function useShow3D() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return show
}

export function SplineSceneBasic() {
  const show3D = useShow3D()
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
      <Spotlight className="left-0 top-0" fill="#F97316" size={360} />
      <div className="relative z-10 flex min-h-[520px] flex-col lg:h-[620px] lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-7 p-8 md:p-14">
          <p className="font-mono text-xs text-muted-foreground">Information Systems · Bahir Dar University</p>
          <h1 className="font-display text-6xl font-normal leading-[0.95] tracking-tight md:text-8xl">
            Beza <br className="hidden md:block" />
            Alehegn
          </h1>
          <p className="font-display text-2xl italic text-primary md:text-3xl">
            Bridging business needs and modern technology.
          </p>
          <p className="max-w-lg leading-relaxed text-muted-foreground">
            I build scalable web applications, analyze organizational systems, and craft considered digital
            experiences, with clean architecture and, where it helps, interactive 3D.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className={btnPrimary}>
              <Mail className="size-4" /> Get in touch
            </a>
            <a href="#projects" className={btnGhost}>
              Explore projects <ArrowRight className="size-4 text-primary" />
            </a>
          </div>
        </div>
        {show3D && (
          <div className="relative flex-1">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
          </div>
        )}
      </div>
    </div>
  )
}
