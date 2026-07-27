import { Smartphone, Battery, Brain, ListChecks, Route, Zap, Activity } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const STEPS = [
  { icon: Smartphone, title: 'Nearby Devices', text: 'Devices discover each other over the wireless power mesh.' },
  { icon: Battery, title: 'Battery Detection', text: 'Current levels, health, and consumption are sampled.' },
  { icon: Brain, title: 'AI Analysis', text: 'The engine evaluates state, history, and predictions.' },
  { icon: ListChecks, title: 'Priority Assignment', text: 'Each device is ranked by urgency and importance.' },
  { icon: Route, title: 'Wireless Power Routing', text: 'An optimal donor-to-receiver path is selected.' },
  { icon: Zap, title: 'Dynamic Energy Transfer', text: 'Power flows wirelessly at a safe, calculated rate.' },
  { icon: Activity, title: 'Continuous Monitoring', text: 'The loop restarts as conditions change.' },
];

export default function Workflow() {
  return (
    <section id="workflow" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="AI Workflow"
            title="The decision"
            highlight="loop"
            subtitle="A continuous cycle: detect, analyze, prioritize, route, transfer, and monitor — repeating every few seconds."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid gap-4 md:grid-cols-4 lg:grid-cols-7">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative">
                  <div className="glass group h-full rounded-2xl p-5 transition-all hover:-translate-y-1.5 hover:border-cyber-400/30 hover:shadow-glow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-400/20 to-violetx-500/20 ring-1 ring-cyber-400/30">
                        <Icon className="h-4.5 w-4.5 text-cyber-300" />
                      </span>
                      <span className="font-display text-2xl font-bold text-white/10">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-sm font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{s.text}</p>
                  </div>
                  {/* connector arrow */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M2 8 L12 8 M9 5 L12 8 L9 11" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" className="dash-flow" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* loop indicator */}
        <Reveal delay={200}>
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-cyber-400/20 bg-cyber-400/5 px-5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-cyber-400 animate-blink" />
              <span className="text-xs text-slate-300">
                Step 7 feeds back into Step 1 — the loop never stops while devices are connected
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
