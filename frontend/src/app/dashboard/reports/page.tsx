'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Report } from '@/types';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { default: api } = await import('@/lib/api');
        const res = await api.get<{ data: Report[] }>('/reports');
        setReports(res.data.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'sms':
        return '📱';
      case 'whatsapp':
        return '💬';
      case 'voice':
        return '🎤';
      default:
        return '🌐';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Community submitted flood reports</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="py-4">
                <div className="h-4 bg-gray-200 rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No reports submitted yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm">{report.raw_text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(report.created_at).toLocaleString()}
                      {report.location && ` • ${report.location.address || `${report.location.latitude}, ${report.location.longitude}`}`}
                    </p>
                  </div>
                  <span className="text-2xl ml-4">{getSourceIcon(report.source)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}