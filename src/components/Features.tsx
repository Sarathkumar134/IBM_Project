import { Brain, Radio, Search, ListChecks, Zap, Scale, Activity, TrendingDown, ShieldCheck, Siren } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const FEATURES = [
  { icon: Brain, title: 'AI Battery Prediction', text: 'Neural models forecast each device near-term drain and demand from usage history.', color: 'from-cyber-400/20 to-violetx-500/20', ring: 'ring-cyber-400/30' },
  { icon: Radio, title: 'Wireless Power Transfer', text: 'Resonant inductive coupling exchanges energy between nearby devices with no cables.', color: 'from-electric-400/20 to-cyber-500/20', ring: 'ring-electric-400/30' },
  { icon: Search, title: 'Device Discovery', text: 'The mesh auto-discovers nearby devices and negotiates power-sharing capabilities.', color: 'from-violetx-400/20 to-violetx-600/20', ring: 'ring-violetx-400/30' },
  { icon: ListChecks, title: 'Smart Priority Scheduling', text: 'Critical devices jump the queue based on context, battery, and user importance.', color: 'from-cyber-300/20 to-electric-500/20', ring: 'ring-cyber-300/30' },
  { icon: Zap, title: 'Energy Optimization', text: 'Continuous minimization of loss across transfers, routing, and conversion stages.', color: 'from-electric-300/20 to-violetx-400/20', ring: 'ring-electric-300/30' },
  { icon: Scale, title: 'Automatic Load Balancing', text: 'Power redistributes dynamically as devices join, leave, or change state.', color: 'from-cyber-400/20 to-electric-600/20', ring: 'ring-cyber-400/30' },
  { icon: Activity, title: 'Real-Time Monitoring', text: 'Live telemetry of battery, temperature, transfer rate, and network health.', color: 'from-violetx-300/20 to-cyber-400/20', ring: 'ring-violetx-300/30' },
  { icon: TrendingDown, title: 'Usage Pattern Learning', text: 'The engine learns daily routines to predict demand before it happens.', color: 'from-cyber-500/20 to-violetx-500/20', ring: 'ring-cyber-500/30' },
  { icon: ShieldCheck, title: 'Battery Health Protection', text: 'Thermal and cycle limits prevent over-transfer and extend cell lifespan.', color: 'from-electric-400/20 to-cyber-400/20', ring: 'ring-electric-400/30' },
  { icon: Siren, title: 'Emergency Power Sharing', text: 'A dying critical device can pull from any available donor instantly.', color: 'from-signal-red/20 to-violetx-400/20', ring: 'ring-signal-red/30' },
];

export default function Features() {
  return (
    <section id="features" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Core Features"
            title="Ten capabilities working"
            highlight="in concert"
            subtitle="From prediction to protection, each feature handles one part of the intelligent power-sharing loop."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 5) * 80}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ${f.ring}`}>
                    <Icon className="h-5 w-5 text-cyber-200 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="relative mt-4 font-display text-base font-semibold text-white">{f.title}</h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-slate-400">{f.text}</p>
                  <span className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${f.color.replace('/20', '')} transition-all duration-300 group-hover:w-full`} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
