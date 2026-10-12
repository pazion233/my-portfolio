import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title
} from 'chart.js'
import { Radar, Bar, Doughnut } from 'react-chartjs-2'
import { 
  Code2, 
  Database, 
  Network, 
  Layers, 
  Sparkles, 
  BarChart3, 
  Radar as RadarIcon, 
  PieChart, 
  CheckCircle2,
  TrendingUp,
  Activity
} from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title
)

export interface SkillItem {
  name: string
  shortLabel: string
  level: number
  category: 'frontend' | 'backend' | 'systems'
  experience: string
  tier: 'Mastery' | 'Advanced' | 'Proficient'
  description: string
}

const CATEGORY_COLORS = {
  frontend: {
    primary: '#F97316', // Vibrant Orange
    secondary: '#EA580C',
    glow: 'rgba(249, 115, 22, 0.35)',
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.35)',
    text: 'text-[#FB923C]',
    label: 'Frontend Engineering'
  },
  backend: {
    primary: '#00E5FF', // Cyber Cyan / Electric Teal
    secondary: '#0284C7',
    glow: 'rgba(0, 229, 255, 0.35)',
    bg: 'rgba(0, 229, 255, 0.12)',
    border: 'rgba(0, 229, 255, 0.35)',
    text: 'text-[#38BDF8]',
    label: 'Backend & Database'
  },
  systems: {
    primary: '#10B981', // Emerald Mint / Cyber Green
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.35)',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.35)',
    text: 'text-[#34D399]',
    label: 'Systems & Architecture'
  }
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: 'HTML5 & Semantic Architecture',
    shortLabel: 'HTML5 Semantic',
    level: 100,
    category: 'frontend',
    experience: '3+ Years',
    tier: 'Mastery',
    description: 'Clean DOM hierarchies, accessibility (a11y), and structural SEO standards.'
  },
  {
    name: 'CSS3 / Tailwind CSS & Motion',
    shortLabel: 'CSS3 / Tailwind',
    level: 94,
    category: 'frontend',
    experience: '3+ Years',
    tier: 'Mastery',
    description: 'Responsive utilities, bespoke glassmorphism, micro-interactions, and animations.'
  },
  {
    name: 'JavaScript (ES6+) & TypeScript',
    shortLabel: 'JS / TypeScript',
    level: 88,
    category: 'frontend',
    experience: '2.5 Years',
    tier: 'Advanced',
    description: 'Strict type modeling, asynchronous flows, functional logic, and state pipelines.'
  },
  {
    name: 'React.js & Next.js Patterns',
    shortLabel: 'React / Next.js',
    level: 86,
    category: 'frontend',
    experience: '2+ Years',
    tier: 'Advanced',
    description: 'Component lifecycles, custom hooks, SSR hydration, and reactive workflows.'
  },
  {
    name: 'PostgreSQL & MySQL Relational DB',
    shortLabel: 'PostgreSQL / SQL',
    level: 84,
    category: 'backend',
    experience: '2+ Years',
    tier: 'Advanced',
    description: 'Entity normalization, indexing, ACID compliance, complex JOIN optimizations.'
  },
  {
    name: 'Node.js & RESTful API Architecture',
    shortLabel: 'Node.js APIs',
    level: 80,
    category: 'backend',
    experience: '2 Years',
    tier: 'Advanced',
    description: 'Scalable Express routes, JWT authentication, and distributed payload handling.'
  },
  {
    name: 'System Analysis & Information Flow',
    shortLabel: 'System Analysis',
    level: 95,
    category: 'systems',
    experience: 'Academic & Practical',
    tier: 'Mastery',
    description: 'DFDs, UML behavioral diagrams, process re-engineering, and user requirement specs.'
  },
  {
    name: 'Enterprise Architecture & Modeling',
    shortLabel: 'Enterprise Arch',
    level: 85,
    category: 'systems',
    experience: 'Academic & Practical',
    tier: 'Advanced',
    description: 'Business process integration, modular boundary contexts, and tech stack alignment.'
  },
  {
    name: 'Network Infrastructure Planning',
    shortLabel: 'Networking',
    level: 76,
    category: 'systems',
    experience: 'Academic',
    tier: 'Proficient',
    description: 'Subnet design, TCP/IP topology, secure gateways, and routing protocols.'
  }
]

