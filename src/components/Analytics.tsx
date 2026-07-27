import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Gauge, Target, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useInterval } from '@/hooks';

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const cx = (prev.x + cur.x) / 2;
    d += ` Q ${cx} ${prev.y} ${cx} ${(prev.y + cur.y) / 2}`;
    d += ` T ${cur.x} ${cur.y}`;
  }
  return d;
}

interface LineChartProps {
  data: number[];
  color: string;
  max: number;
  label: string;
  unit: string;
}

function LineChart({ data, color, max, label, unit }: LineChartProps) {
  const w = 100;
  const h = 38;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / max) * h,
  }));
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;
  const current = data[data.length - 1] ?? 0;
  const prev = data[data.length - 2] ?? current;
  const trend = current >= prev;

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
        <span className={`flex items-center gap-1 text-xs ${trend ? 'text-signal-green' : 'text-signal-red'}`}>
          {trend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {current.toFixed(1)}{unit}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-20 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`area-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[10, 19, 28].map((y) => (
          <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="rgba(148,163,184,0.08)" strokeWidth="0.3" />
        ))}
        <path d={areaPath} fill={`url(#area-${label})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="1.2" fill={color}>
          <animate attributeName="r" values="1.2;2;1.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

interface DoughnutSegment { value: number; color: string; label: string }

function Doughnut({ segments, label }: { segments: DoughnutSegment[]; label: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 26;
  const cx = 34;
  const cy = 34;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="glass rounded-2xl p-5">
      <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <div className="mt-3 flex items-center gap-4">
        <svg width="68" height="68" viewBox="0 0 68 68" className="-rotate-90 shrink-0">
          {segments.map((s, i) => {
            const len = (s.value / total) * circumference;
            const el = (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none" stroke={s.color} strokeWidth="7"
                strokeDasharray={`${len} ${circumference - len}`}
                strokeDashoffset={-offset}
                style={{ transition: 'stroke-dasharray 0.6s ease' }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="flex-1 space-y-1.5">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="font-display font-semibold text-white">{Math.round((s.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function CircularProgress({ value, max, label, unit, color, icon: Icon }: {
  value: number; max: number; label: string; unit: string; color: string;
  icon: typeof Activity;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="glass flex flex-col items-center rounded-2xl p-4">
      <div className="relative" style={{ width: 56, height: 56 }}>
        <svg width="56" height="56" className="-rotate-90">
          <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="4" />
          <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
      </div>
      <span className="mt-2 font-display text-lg font-bold text-white">{value.toFixed(0)}{unit}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}

export default function Analytics() {
  const [history, setHistory] = useState<number[]>(Array.from({ length: 20 }, () => 50 + Math.random() * 20));
  const [saved, setSaved] = useState<number[]>(Array.from({ length: 20 }, () => 30 + Math.random() * 15));
  const [efficiency, setEfficiency] = useState<number[]>(Array.from({ length: 20 }, () => 82 + Math.random() * 10));
  const [health, setHealth] = useState<number[]>(Array.from({ length: 20 }, () => 88 + Math.random() * 6));
  const [chargeTime, setChargeTime] = useState<number[]>(Array.from({ length: 20 }, () => 8 + Math.random() * 6));
  const [accuracy, setAccuracy] = useState(94);

  useInterval(() => {
    const push = (setter: React.Dispatch<React.SetStateAction<number[]>>, gen: () => number) =>
      setter((arr) => [...arr.slice(1), gen()]);
    push(setHistory, () => Math.max(5, Math.min(98, history[history.length - 1] + (Math.random() - 0.5) * 12)));
    push(setSaved, () => Math.max(10, Math.min(60, saved[saved.length - 1] + (Math.random() - 0.5) * 8)));
    push(setEfficiency, () => Math.max(70, Math.min(99, efficiency[efficiency.length - 1] + (Math.random() - 0.5) * 5)));
    push(setHealth, () => Math.max(80, Math.min(99, health[health.length - 1] + (Math.random() - 0.5) * 2)));
    push(setChargeTime, () => Math.max(3, Math.min(20, chargeTime[chargeTime.length - 1] + (Math.random() - 0.5) * 3)));
    setAccuracy(Math.max(88, Math.min(99, accuracy + (Math.random() - 0.5) * 2)));
  }, 2500);

  const avgEff = efficiency[efficiency.length - 1];
  const avgHealth = health[health.length - 1];
  const avgSaved = saved[saved.length - 1];

  const doughnutSegs: DoughnutSegment[] = [
    { value: avgEff, color: '#34d399', label: 'Transfer' },
    { value: 100 - avgEff, color: '#f87171', label: 'Loss' },
  ];

  return (
    <section id="analytics" className="section-pad relative">
      <div className="absolute left-1/2 top-1/4 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-cyber-500/8 blur-[140px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Energy Analytics"
            title="Live battery &"
            highlight="efficiency analytics"
            subtitle="Charts update in real time: battery history, energy saved, transfer efficiency, battery health, charging time, and AI prediction accuracy."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <LineChart data={history} color="#38bdf8" max={100} label="Battery History" unit="%" />
              <LineChart data={saved} color="#34d399" max={60} label="Energy Saved" unit="%" />
              <LineChart data={efficiency} color="#a78bfa" max={100} label="Transfer Efficiency" unit="%" />
              <LineChart data={chargeTime} color="#fb923c" max={20} label="Charging Time" unit="m" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Doughnut segments={doughnutSegs} label="Wireless Transfer Efficiency" />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-4">
          <Reveal delay={60}><CircularProgress value={avgEff} max={100} label="Efficiency" unit="%" color="#34d399" icon={Gauge} /></Reveal>
          <Reveal delay={120}><CircularProgress value={avgHealth} max={100} label="Battery Health" unit="%" color="#38bdf8" icon={Activity} /></Reveal>
          <Reveal delay={180}><CircularProgress value={avgSaved} max={60} label="Energy Saved" unit="%" color="#a78bfa" icon={TrendingUp} /></Reveal>
          <Reveal delay={240}><CircularProgress value={accuracy} max={100} label="AI Accuracy" unit="%" color="#fbbf24" icon={Target} /></Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-cyber-300" />
            All charts refresh every 2.5 seconds with simulated telemetry.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
