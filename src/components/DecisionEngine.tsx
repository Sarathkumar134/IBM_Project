import { useEffect, useState } from 'react';
import { Brain, ArrowRight, Gauge, Clock, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useInterval } from '@/hooks';
import type { DeviceData, Decision } from '@/types';

interface Props {
  devices: DeviceData[];
}

const REASONS = [
  'Receiver below critical threshold; donor has surplus capacity and low priority.',
  'Predicted usage spike on receiver within 15 min; preemptive transfer initiated.',
  'Thermal state nominal on donor side; safe to route 18W without degradation.',
  'User activity pattern indicates receiver is primary device this hour.',
  'Load rebalance: donor was idle and receiver draw exceeded 3W for 60s.',
];

function decide(devices: DeviceData[]): Decision {
  const sortedDesc = [...devices].sort((a, b) => b.battery - a.battery);
  const donor = sortedDesc.find((d) => d.battery > 55) ?? sortedDesc[0];
  const sortedAsc = [...devices].sort((a, b) => a.battery - b.battery);
  const receiver = sortedAsc.find((d) => d.id !== donor.id && d.battery < 45) ?? sortedAsc[0];
  const deficit = 100 - receiver.battery;
  const surplus = donor.battery - 30;
  const transferWatts = Math.min(25, Math.max(5, Math.round((deficit / 100) * 24)));
  const estimatedMinutes = Math.round((deficit / transferWatts) * 12);
  const confidence = Math.min(99, 82 + Math.round((surplus / 100) * 15) + Math.floor(Math.random() * 4));
  const reasoning = REASONS[Math.floor(Math.random() * REASONS.length)];
  return {
    source: donor.name,
    receiver: receiver.name,
    transferWatts,
    estimatedMinutes,
    confidence,
    reasoning,
    timestamp: Date.now(),
  };
}

function DecisionRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
      <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <span className={`font-display text-sm font-semibold ${accent ?? 'text-white'}`}>{value}</span>
    </div>
  );
}

export default function DecisionEngine({ devices }: Props) {
  const [decision, setDecision] = useState<Decision>(() => decide(devices));
  const [history, setHistory] = useState<Decision[]>([]);

  useInterval(() => {
    const next = decide(devices);
    setDecision(next);
    setHistory((h) => [next, ...h].slice(0, 4));
  }, 4000);

  useEffect(() => {
    setDecision(decide(devices));
  }, [devices]);

  const deviceBatteries = [...devices].sort((a, b) => a.battery - b.battery);

  return (
    <section id="decision" className="section-pad relative">
      <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violetx-500/8 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="AI Decision Engine"
            title="Watch the AI"
            highlight="decide in real time"
            subtitle="Every few seconds the engine picks a donor, a receiver, a safe transfer rate, and an estimated completion time — then logs its reasoning."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Live battery snapshot */}
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                <Cpu className="h-4 w-4 text-cyber-300" /> Battery Snapshot
              </h3>
              <div className="mt-4 space-y-2.5">
                {deviceBatteries.map((d) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <span className="w-20 truncate text-xs text-slate-400">{d.name}</span>
                    <div className="flex-1 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${d.battery}%`,
                          background: d.battery < 20 ? '#f87171' : d.battery < 40 ? '#fb923c' : d.battery < 70 ? '#fbbf24' : '#34d399',
                        }}
                      />
                    </div>
                    <span className="w-10 text-right font-display text-xs font-semibold text-white">{Math.round(d.battery)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Current decision */}
          <Reveal delay={120}>
            <div className="glass-strong relative h-full overflow-hidden rounded-2xl p-6">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyber-400/10 blur-2xl" />
              <div className="relative flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-400 to-violetx-500">
                  <Brain className="h-5 w-5 text-ink-950" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white">AI Decision</h3>
                  <span className="text-[11px] text-cyber-300 animate-blink">● live</span>
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] py-5">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Source</div>
                  <div className="mt-1 font-display text-base font-bold text-signal-green">{decision.source}</div>
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-cyber-400/20 animate-pulse-ring" />
                  <ArrowRight className="h-5 w-5 text-cyber-300" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Receiver</div>
                  <div className="mt-1 font-display text-base font-bold text-signal-red">{decision.receiver}</div>
                </div>
              </div>

              <div className="relative mt-4">
                <DecisionRow label="Transfer Power" value={`${decision.transferWatts} Watts`} accent="text-cyber-300" />
                <DecisionRow label="Estimated Time" value={`${decision.estimatedMinutes} min`} accent="text-electric-300" />
                <DecisionRow label="AI Confidence" value={`${decision.confidence}%`} accent="text-signal-green" />
              </div>

              <div className="relative mt-4 rounded-xl border border-cyber-400/15 bg-cyber-400/5 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyber-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Reasoning
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{decision.reasoning}</p>
              </div>
            </div>
          </Reveal>

          {/* Decision log */}
          <Reveal delay={240}>
            <div className="glass h-full rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                <Clock className="h-4 w-4 text-violetx-300" /> Decision Log
              </h3>
              <div className="mt-4 space-y-3">
                {[decision, ...history].slice(0, 5).map((d, i) => (
                  <div key={d.timestamp + i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-signal-green">{d.source}</span>
                      <ArrowRight className="h-3 w-3 text-slate-500" />
                      <span className="font-medium text-signal-red">{d.receiver}</span>
                      <span className="ml-auto flex items-center gap-1 text-cyber-300">
                        <Gauge className="h-3 w-3" />{d.transferWatts}W
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-signal-green" />{d.confidence}% conf.
                      </span>
                      <span>~{d.estimatedMinutes} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
