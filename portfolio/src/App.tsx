import { Suspense, lazy, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, Github, Linkedin, Mail, Send } from 'lucide-react'
import { SplineSceneBasic } from '@/components/ui/demo'
import { LiquidGlassCarousel } from '@/components/ui/liquid-glass-carousel'
import { Timeline } from '@/components/ui/timeline'
import { SiteHeader } from '@/components/site-header'
import { OnView, Reveal } from '@/components/ui/motion'
import { btnGhost, btnPrimary } from '@/lib/utils'
import { facts, links, nav, projects } from '@/content'

const SkillsDashboard = lazy(() =>
  import('@/components/ui/skills-dashboard').then((m) => ({ default: m.SkillsDashboard })),
)

const field =
  'w-full min-h-11 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

const contactRows = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}`, Icon: Mail },
  { label: 'GitHub', value: 'github.com/pazion233', href: links.github, Icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/beza-alehegn', href: links.linkedin, Icon: Linkedin },
  { label: 'Telegram', value: 't.me/Freaknbez', href: links.telegram, Icon: Send },
]

function SectionHeading({ n, title, children }: { n: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="grid gap-4 md:grid-cols-12 md:items-end">
      <p className="font-mono text-xs text-primary md:col-span-2">{n}</p>
      <h2 className="font-display text-4xl font-normal tracking-tight sm:text-5xl md:col-span-6">{title}</h2>
      {children && <p className="max-w-md text-muted-foreground md:col-span-4">{children}</p>}
    </Reveal>
  )
}

export default function App() {
  const [active, setActive] = useState(0)
  const [sent, setSent] = useState(false)
  const items = useMemo(() => projects.map((p) => ({ title: p.title, src: p.image, aspect: 3 / 4 })), [])
  const current = projects[active]

  // No backend: hand the message to the visitor's mail app instead of pretending it was sent.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Portfolio message from ${d.get('name')}`)
    const body = encodeURIComponent(`${d.get('message')}\n\n${d.get('name')} (${d.get('email')})`)
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <SiteHeader />

      <main>
        <section id="home" className="px-6 py-8 md:py-12">
          <div className="mx-auto max-w-7xl">
            <SplineSceneBasic />
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm md:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="border-t border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionHeading n="01" title="About" />
            <div className="grid gap-12 md:grid-cols-12">
              <Reveal className="space-y-5 text-lg leading-relaxed md:col-span-7">
                <p>
                  I&apos;m an Information Systems student at Bahir Dar University, interested in how organizations
                  work and in engineering software that makes a real difference to the people running them.
                </p>
                <p className="text-muted-foreground">
                  My training spans analytical modeling, relational database design, networking, and full-stack web
                  engineering across React, TypeScript, Node.js, and interactive 3D interfaces. Based in Bahir Dar,
                  Ethiopia.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="space-y-10 md:col-span-5">
                <div>
                  <h3 className="font-mono text-xs text-muted-foreground">Education</h3>
                  <p className="mt-3 font-display text-2xl">Bahir Dar University</p>
                  <p className="text-sm text-muted-foreground">
                    BSc Information Systems · Bahir Dar Institute of Technology · Expected 2027
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-muted-foreground">Where I&apos;m headed</h3>
                  <ol className="mt-3 space-y-3 text-sm">
                    {[
                      'Enterprise solutions architect leading systems transformation',
                      'Performant database schemas and distributed backends',
                      'Accessible, well-engineered web applications',
                    ].map((g, i) => (
                      <li key={g} className="flex gap-4 border-b border-border pb-3 last:border-0">
                        <span className="font-mono text-primary">0{i + 1}</span>
                        {g}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="border-t border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionHeading n="02" title="Skills">
              Full-stack engineering, system architecture, and database work.
            </SectionHeading>
            <OnView minHeight={480}>
              <Suspense fallback={null}>
                <SkillsDashboard />
              </Suspense>
            </OnView>
          </div>
        </section>

        <section id="projects" className="border-t border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionHeading n="03" title="Projects">
              Drag or use the arrow keys to browse. Click a card to inspect it, Esc to close.
            </SectionHeading>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#171513]">
              <div className="h-[460px] w-full sm:h-[520px]">
                <OnView minHeight={460}>
                  <div className="h-[460px] w-full sm:h-[520px]">
                    <LiquidGlassCarousel items={items} panelHeight={400} gap={14} background="#171513" entry onActiveChange={setActive} />
                  </div>
                </OnView>
              </div>
              <div className="grid gap-6 border-t border-border p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-end" aria-live="polite">
                <div className="max-w-2xl space-y-3">
                  <p className="font-mono text-xs text-primary">
                    {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-3xl">{current.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{current.description}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {current.tags.map((t) => (
                      <li key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3">
                  <a href={current.github} target="_blank" rel="noreferrer" className={btnGhost}>
                    <Github className="size-4" /> Source
                  </a>
                  {current.demo && (
                    <a href={current.demo} target="_blank" rel="noreferrer" className={btnPrimary}>
                      Live demo <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Timeline />

        <section id="contact" className="border-t border-border px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionHeading n="05" title="Get in touch">
              Open to software development roles, systems analysis work, and collaborations.
            </SectionHeading>
            <div className="grid gap-14 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <form onSubmit={onSubmit} className="space-y-5">
                  {[
                    { id: 'name', label: 'Your name', type: 'text', auto: 'name' },
                    { id: 'email', label: 'Your email', type: 'email', auto: 'email' },
                  ].map((f) => (
                    <div key={f.id} className="space-y-2">
                      <label htmlFor={f.id} className="text-sm font-medium">{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} autoComplete={f.auto} required className={field} />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea id="message" name="message" rows={5} required className={`${field} resize-none`} />
                  </div>
                  <button type="submit" className={btnPrimary}>
                    <Send className="size-4" /> Send via email
                  </button>
                  {sent && (
                    <p role="status" className="text-sm text-muted-foreground">
                      Your email app should open with the message ready to send. If it doesn&apos;t, write to {links.email}.
                    </p>
                  )}
                </form>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-5">
                <ul className="border-t border-border">
                  {contactRows.map(({ label, value, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="group flex min-h-16 items-center gap-4 border-b border-border py-4 transition-colors duration-200 hover:text-primary"
                      >
                        <Icon className="size-5 text-muted-foreground" />
                        <span className="flex-1">
                          <span className="block font-mono text-xs text-muted-foreground">{label}</span>
                          <span className="block truncate text-sm">{value}</span>
                        </span>
                        <ArrowUpRight className="size-4 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Beza Alehegn · Information Systems, Bahir Dar University</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.slice(1).map((n) => (
              <a key={n.id} href={`#${n.id}`} className="transition-colors duration-200 hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
