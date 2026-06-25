import { ReportForm } from '@/components/ReportForm/ReportForm';

export default function NewReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Report</h1>
        <p className="text-muted-foreground">Report flooding in your area</p>
      </div>
      <ReportForm />
    </div>
  );
}