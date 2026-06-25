'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { Alert } from '@/types';

interface AlertBannerProps {
  alerts: Alert[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const criticalAlerts = alerts.filter(
      (a) => a.severity === 'critical' || a.severity === 'high'
    );
    setVisibleAlerts(criticalAlerts.slice(0, 3));
  }, [alerts]);

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 space-y-2 p-4">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-lg ${
            alert.severity === 'critical'
              ? 'bg-red-600 text-white'
              : 'bg-orange-500 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm opacity-90">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}