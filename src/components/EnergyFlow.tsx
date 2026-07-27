import { Smartphone, Laptop, Watch, Headphones, Tablet, Cpu, Radio } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { DeviceData } from '@/types';

const ICON_MAP: Record<string, typeof Smartphone> = {
  phone: Smartphone,
  laptop: Laptop,
  watch: Watch,
  earbuds: Headphones,
  tablet: Tablet,
  iot: Cpu,
};

// positions on a 100x100 canvas, arranged in a hexagon
const POSITIONS: Record<string, { x: number; y: number }> = {
  phone: { x: 50, y: 12 },
  laptop: { x: 85, y: 38 },
  watch: { x: 72, y: 78 },
  earbuds: { x: 28, y: 78 },
  tablet: { x: 15, y: 38 },
  iot: { x: 50, y: 50 },
};

function beamColor(d: DeviceData) {
  if (d.priority === 'critical') return '#f87171';
  if (d.priority === 'high') return '#fb923c';
  if (d.priority === 'medium') return '#a78bfa';
  return '#38bdf8';
}

export default function EnergyFlow({ devices }: { devices: DeviceData[] }) {
  const sortedDesc = [...devices].sort((a, b) => b.battery - a.battery);
  const donor = sortedDesc.find((d) => d.battery > 60) ?? sortedDesc[0];
  const receiver = [...devices].sort((a, b) => a.battery - b.battery).find((d) => d.id !== donor.id && d.battery < 45) ?? sortedDesc[0];

  const activeTransfers = devices
    .filter((d) => d.status === 'charging')
    .map((d) => ({ to: d.id, color: beamColor(d) }));

  return (
    <section id="flow" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Energy Flow"
            title="Wireless energy"
            highlight="network graph"
            subtitle="Devices appear as glowing nodes; animated beams show live power transfers, colored by the receiver's charging priority."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 glass-strong relative overflow-hidden rounded-3xl p-4 sm:p-8">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
              <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="ef-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="beam-anim" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* static mesh links */}
                {Object.entries(POSITIONS).map(([idA, a], i) => {
                  const others = Object.entries(POSITIONS).slice(i + 1);
                  return others.map(([idB, b]) => {
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist > 50) return null;
                    return (
                      <line key={`${idA}-${idB}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke="#1e293b" strokeWidth="0.2" strokeDasharray="0.6 0.8" />
                    );
                  });
                })}

                {/* active transfer beams */}
                {activeTransfers.map((t, i) => {
                  const donorPos = POSITIONS[donor.id];
                  const recvPos = POSITIONS[t.to];
                  if (!donorPos || !recvPos) return null;
                  const midX = (donorPos.x + recvPos.x) / 2;
                  const midY = (donorPos.y + recvPos.y) / 2 - 6;
                  return (
                    <g key={`beam-${t.to}-${i}`}>
                      <path
                        d={`M ${donorPos.x} ${donorPos.y} Q ${midX} ${midY} ${recvPos.x} ${recvPos.y}`}
                        fill="none" stroke={t.color} strokeWidth="0.8" strokeOpacity="0.85"
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                        className="dash-flow"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      {/* moving pulse dot */}
                      <circle r="0.9" fill={t.color}>
                        <animateMotion
                          dur="2.4s" repeatCount="indefinite"
                          path={`M ${donorPos.x} ${donorPos.y} Q ${midX} ${midY} ${recvPos.x} ${recvPos.y}`}
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* nodes */}
                {devices.map((d) => {
                  const pos = POSITIONS[d.id];
                  if (!pos) return null;
                  const color = beamColor(d);
                  const isDonor = d.id === donor.id;
                  const isReceiver = d.id === receiver.id;
                  return (
                    <g key={d.id}>
                      <circle cx={pos.x} cy={pos.y} r="6" fill="url(#ef-glow)" />
                      <circle cx={pos.x} cy={pos.y} r="2.6" fill={color} fillOpacity="0.9" />
                      <circle cx={pos.x} cy={pos.y} r="2.6" fill="none" stroke={color} strokeWidth="0.4">
                        <animate attributeName="r" values="2.6;6;2.6" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text x={pos.x} y={pos.y + 9} textAnchor="middle" fontSize="2.4" fill="#cbd5e1" className="font-display">
                        {Math.round(d.battery)}%
                      </text>
                      {isDonor && (
                        <text x={pos.x} y={pos.y - 5} textAnchor="middle" fontSize="2" fill="#34d399" className="font-display">
                          DONOR
                        </text>
                      )}
                      {isReceiver && (
                        <text x={pos.x} y={pos.y - 5} textAnchor="middle" fontSize="2" fill="#f87171" className="font-display">
                          RECV
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* device labels with icons overlay */}
              {devices.map((d) => {
                const pos = POSITIONS[d.id];
                const Icon = ICON_MAP[d.icon] ?? Smartphone;
                return (
                  <div
                    key={`label-${d.id}`}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/80 px-2 py-1 backdrop-blur"
                    style={{ left: `${pos.x}%`, top: `${pos.y + 14}%` }}
                  >
                    <Icon className="h-3 w-3 text-cyber-300" />
                    <span className="text-[9px] font-medium text-slate-300">{d.name}</span>
                  </div>
                );
              })}
            </div>

            {/* legend */}
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px]">
              <Legend color="#38bdf8" label="Low priority" />
              <Legend color="#a78bfa" label="Medium priority" />
              <Legend color="#fb923c" label="High priority" />
              <Legend color="#f87171" label="Critical priority" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Radio className="h-3.5 w-3.5 text-cyber-300 animate-pulse" />
            Beams animate in real time as the AI routes power from donor to receiver nodes.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-slate-400">
      <span className="h-2.5 w-6 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
