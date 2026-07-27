import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import Simulation from '@/components/Simulation';
import DecisionEngine from '@/components/DecisionEngine';
import EnergyFlow from '@/components/EnergyFlow';
import Analytics from '@/components/Analytics';
import Workflow from '@/components/Workflow';
import Architecture from '@/components/Architecture';
import TechStack from '@/components/TechStack';
import Research from '@/components/Research';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useDeviceSimulation } from '@/hooks/useDeviceSimulation';

function App() {
  const [running, setRunning] = useState(true);
  const { devices, tick } = useDeviceSimulation(running);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-slate-200">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problem />
        <Solution />
        <Features />
        <Simulation
          devices={devices}
          tick={tick}
          running={running}
          onToggle={() => setRunning((r) => !r)}
        />
        <DecisionEngine devices={devices} />
        <EnergyFlow devices={devices} />
        <Analytics />
        <Workflow />
        <Architecture />
        <TechStack />
        <Research />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
