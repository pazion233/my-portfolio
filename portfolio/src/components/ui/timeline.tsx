import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import { BookOpen, Briefcase, Flag, GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const milestones = [
  {
    id: 'high-school',
    date: '2022 – 2023',
    title: 'High School Diploma',
    subtitle: 'Natural Science Stream',
    description: 'Built a strong foundation in mathematics, logic, and analytical problem-solving.',
    icon: BookOpen,
  },
  {
    id: 'university',
    date: '2026 – Present',
    title: 'Bahir Dar University',
    subtitle: 'BSc in Information Systems',
    description: 'Studying software engineering, database systems, network architecture, and enterprise system design.',
    icon: GraduationCap,
  },
  {
    id: 'internship',
    date: 'Jul – Sep 2026',
    title: 'Intern, Amhara Media Corporation',
    subtitle: 'Staff scheduling & shift confirmation',
    description: 'Wrote the requirements specification for a staff schedule reminder and shift confirmation system for broadcast crews; also built UI components and verified API endpoints.',
    icon: Briefcase,
  },
  {
    id: 'graduation',
    date: '2027',
    title: 'Expected Graduation',
    subtitle: 'Bachelor of Science in Information Systems',
    description: 'Preparing to contribute to enterprise architecture, business digitization, and robust software products.',
    icon: Flag,
  },
]

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery)
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false)
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const track = trackRef.current
    if (!section || !frame || !track || prefersReducedMotion || window.innerWidth < 768) return

    const context = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - frame.clientWidth)
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: 'top top',
          end: () => `+=${Math.max(distance(), window.innerHeight * 0.7)}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      revealTimeline.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0)
      const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]', section)
      revealItems.forEach((element, index) => {
        const position = 0.04 + (index / Math.max(1, revealItems.length)) * 0.84
        revealTimeline.fromTo(element, {
          autoAlpha: 0.35,
          y: 18,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        }, position)
      })
    }, section)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative border-t border-[#2A2A2A] bg-[#171513] py-20 sm:py-24"
      aria-labelledby="timeline-heading"
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 sm:pb-12">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FB923C]">
            Learning in motion
          </span>
          <h2 id="timeline-heading" className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Education &amp; Career Timeline
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
            From foundational study to building the systems that move organizations forward.
          </p>
        </div>
      </div>

      <div
        ref={frameRef}
        className="relative h-[min(68svh,620px)] min-h-[360px] w-full overflow-x-auto overflow-y-hidden overscroll-x-contain border-y border-white/[0.07] bg-[#13110F] [scrollbar-width:thin] [scrollbar-color:#F97316_#13110F] scroll-smooth cursor-grab active:cursor-grabbing"
        aria-label="Education and career milestones"
      >
        <div
          ref={trackRef}
          className="relative flex h-full w-max items-center gap-8 px-6 sm:gap-12 sm:px-12"
        >
          <div className="relative h-[76%] w-[76vw] max-w-[440px] shrink-0 overflow-hidden rounded-lg border border-white/10 sm:w-[32vw]">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85"
              alt="University graduates celebrating together"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FDBA74]">The path so far</span>
              <p className="mt-2 max-w-[18ch] text-2xl font-bold leading-tight text-white sm:text-3xl">
                Curiosity, turned into capability.
              </p>
            </div>
          </div>

          <div className="relative flex h-full items-center">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
            <div className="flex h-full items-center gap-8 sm:gap-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isAbove = index % 2 === 0

                return (
                  <article
                    key={milestone.id}
                    className="relative grid h-full w-[76vw] max-w-[440px] shrink-0 grid-rows-[1fr_auto_1fr] sm:w-[34vw]"
                  >
                    <div className={`flex flex-col ${isAbove ? 'justify-end pb-8 sm:pb-10' : ''}`}>
                      {isAbove && (
                        <div className="max-w-sm space-y-3" data-reveal>
                          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FB923C]">
                            {milestone.date}
                          </p>
                          <h3 className="text-xl font-bold leading-tight text-white sm:text-3xl">
                            {milestone.title}
                          </h3>
                          <p className="text-sm font-medium text-stone-300">{milestone.subtitle}</p>
                          <p className="text-sm leading-relaxed text-stone-400">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex size-11 items-center justify-center rounded-full border border-[#F97316]/60 bg-[#171513] text-[#FDBA74] shadow-[0_0_24px_rgba(249,115,22,0.16)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div className={`flex flex-col ${!isAbove ? 'pt-8 sm:pt-10' : ''}`}>
                      {!isAbove && (
                        <div className="max-w-sm space-y-3" data-reveal>
                          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FB923C]">
                            {milestone.date}
                          </p>
                          <h3 className="text-xl font-bold leading-tight text-white sm:text-3xl">
                            {milestone.title}
                          </h3>
                          <p className="text-sm font-medium text-stone-300">{milestone.subtitle}</p>
                          <p className="text-sm leading-relaxed text-stone-400">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}