export function SkillsDashboard() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'systems'>('all')
  const [chartType, setChartType] = useState<'radar' | 'bar' | 'doughnut'>('radar')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return SKILLS_DATA
    return SKILLS_DATA.filter(s => s.category === activeCategory)
  }, [activeCategory])

  // Radar Chart Configuration (Competency Polygon)
  const radarData = useMemo(() => {
    const skillsToDisplay = activeCategory === 'all' ? SKILLS_DATA : filteredSkills

    return {
      labels: skillsToDisplay.map(s => s.shortLabel),
      datasets: [
        {
          label: 'Skill Proficiency (%)',
          data: skillsToDisplay.map(s => s.level),
          backgroundColor: 'rgba(249, 115, 22, 0.25)', // Vibrant orange transparent fill
          borderColor: '#F97316', // Glowing orange border
          borderWidth: 2.5,
          pointBackgroundColor: skillsToDisplay.map(s => CATEGORY_COLORS[s.category].primary),
          pointBorderColor: '#1C1C1C',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#FFFFFF',
          pointHoverBorderColor: '#F97316',
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    }
  }, [activeCategory, filteredSkills])

  const radarOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        titleColor: '#FFFFFF',
        titleFont: { size: 13, weight: 'bold' as const, family: 'sans-serif' },
        bodyColor: '#DF876B',
        bodyFont: { size: 12, family: 'monospace' },
        padding: 12,
        borderColor: 'rgba(208, 91, 55, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => ` Proficiency: ${context.raw}%`
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.08)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.06)'
        },
        pointLabels: {
          color: '#D4D4D8',
          font: {
            size: 11,
            family: 'sans-serif',
            weight: 600
          }
        },
        ticks: {
          backdropColor: 'transparent',
          color: 'rgba(255, 255, 255, 0.35)',
          font: {
            size: 9,
            family: 'monospace'
          },
          stepSize: 20
        },
        suggestedMin: 50,
        suggestedMax: 100
      }
    }
  }), [])

  // Bar Chart Configuration with Domain-Specific Special Colors
  const barData = useMemo(() => {
    const list = activeCategory === 'all' ? SKILLS_DATA : filteredSkills

    return {
      labels: list.map(s => s.shortLabel),
      datasets: [
        {
          label: 'Proficiency Level (%)',
          data: list.map(s => s.level),
          backgroundColor: list.map(s => CATEGORY_COLORS[s.category].primary),
          hoverBackgroundColor: list.map(() => '#FFFFFF'),
          borderRadius: 6,
          borderSkipped: false,
          borderWidth: 0,
          barPercentage: 0.65,
          categoryPercentage: 0.8
        }
      ]
    }
  }, [activeCategory, filteredSkills])

  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // horizontal bars for readable skill labels
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        titleColor: '#FFFFFF',
        titleFont: { size: 13, weight: 'bold' as const },
        bodyColor: '#E4E4E7',
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const skill = (activeCategory === 'all' ? SKILLS_DATA : filteredSkills)[context.dataIndex]
            return ` ${skill.name}: ${context.raw}% (${skill.tier})`
          }
        }
      }
    },
    scales: {
      x: {
        min: 50,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#A1A1AA',
          font: { family: 'monospace', size: 10 },
          callback: (value: any) => `${value}%`
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#E4E4E7',
          font: { size: 11, weight: 500 }
        }
      }
    }
  }), [activeCategory, filteredSkills])

  // Doughnut Chart Configuration (Stack Domain Weight)
  const doughnutData = useMemo(() => {
    return {
      labels: ['Frontend & UI', 'Backend & Databases', 'Systems & Architecture'],
      datasets: [
        {
          data: [4, 2, 3], // 4 frontend, 2 backend, 3 systems
          backgroundColor: [
            CATEGORY_COLORS.frontend.primary,
            CATEGORY_COLORS.backend.primary,
            CATEGORY_COLORS.systems.primary
          ],
          borderColor: '#1C1C1C',
          borderWidth: 4,
          hoverOffset: 8
        }
      ]
    }
  }, [])

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#D4D4D8',
          font: { size: 11, family: 'sans-serif' },
          padding: 18,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: '#A1A1AA',
        padding: 10,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => ` ${context.label}: ${context.raw} Technologies`
        }
      }
    }
  }), [])

  return (
    <div className="space-y-12">
      {/* Top Special Color Key & Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#FF6B4A]/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Total Stack</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/15 text-[#FF6B4A] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-[#FF7A59] transition-colors">
            9 Core Skills
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A]"></span>
            <span>Frontend, Backend & Systems</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#00E5FF]/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Average Mastery</span>
            <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-[#38BDF8] transition-colors">
            87.2%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            <span>Evaluated Competency Index</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#10B981]/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Systems Mastery</span>
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-[#34D399] transition-colors">
            95% Max
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Systems Analysis & Modeling</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#F97316]/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Special Focus</span>
            <div className="w-8 h-8 rounded-lg bg-[#F97316]/15 text-[#F97316] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-2 group-hover:text-[#FB923C] transition-colors">
            Full-Stack + IS
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
            <span>Engineering & Enterprise Design</span>
          </div>
        </div>
      </div>

      {/* Special Domain Legend Indicators */}
      <div className="p-4 rounded-xl bg-[#222222]/80 border border-[#2E2E2E] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-300">
          <span className="text-stone-400 font-mono text-[11px] uppercase">Domain Indicator Key:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
            <span className="text-stone-300 font-medium">Frontend & WebGL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.6)]"></span>
            <span className="text-stone-300 font-medium">Backend & Databases</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            <span className="text-stone-300 font-medium">Systems Analysis & IS</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Chart View Switcher + Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b border-[#2A2A2A]">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#F97316] text-white shadow-md shadow-[#F97316]/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#262626]'
            }`}
          >
            All Skills (9)
          </button>
          <button
            onClick={() => setActiveCategory('frontend')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'frontend'
                ? 'bg-[#F97316] text-white shadow-md shadow-[#F97316]/30'
                : 'text-stone-400 hover:text-[#FB923C] hover:bg-[#262626]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
            Frontend (4)
          </button>
          <button
            onClick={() => setActiveCategory('backend')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'backend'
                ? 'bg-[#00E5FF] text-stone-900 font-bold shadow-md shadow-[#00E5FF]/30'
                : 'text-stone-400 hover:text-[#38BDF8] hover:bg-[#262626]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            Backend & DB (2)
          </button>
          <button
            onClick={() => setActiveCategory('systems')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'systems'
                ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/30'
                : 'text-stone-400 hover:text-[#34D399] hover:bg-[#262626]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            Systems & IS (3)
          </button>
        </div>

        {/* Chart View Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-[#171717] p-1 rounded-xl border border-[#2D2D2D] w-full md:w-auto justify-center">
          <button
            onClick={() => setChartType('radar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              chartType === 'radar'
                ? 'bg-[#292929] text-white shadow-sm border border-[#3E3E3E]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Competency Radar Matrix"
          >
            <RadarIcon className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Radar Matrix</span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              chartType === 'bar'
                ? 'bg-[#292929] text-white shadow-sm border border-[#3E3E3E]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Proficiency Level Bars"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Bar Indicators</span>
          </button>
          <button
            onClick={() => setChartType('doughnut')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              chartType === 'doughnut'
                ? 'bg-[#292929] text-white shadow-sm border border-[#3E3E3E]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Domain Allocation"
          >
            <PieChart className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Domain Share</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Panel View: Visual Chart on Left + Detailed Skill Cards on Right */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Chart.js Canvas */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#212121] border border-[#2E2E2E] shadow-xl relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {chartType === 'radar' && <RadarIcon className="w-5 h-5 text-[#FF6B4A]" />}
                  {chartType === 'bar' && <BarChart3 className="w-5 h-5 text-[#00E5FF]" />}
                  {chartType === 'doughnut' && <PieChart className="w-5 h-5 text-[#10B981]" />}
                  {chartType === 'radar' && 'Competency Radar Matrix'}
                  {chartType === 'bar' && 'Multi-Category Proficiency Levels'}
                  {chartType === 'doughnut' && 'Technical Domain Distribution'}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Powered by Chart.js with dynamic domain indicator mapping
                </p>
              </div>

              <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#171717] border border-[#2F2F2F] text-stone-300">
                {activeCategory === 'all' ? 'All Domains' : CATEGORY_COLORS[activeCategory].label}
              </span>
            </div>

            {/* The Dynamic Chart Canvas */}
            <div className="h-[380px] w-full flex items-center justify-center relative">
              {chartType === 'radar' && <Radar data={radarData} options={radarOptions} />}
              {chartType === 'bar' && <Bar data={barData} options={barOptions} />}
              {chartType === 'doughnut' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-3xl font-extrabold text-white">9</div>
                    <div className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">Skills</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#2B2B2B] flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Interactive Data Visualization</span>
              <span className="text-[#DF876B] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Rendered Canvas
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Skill Cards with Special Glow Indicators */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
              Showing {filteredSkills.length} of {SKILLS_DATA.length} Skills
            </span>
            <span className="text-xs text-stone-400">Hover card to highlight</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredSkills.map(skill => {
              const theme = CATEGORY_COLORS[skill.category]
              const isHovered = hoveredSkill === skill.name

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-4 rounded-xl bg-[#212121] border transition-all duration-300 relative overflow-hidden ${
                    isHovered 
                      ? 'border-[#DF876B] shadow-lg shadow-[#DF876B]/15 translate-x-1' 
                      : 'border-[#2E2E2E] hover:border-[#383838]'
                  }`}
                >
                  {/* Subtle category color indicator bar on left */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                    style={{ backgroundColor: theme.primary }}
                  />

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      {/* Special Glowing Indicator Dot */}
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-125"
                        style={{ 
                          backgroundColor: theme.primary,
                          boxShadow: `0 0 10px ${theme.glow}`
                        }}
                      />
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {skill.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border"
                        style={{
                          backgroundColor: theme.bg,
                          color: theme.primary,
                          borderColor: theme.border
                        }}
                      >
                        {skill.tier}
                      </span>
                      <span 
                        className="text-sm font-mono font-extrabold"
                        style={{ color: theme.primary }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 mb-3 leading-relaxed pl-5">
                    {skill.description}
                  </p>

                  {/* Gradient Indicator Progress Bar */}
                  <div className="w-full h-2 bg-[#161616] rounded-full overflow-hidden pl-5">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 relative"
                      style={{ 
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
                        boxShadow: isHovered ? `0 0 12px ${theme.glow}` : 'none'
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mt-2 pl-5">
                    <span>Domain: {theme.label}</span>
                    <span className="text-stone-400">{skill.experience}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Technical Domain Specialization Highlights */}
      <div className="grid md:grid-cols-3 gap-6 pt-2">
        <div className="p-6 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#FF6B4A]/40 transition-all flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#FF6B4A]/15 text-[#FF6B4A]">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Full-Stack & WebGL Interface</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Interactive 3D canvases, SSR hydration via Next.js, and strict TypeScript types.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#00E5FF]/40 transition-all flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Relational DB & API Engine</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              PostgreSQL schema normalization, indexing, ACID transactions, and Express microservices.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#212121] border border-[#2E2E2E] hover:border-[#10B981]/40 transition-all flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#10B981]/15 text-[#10B981]">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Systems Analysis & Network Planning</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Enterprise information modeling, UML, subnetting, gateway routing, and IT infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
