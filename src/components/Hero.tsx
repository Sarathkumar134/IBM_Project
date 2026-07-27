import { useEffect, useState } from 'react';
import { Smartphone, Laptop, Watch, Headphones, Tablet, Cpu, Activity, ChevronRight, Zap } from 'lucide-react';

const FLOATERS = [
  { icon: Smartphone, label: 'Phone', x: '8%', y: '22%', delay: '0s', dur: '6s', color: 'from-cyber-400 to-electric-600' },
  { icon: Laptop, label: 'Laptop', x: '78%', y: '18%', delay: '0.8s', dur: '7s', color: 'from-violetx-400 to-violetx-600' },
  { icon: Watch, label: 'Watch', x: '20%', y: '66%', delay: '1.2s', dur: '5.5s', color: 'from-electric-400 to-cyber-500' },
  { icon: Headphones, label: 'Earbuds', x: '70%', y: '62%', delay: '0.4s', dur: '6.5s', color: 'from-cyber-300 to-electric-500' },
  { icon: Tablet, label: 'Tablet', x: '44%', y: '78%', delay: '1.6s', dur: '7.5s', color: 'from-violetx-300 to-cyber-400' },
  { icon: Cpu, label: 'IoT', x: '88%', y: '46%', delay: '2s', dur: '6s', color: 'from-electric-300 to-violetx-400' },
];

const STATS = [
  { value: 42, suffix: '%', label: 'Energy Saved' },
  { value: 35, suffix: '%', label: 'Battery Life Gain' },
  { value: 6, suffix: '', label: 'Devices Coordinated' },
  { value: 98, suffix: '%', label: 'AI Confidence' },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-hero-radial pt-28 md:pt-32">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyber-500/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violetx-500/10 blur-[100px]" aria-hidden="true" />

      {/* SVG energy beams connecting devices */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="beam-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="12%" y1="28%" x2="82%" y2="24%" stroke="url(#beam-cyan)" strokeWidth="1.5" className="dash-flow" />
        <line x1="24%" y1="72%" x2="74%" y2="68%" stroke="url(#beam-cyan)" strokeWidth="1.5" className="dash-flow" style={{ animationDelay: '2s' }} />
        <line x1="48%" y1="82%" x2="90%" y2="50%" stroke="url(#beam-cyan)" strokeWidth="1.2" className="dash-flow" style={{ animationDelay: '4s' }} />
      </svg>

      {/* Floating devices */}
      {FLOATERS.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.label}
            className="absolute hidden md:block"
            style={{ left: f.x, top: f.y, animation: `float-soft ${f.dur} ease-in-out infinite`, animationDelay: f.delay }}
          >
            <div className="glass group relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-glow-sm">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.color} opacity-10 transition-opacity group-hover:opacity-25`} />
              <Icon className="h-7 w-7 text-cyber-200" />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {f.label}
              </span>
              <span className="absolute inset-0 rounded-2xl ring-1 ring-cyber-400/20" />
            </div>
          </div>
        );
      })}

      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-cyber-400/30 bg-cyber-400/5 px-4 py-1.5 text-xs font-medium text-cyber-200 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          AI-Powered Wireless Power Sharing Ecosystem
        </div>

        <h1
          className={`mt-6 font-display text-4xl font-bold leading-[1.1] text-white transition-all duration-700 delay-100 sm:text-5xl md:text-6xl lg:text-7xl ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Intelligent Wireless <br className="hidden sm:block" />
          Energy Sharing for the <br className="hidden sm:block" />
          <span className="text-gradient gradient-animated">Next Generation</span> of
          Portable Devices
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 transition-all duration-700 delay-200 sm:text-lg ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Devices intelligently exchange wireless power based on battery level, priority,
          AI prediction, and real-time user activity — reducing waste and extending battery life
          across your entire device ecosystem.
        </p>

        <div
          className={`mt-9 flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-300 sm:flex-row ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => scrollTo('simulation')}
            className="btn-glow group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyber-400 to-violetx-500 px-7 py-3.5 text-sm font-semibold text-ink-950"
          >
            <Zap className="h-4 w-4" strokeWidth={2.5} />
            Live Simulation
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('architecture')}
            className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-cyber-400/40 hover:bg-cyber-400/10"
          >
            View Architecture
          </button>
        </div>

        {/* Stat strip */}
        <div
          className={`mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 transition-all duration-700 delay-500 md:grid-cols-4 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-xl px-4 py-4 text-center">
              <div className="font-display text-2xl font-bold text-gradient-cyan">
                {s.value}{s.suffix}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 rounded-full bg-cyber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
