'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowRight, Mail, Sparkles } from "lucide-react"

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[580px] lg:h-[620px] bg-[#1C1C1C] border-[#2E2E2E] relative overflow-hidden shadow-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#D05B37"
        size={360}
      />
      
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left content: Beza's Personal Information */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D05B37]/40 bg-[#D05B37]/10 text-[#DF876B] text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#D05B37]" />
            <span>Information Systems • Bahir Dar University</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I&apos;m <span className="text-[#D05B37]">Beza Alehegn</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-slate-300">
              Bridging Business Needs & Modern Technology
            </p>
          </div>

          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
            I build scalable web applications, analyze complex organizational systems, and craft engaging digital experiences with clean architecture and interactive 3D computing.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-[#D05B37] hover:bg-[#B84725] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#D05B37]/25 hover:shadow-[#D05B37]/40 hover:-translate-y-0.5 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
            <a 
              href="#projects"
              className="px-6 py-3.5 rounded-xl border border-[#333333] bg-[#242424] hover:bg-[#2C2C2C] text-slate-200 font-semibold text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-[#D05B37]" />
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-[#292929] text-xs text-slate-400 font-mono">
            <div>
              <span className="text-slate-500">Graduation:</span> <span className="text-slate-200 font-semibold">2027</span>
            </div>
            <div>•</div>
            <div>
              <span className="text-slate-500">Domain:</span> <span className="text-slate-200 font-semibold">Enterprise Systems & Full-Stack</span>
            </div>
            <div>•</div>
            <div>
              <span className="text-slate-500">Availability:</span> <span className="text-emerald-400 font-semibold">Open for Opportunities</span>
            </div>
          </div>
        </div>

        {/* Right content: Interactive 3D Spline Scene */}
        <div className="flex-1 relative min-h-[350px] lg:min-h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
