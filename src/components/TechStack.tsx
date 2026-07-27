import { Code2, Server, Database, Brain, Radio, Wifi } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const CATEGORIES = [
  {
    icon: Code2, title: 'Frontend', color: 'from-cyber-400/20 to-electric-500/20', ring: 'ring-cyber-400/30',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Server, title: 'Backend', color: 'from-violetx-400/20 to-violetx-600/20', ring: 'ring-violetx-400/30',
    items: ['Node.js', 'Express'],
  },
  {
    icon: Database, title: 'Database', color: 'from-electric-400/20 to-cyber-500/20', ring: 'ring-electric-400/30',
    items: ['Firebase', 'Supabase'],
  },
  {
    icon: Brain, title: 'AI', color: 'from-cyber-300/20 to-violetx-400/20', ring: 'ring-cyber-300/30',
    items: ['TensorFlow.js', 'Python', 'Machine Learning'],
  },
  {
    icon: Wifi, title: 'Communication', color: 'from-electric-300/20 to-cyber-400/20', ring: 'ring-electric-300/30',
    items: ['WebSocket', 'MQTT'],
  },
  {
    icon: Radio, title: 'Wireless Power', color: 'from-violetx-300/20 to-cyber-400/20', ring: 'ring-violetx-300/30',
    items: ['Inductive Charging', 'Resonant WPT'],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Technology Stack"
            title="Built with a"
            highlight="modern, AI-ready stack"
            subtitle="From the reactive frontend to the machine-learning core and the physical wireless power layer."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={(i % 3) * 100}>
                <div className="glass group h-full rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:shadow-glow-sm">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} ring-1 ${cat.ring}`}>
                      <Icon className="h-5 w-5 text-cyber-200" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-white">{cat.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-cyber-400/40 hover:bg-cyber-400/10 hover:text-cyber-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
