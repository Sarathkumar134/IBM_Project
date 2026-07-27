import { Users, Github, Linkedin, Mail } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const MEMBERS = [
  { name: 'Dr. Aanya Sharma', role: 'Principal Investigator', focus: 'Wireless Power Transfer & AI Systems', initials: 'AS', color: 'from-cyber-400 to-electric-600' },
  { name: 'Rohan Mehta', role: 'ML Research Lead', focus: 'Battery Prediction Models', initials: 'RM', color: 'from-violetx-400 to-violetx-600' },
  { name: 'Priya Nair', role: 'Hardware Engineer', focus: 'Resonant Inductive Coupling', initials: 'PN', color: 'from-electric-400 to-cyber-500' },
  { name: 'Kabir Verma', role: 'Full-Stack Developer', focus: 'Real-time Dashboard & Cloud', initials: 'KV', color: 'from-cyber-300 to-violetx-400' },
];

export default function Team() {
  return (
    <section id="team" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="The Team"
            title="Researchers behind"
            highlight="the system"
            subtitle="A multidisciplinary team spanning wireless power, machine learning, hardware, and software."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 100}>
              <div className="glass group h-full rounded-2xl p-6 text-center transition-all hover:-translate-y-1.5 hover:shadow-glow-sm">
                <div className="relative mx-auto h-20 w-20">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${m.color} opacity-20 blur-lg transition-opacity group-hover:opacity-40`} />
                  <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} font-display text-2xl font-bold text-ink-950`}>
                    {m.initials}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{m.name}</h3>
                <p className="mt-1 text-xs font-medium text-cyber-300">{m.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{m.focus}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {[Github, Linkedin, Mail].map((Icon, j) => (
                    <span key={j} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition-all hover:border-cyber-400/40 hover:text-cyber-300">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Users className="h-3.5 w-3.5 text-cyber-300" />
            Collaborating across Electrical Engineering, Computer Science, and Applied AI departments.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
