import { useState } from 'react';
import { useInterval } from '@/hooks';
import type { DeviceData } from '@/types';

const INITIAL: DeviceData[] = [
  { id: 'phone', name: 'Smartphone', icon: 'phone', battery: 12, status: 'discharging', priority: 'critical', health: 92, consumption: 3.2, x: 0, y: 0 },
  { id: 'laptop', name: 'Laptop', icon: 'laptop', battery: 95, status: 'idle', priority: 'low', health: 88, consumption: 8.5, x: 0, y: 0 },
  { id: 'watch', name: 'Smartwatch', icon: 'watch', battery: 65, status: 'discharging', priority: 'medium', health: 95, consumption: 1.1, x: 0, y: 0 },
  { id: 'earbuds', name: 'Earbuds', icon: 'earbuds', battery: 20, status: 'discharging', priority: 'high', health: 90, consumption: 0.8, x: 0, y: 0 },
  { id: 'tablet', name: 'Tablet', icon: 'tablet', battery: 80, status: 'idle', priority: 'medium', health: 87, consumption: 4.2, x: 0, y: 0 },
  { id: 'iot', name: 'IoT Sensor', icon: 'iot', battery: 55, status: 'discharging', priority: 'low', health: 97, consumption: 0.3, x: 0, y: 0 },
];

export function useDeviceSimulation(running: boolean, intervalMs = 2200) {
  const [devices, setDevices] = useState<DeviceData[]>(INITIAL);
  const [tick, setTick] = useState(0);

  useInterval(() => {
    if (!running) return;
    setDevices((prev) => {
      const sorted = [...prev].sort((a, b) => b.battery - a.battery);
      const donor = sorted.find((d) => d.battery > 60 && d.status !== 'charging');
      const receiver = [...prev].sort((a, b) => a.battery - b.battery).find((d) => d.battery < 40 && d.id !== donor?.id);

      return prev.map((d) => {
        let battery = d.battery;
        let status: DeviceData['status'] = d.status;
        const consumption = Math.max(0.1, d.consumption + (Math.random() - 0.5) * 0.6);

        if (donor && receiver) {
          if (d.id === donor.id) {
            battery = Math.max(5, battery - 0.8);
            status = 'discharging';
          } else if (d.id === receiver.id) {
            battery = Math.min(100, battery + 1.6);
            status = 'charging';
          } else {
            battery = Math.max(0, battery - consumption * 0.25);
            status = battery < 5 ? 'idle' : 'discharging';
          }
        } else {
          battery = Math.max(0, battery - consumption * 0.25);
          status = battery < 5 ? 'idle' : 'discharging';
        }

        let priority = d.priority;
        if (battery < 15) priority = 'critical';
        else if (battery < 30) priority = 'high';
        else if (battery < 60) priority = 'medium';
        else priority = 'low';

        return { ...d, battery: Math.round(battery * 10) / 10, status, consumption: Math.round(consumption * 10) / 10, priority };
      });
    });
    setTick((t) => t + 1);
  }, running ? intervalMs : null);

  return { devices, tick };
}
