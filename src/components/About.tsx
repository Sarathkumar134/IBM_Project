import { Sparkles, Cpu, Radio, TrendingUp } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const PILLARS = [
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    text: 'A neural decision engine predicts demand, assigns priority, and routes power in real time across every connected device.',
  },
  {
    icon: Radio,
    title: 'Wireless Power Transfer',
    text: 'Resonant inductive coupling lets nearby devices exchange energy without cables, chargers, or physical contact.',
  },
  {
    icon: TrendingUp,
    title: 'Adaptive Efficiency',
    text: 'Dynamic load balancing and usage-pattern learning cut energy waste and slow battery degradation over time.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="About the Project"
            title="A self-organizing"
            highlight="energy mesh"
            subtitle="Portable devices are charged one at a time, wasting idle battery capacity and wearing batteries faster. This project builds an intelligent wireless power-sharing ecosystem where devices automatically exchange energy based on need, priority, and predicted usage."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 120}>
                <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyber-400/30 hover:shadow-glow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-400/20 to-violetx-500/20 ring-1 ring-cyber-400/30">
                    <Icon className="h-6 w-6 text-cyber-300" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-cyber-400/20 bg-cyber-400/5 p-6">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyber-300" />
            <p className="text-sm leading-relaxed text-slate-300">
              Research on adaptive resonant beam charging demonstrates that dynamically adjusting
              power delivery can meaningfully improve charging efficiency and reduce energy waste.
              This system turns that principle into a working, device-to-device ecosystem.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
