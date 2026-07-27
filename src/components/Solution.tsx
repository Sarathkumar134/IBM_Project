import { Smartphone, Laptop, Watch, Headphones, Tablet, Cpu } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const AI_TASKS = [
  'Which device should receive power',
  'Which device should donate power',
  'Charging priority by context',
  'Optimal energy routing path',
  'Safety and thermal limits',
  'Charging efficiency targets',
];

const DEVICES = [
  { icon: Smartphone, name: 'Phone', bat: '12%', x: 50, y: 15, color: '#f87171' },
  { icon: Laptop, name: 'Laptop', bat: '95%', x: 85, y: 45, color: '#34d399' },
  { icon: Watch, name: 'Watch', bat: '65%', x: 50, y: 50, color: '#38bdf8' },
  { icon: Tablet, name: 'Tablet', bat: '80%', x: 15, y: 45, color: '#a78bfa' },
  { icon: Headphones, name: 'Earbuds', bat: '20%', x: 30, y: 82, color: '#fb923c' },
  { icon: Cpu, name: 'IoT', bat: '55%', x: 70, y: 85, color: '#22d3ee' },
];

export default function Solution() {
  return (
    <section id="solution" className="section-pad relative">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violetx-500/5 blur-[140px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="The Solution"
            title="An AI-orchestrated"
            highlight="power-sharing network"
            subtitle="Nearby devices form a dynamic wireless energy mesh. An AI controller continuously evaluates the whole network and routes power where it's needed most."
          />
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Network visualization */}
          <Reveal>
            <div className="glass-strong relative aspect-square overflow-hidden rounded-3xl p-6">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* connections from laptop (donor) to phone (receiver) */}
                {[
                  [85, 45, 50, 15],
                  [85, 45, 50, 50],
                  [85, 45, 70, 85],
                  [50, 50, 50, 15],
                  [50, 50, 30, 82],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#38bdf8"
                    strokeWidth="0.4"
                    strokeOpacity="0.5"
                    className="dash-flow"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                ))}
                {DEVICES.map((d) => (
                  <g key={d.name}>
                    <circle cx={d.x} cy={d.y} r="7" fill="url(#node-glow)" />
                    <circle cx={d.x} cy={d.y} r="3.2" fill={d.color} fillOpacity="0.9" />
                    <circle cx={d.x} cy={d.y} r="3.2" fill="none" stroke={d.color} strokeWidth="0.5">
                      <animate attributeName="r" values="3.2;6;3.2" dur="3s" repeatCount="indefinite" begin={`${Math.random()}s`} />
                      <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" begin={`${Math.random()}s`} />
                    </circle>
                    <text x={d.x} y={d.y + 9} textAnchor="middle" fontSize="3" fill="#94a3b8" className="font-display">
                      {d.bat}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-signal-green">
                  <span className="h-2 w-2 rounded-full bg-signal-green" /> Donor: Laptop 95%
                </span>
                <span className="flex items-center gap-1.5 text-signal-red">
                  <span className="h-2 w-2 rounded-full bg-signal-red" /> Receiver: Phone 12%
                </span>
              </div>
            </div>
          </Reveal>

          {/* AI continuously decides */}
          <Reveal delay={150}>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                The AI continuously decides
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Every few seconds the decision engine re-evaluates battery levels, device priority,
                predicted usage, and thermal state, then orchestrates a safe, efficient transfer.
              </p>
              <ul className="mt-6 space-y-3">
                {AI_TASKS.map((task, i) => (
                  <li
                    key={task}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-cyber-400/30 hover:bg-cyber-400/5"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyber-400/10 font-display text-xs font-bold text-cyber-300 ring-1 ring-cyber-400/20">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{task}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyber-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
