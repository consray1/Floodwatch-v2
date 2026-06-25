'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Incident, Alert } from '@/types';

const IncidentMap = dynamic(
  () => import('@/components/Map/IncidentMap').then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" /> }
);

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { default: api } = await import('@/lib/api');
        const [incidentsRes, alertsRes] = await Promise.all([
          api.get<{ data: Incident[] }>('/incidents'),
          api.get<{ data: Alert[] }>('/alerts'),
        ]);
        setIncidents(incidentsRes.data.data);
        setAlerts(alertsRes.data.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: 'Active Incidents',
      value: incidents.filter((i) => i.status === 'active').length,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      title: 'Total Reports',
      value: incidents.reduce((acc, i) => acc + i.report_count, 0),
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      title: 'Communities at Risk',
      value: incidents.filter((i) => i.severity === 'high' || i.severity === 'critical').length,
      icon: Users,
      color: 'text-orange-500',
    },
    {
      title: 'Active Alerts',
      value: alerts.length,
      icon: Activity,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Real-time flood monitoring overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '-' : stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Map</CardTitle>
        </CardHeader>
        <CardContent>
          <IncidentMap incidents={incidents} />
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent"
                >
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      alert.severity === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : alert.severity === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : alert.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}