'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reportSchema = z.object({
  raw_text: z.string().min(10, 'Please provide more details about the flood'),
  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

type ReportForm = z.infer<typeof reportSchema>;

export function ReportForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportForm) => {
    try {
      setSubmitting(true);
      setError(null);

      const payload: Record<string, unknown> = {
        raw_text: data.raw_text,
        source: 'web',
      };

      if (data.latitude && data.longitude) {
        payload.location = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          address: data.address,
        };
      }

      const { default: api } = await import('@/lib/api');
      await api.post('/reports', payload);
      router.push('/dashboard/reports');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit report';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Flood Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="raw_text">What happened?</Label>
            <textarea
              id="raw_text"
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe the flooding situation, including location details..."
              {...register('raw_text')}
            />
            {errors.raw_text && (
              <p className="text-sm text-destructive">{errors.raw_text.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Location / Address (optional)</Label>
            <Input
              id="address"
              placeholder="e.g., Kasarani, Nairobi"
              {...register('address')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude (optional)</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="e.g., -1.2921"
                {...register('latitude')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude (optional)</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="e.g., 36.8219"
                {...register('longitude')}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Report'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}