import { useState } from 'react';
import { Smartphone, Radio, Brain, Battery, Cpu, Zap, Cloud, Monitor, X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const COMPONENTS = [
  { id: 'devices', icon: Smartphone, title: 'Portable Devices', desc: 'Smartphones, laptops, smartwatches, earbuds, tablets, and IoT sensors that join the sharing mesh and report their battery state.' },
  { id: 'wpt', icon: Radio, title: 'Wireless Power Module', desc: 'Resonant inductive coupling coils that physically transfer energy between nearby devices without cables.' },
  { id: 'ai', icon: Brain, title: 'AI Controller', desc: 'The decision engine that analyzes battery levels, predicts demand, and orchestrates transfers in real time.' },
  { id: 'monitor', icon: Battery, title: 'Battery Monitoring', desc: 'Continuously samples voltage, temperature, capacity, and health from every connected device.' },
  { id: 'engine', icon: Cpu, title: 'Decision Engine', desc: 'Prioritization, routing, and safety logic that turns AI predictions into concrete transfer commands.' },
  { id: 'distro', icon: Zap, title: 'Power Distribution Module', desc: 'Executes the engine commands, modulating wattage and routing power to the selected receiver.' },
  { id: 'cloud', icon: Cloud, title: 'Cloud Database', desc: 'Stores usage patterns, transfer logs, and learned models for long-term optimization and analytics.' },
  { id: 'web', icon: Monitor, title: 'Web Dashboard', desc: 'Real-time visualization of the entire ecosystem — the interface you are looking at right now.' },
];

export default function Architecture() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedComp = COMPONENTS.find((c) => c.id === selected);

  return (
    <section id="architecture" className="section-pad relative">
      <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-violetx-500/8 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="System Architecture"
            title="Interactive"
            highlight="architecture diagram"
            subtitle="Click any component to see what it does. Power and data flow top-to-bottom through the system."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 glass-strong rounded-3xl p-6 sm:p-10">
            <div className="flex flex-col items-center gap-3">
              {COMPONENTS.map((c, i) => {
                const Icon = c.icon;
                const isActive = selected === c.id;
                return (
                  <div key={c.id} className="flex w-full max-w-2xl flex-col items-center">
                    <button
                      onClick={() => setSelected(isActive ? null : c.id)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-cyber-400/50 bg-cyber-400/10 shadow-glow-sm'
                          : 'border-white/10 bg-white/[0.02] hover:border-cyber-400/30 hover:bg-cyber-400/5'
                      }`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all ${
                        isActive ? 'bg-gradient-to-br from-cyber-400 to-violetx-500 ring-cyber-400/40' : 'bg-white/5 ring-white/10 group-hover:ring-cyber-400/30'
                      }`}>
                        <Icon className={`h-5 w-5 ${isActive ? 'text-ink-950' : 'text-cyber-200'}`} />
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-sm font-semibold text-white">{c.title}</h3>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">{c.desc}</p>
                      </div>
                      <span className={`font-display text-xs font-bold transition-colors ${isActive ? 'text-cyber-300' : 'text-slate-600'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                    {i < COMPONENTS.length - 1 && (
                      <div className="flex flex-col items-center py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyber-400/40" />
                        <span className="h-5 w-px bg-gradient-to-b from-cyber-400/40 to-transparent" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* detail modal */}
      {selectedComp && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-strong relative w-full max-w-md rounded-2xl p-6 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-400 to-violetx-500">
              <selectedComp.icon className="h-6 w-6 text-ink-950" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">{selectedComp.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{selectedComp.desc}</p>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-cyber-400/20 bg-cyber-400/5 px-3 py-2 text-xs text-cyber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-400 animate-blink" />
              Component {COMPONENTS.findIndex((c) => c.id === selected) + 1} of {COMPONENTS.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
