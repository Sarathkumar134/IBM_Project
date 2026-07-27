import { Zap, Battery, Gauge, Clock, ListChecks, TrendingDown } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useCountUp, useInView } from '@/hooks';

const BENEFITS = [
  { icon: Zap, value: 42, suffix: '%', label: 'Energy Saving', color: '#34d399' },
  { icon: Battery, value: 35, suffix: '%', label: 'Battery Life Improvement', color: '#38bdf8' },
  { icon: Gauge, value: 28, suffix: '%', label: 'Charging Efficiency', color: '#a78bfa' },
  { icon: Clock, value: 40, suffix: '%', label: 'Reduced Charging Time', color: '#fb923c' },
  { icon: ListChecks, value: 100, suffix: '%', label: 'Automatic Device Prioritization', color: '#22d3ee' },
  { icon: TrendingDown, value: 31, suffix: '%', label: 'Lower Power Consumption', color: '#fbbf24' },
];

function BenefitCard({ b, index, inView }: { b: (typeof BENEFITS)[number]; index: number; inView: boolean }) {
  const Icon = b.icon;
  const value = useCountUp(b.value, 2200, inView);
  return (
    <Reveal delay={(index % 3) * 100}>
      <div className="glass group relative h-full overflow-hidden rounded-2xl p-7 text-center transition-all hover:-translate-y-1.5 hover:shadow-glow-sm">
        <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40" style={{ background: b.color }} />
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-white/10" style={{ background: `${b.color}1a` }}>
          <Icon className="h-7 w-7" style={{ color: b.color }} />
        </span>
        <div className="relative mt-5 font-display text-5xl font-bold text-white">
          {Math.round(value)}<span className="text-2xl" style={{ color: b.color }}>{b.suffix}</span>
        </div>
        <div className="relative mt-2 text-sm text-slate-400">{b.label}</div>
        <div className="relative mx-auto mt-4 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: inView ? `${b.value}%` : '0%', background: b.color }} />
        </div>
      </div>
    </Reveal>
  );
}

export default function Research() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="research" className="section-pad relative">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-500/6 blur-[150px]" />
      <div className="mx-auto max-w-7xl" ref={ref}>
        <Reveal>
          <SectionHeading
            eyebrow="Research Benefits"
            title="Measured"
            highlight="real-world impact"
            subtitle="Modeled outcomes from the adaptive power-sharing ecosystem across energy, battery life, and charging behavior."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.label} b={b} index={i} inView={inView} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <p className="text-sm text-slate-400">
              Figures are modeled estimates based on adaptive resonant beam charging research
              and simulated device-to-device transfer scenarios.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
