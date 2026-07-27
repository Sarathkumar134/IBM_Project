import { Zap, Github, Linkedin, Mail, FileText, Heart } from 'lucide-react';

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'solution', label: 'Solution' },
  { id: 'simulation', label: 'Live Simulation' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

const RESOURCE_LINKS = [
  { icon: FileText, label: 'Research Paper', href: 'https://arxiv.org/abs/1809.09364' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:research@intellipower.ai' },
];

export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-400 to-violetx-500">
                <Zap className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-base font-bold text-white">
                IntelliPower<span className="text-gradient">.AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              An intelligent wireless power-sharing ecosystem where portable devices exchange
              energy based on battery level, priority, and AI prediction.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {RESOURCE_LINKS.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-300 transition-all hover:border-cyber-400/40 hover:bg-cyber-400/10 hover:text-cyber-200"
                  >
                    <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    {l.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className="text-sm text-slate-400 transition-colors hover:text-cyber-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project meta */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Project</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>Intelligent Dynamic Wireless Power Sharing System</li>
              <li>For Portable Electronic Devices</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-400/20 bg-cyber-400/5 px-3 py-1 text-[11px] text-cyber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-blink" />
                  Research Project · Active
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} IntelliPower.AI — Intelligent Dynamic Wireless Power Sharing System
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Built with <Heart className="h-3 w-3 text-signal-red" /> for a wirelessly charged future
          </p>
        </div>
      </div>
    </footer>
  );
}
