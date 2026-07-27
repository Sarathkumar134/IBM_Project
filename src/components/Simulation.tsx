import { Pause, Play, Activity, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import type { DeviceData } from '@/types';
import { Smartphone, Laptop, Watch, Headphones, Tablet, Cpu, Battery, BatteryCharging, BatteryLow } from 'lucide-react';

const ICON_MAP: Record<string, typeof Smartphone> = {
  phone: Smartphone,
  laptop: Laptop,
  watch: Watch,
  earbuds: Headphones,
  tablet: Tablet,
  iot: Cpu,
};

const PRIORITY_STYLES: Record<DeviceData['priority'], { label: string; cls: string }> = {
  critical: { label: 'Critical', cls: 'text-signal-red bg-signal-red/10 ring-signal-red/30' },
  high: { label: 'High', cls: 'text-signal-orange bg-signal-orange/10 ring-signal-orange/30' },
  medium: { label: 'Medium', cls: 'text-signal-amber bg-signal-amber/10 ring-signal-amber/30' },
  low: { label: 'Low', cls: 'text-cyber-300 bg-cyber-400/10 ring-cyber-400/30' },
};

function batteryColor(b: number) {
  if (b <= 20) return 'text-signal-red';
  if (b <= 40) return 'text-signal-orange';
  if (b <= 70) return 'text-signal-amber';
  return 'text-signal-green';
}
function batteryStroke(b: number) {
  if (b <= 20) return '#f87171';
  if (b <= 40) return '#fb923c';
  if (b <= 70) return '#fbbf24';
  return '#34d399';
}

function BatteryRing({ value, size = 64 }: { value: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={batteryStroke(value)} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value <= 15 ? <BatteryLow className={`h-4 w-4 ${batteryColor(value)}`} /> : value >= 85 ? <BatteryCharging className="h-4 w-4 text-signal-green" /> : <Battery className={`h-4 w-4 ${batteryColor(value)}`} />}
        <span className={`font-display text-sm font-bold ${batteryColor(value)}`}>{Math.round(value)}%</span>
      </div>
    </div>
  );
}

function DeviceCard({ d }: { d: DeviceData }) {
  const Icon = ICON_MAP[d.icon] ?? Smartphone;
  const pri = PRIORITY_STYLES[d.priority];
  const statusLabel = d.status === 'charging' ? 'Charging' : d.status === 'discharging' ? 'Draining' : 'Idle';
  const statusCls = d.status === 'charging' ? 'text-signal-green' : d.status === 'discharging' ? 'text-signal-orange' : 'text-slate-400';

  return (
    <div className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:border-cyber-400/30 hover:shadow-glow-sm">
      {d.status === 'charging' && <div className="absolute inset-0 bg-gradient-to-br from-signal-green/5 to-transparent" />}
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Icon className="h-5 w-5 text-cyber-200" />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-white">{d.name}</h3>
            <span className={`text-[11px] font-medium ${statusCls}`}>
              <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${d.status === 'charging' ? 'bg-signal-green animate-blink' : d.status === 'discharging' ? 'bg-signal-orange' : 'bg-slate-500'}`} />
              {statusLabel}
            </span>
          </div>
        </div>
        <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${pri.cls}`}>{pri.label}</span>
      </div>
      <div className="relative mt-4 flex items-center justify-between">
        <BatteryRing value={d.battery} />
        <div className="flex-1 pl-4 text-right">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Health</span>
            <span className="font-medium text-slate-300">{d.health}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyber-400 to-signal-green transition-all duration-700" style={{ width: `${d.health}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-500"><Zap className="h-3 w-3" /> Draw</span>
            <span className="font-medium text-slate-300">{d.consumption.toFixed(1)} W</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5">
      <span className="text-slate-500">{label}</span>
      <span className={`font-display font-semibold ${color}`}>{value}</span>
    </div>
  );
}

export default function Simulation({ devices, tick, running, onToggle }: {
  devices: DeviceData[];
  tick: number;
  running: boolean;
  onToggle: () => void;
}) {
  const avg = devices.reduce((s, d) => s + d.battery, 0) / devices.length;
  const charging = devices.filter((d) => d.status === 'charging').length;
  const totalDraw = devices.reduce((s, d) => s + d.consumption, 0);
  const low = devices.filter((d) => d.battery < 30).length;

  return (
    <section id="simulation" className="section-pad relative">
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-cyber-500/8 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Live Simulation"
            title="Real-time device"
            highlight="power dashboard"
            subtitle="Six devices form a sharing mesh. Watch batteries drain, get topped up, and rebalance as the AI routes power between them."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl glass p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onToggle}
                className="btn-glow flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyber-400 to-violetx-500 px-4 py-2 text-sm font-semibold text-ink-950"
              >
                {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Resume</>}
              </button>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <Activity className="h-3.5 w-3.5 text-cyber-300 animate-pulse" /> Tick #{tick} · updates every 2.2s
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Stat label="Avg Battery" value={`${avg.toFixed(1)}%`} color="text-cyber-300" />
              <Stat label="Charging" value={`${charging}/${devices.length}`} color="text-signal-green" />
              <Stat label="Low Power" value={`${low}`} color="text-signal-red" />
              <Stat label="Total Draw" value={`${totalDraw.toFixed(1)} W`} color="text-signal-amber" />
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((d, i) => (
            <Reveal key={d.id} delay={i * 70}>
              <DeviceCard d={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

