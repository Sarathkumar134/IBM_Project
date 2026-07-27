import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useScrollSpy } from '@/hooks';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'features', label: 'Features' },
  { id: 'simulation', label: 'Live Simulation' },
  { id: 'decision', label: 'AI Engine' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'research', label: 'Research' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

const NAV_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(NAV_IDS, 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-glow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-6">
        <button onClick={() => go('home')} className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-400 to-violetx-500 shadow-glow-sm transition-transform group-hover:scale-110">
            <Zap className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-xl ring-2 ring-cyber-400/40 animate-pulse-ring" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white">
            IntelliPower<span className="text-gradient">.AI</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`relative rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                activeId === link.id
                  ? 'text-cyber-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyber-400 to-violetx-400" />
              )}
            </button>
          ))}
        </div>

        <div className="hidden xl:block">
          <button
            onClick={() => go('simulation')}
            className="btn-glow rounded-lg border border-cyber-400/40 bg-cyber-400/10 px-4 py-2 text-sm font-semibold text-cyber-200"
          >
            Launch Simulation
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong max-h-[80vh] overflow-y-auto border-t border-white/10 px-4 py-3 xl:hidden">
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeId === link.id
                    ? 'bg-cyber-400/10 text-cyber-300'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
