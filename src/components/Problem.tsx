import { Battery, Plug, AlertTriangle, Layers, Clock, Gauge } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useCountUp, useInView } from '@/hooks';

const PROBLEMS = [
  { icon: Plug, title: 'Individual Charging', text: 'Every device needs its own cable and adapter, creating clutter and friction.', stat: 1, suffix: '×', statLabel: 'charger per device' },
  { icon: Battery, title: 'Energy Wastage', text: 'Idle battery capacity sits unused while other devices run dry.', stat: 38, suffix: '%', statLabel: 'energy wasted' },
  { icon: AlertTriangle, title: 'Battery Degradation', text: 'Frequent full cycles and heat from unoptimized charging shorten lifespan.', stat: 2, suffix: '×', statLabel: 'faster aging' },
  { icon: Layers, title: 'Multiple Chargers', text: 'A growing collection of incompatible bricks and cables for each gadget.', stat: 5, suffix: '+', statLabel: 'chargers per user' },
  { icon: Clock, title: 'Idle Capacity Unused', text: 'A fully-charged laptop cannot help a dying phone sitting right next to it.', stat: 60, suffix: '%', statLabel: 'idle capacity' },
  { icon: Gauge, title: 'Poor Prioritization', text: 'No intelligence decides which device matters most in a given moment.', stat: 0, suffix: '%', statLabel: 'smart routing' },
];

function ProblemCard({ p, start, i }: { p: (typeof PROBLEMS)[number]; start: boolean; i: number }) {
  const Icon = p.icon;
  const value = useCountUp(p.stat, 1800, start);
  return (
    <Reveal delay={i * 90} className="h-full">
      <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-signal-red/30">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-signal-red/5 blur-2xl transition-opacity group-hover:opacity-100" />
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-red/10 ring-1 ring-signal-red/20">
          <Icon className="h-5 w-5 text-signal-red" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
        <div className="mt-5 flex items-end gap-1 border-t border-white/5 pt-4">
          <span className="font-display text-3xl font-bold text-signal-red">
            {Math.round(value)}{p.suffix}
          </span>
          <span className="mb-1 ml-1 text-[11px] uppercase tracking-wider text-slate-500">{p.statLabel}</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function Problem() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="problem" className="section-pad relative">
      <div ref={ref} />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="The Problem"
            title="Today's charging model is"
            highlight="broken"
            subtitle="One-device-one-charger thinking wastes energy, wears out batteries, and ignores the idle power sitting all around us."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={p.title} p={p} start={inView} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
