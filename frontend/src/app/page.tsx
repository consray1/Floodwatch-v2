import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            FloodWatch AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Community-powered flood intelligence. Turning early warnings into
            verified, real-time action.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/reports/new"
            className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
          >
            Submit Report
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            title="Report Flooding"
            description="Submit reports via web, SMS, WhatsApp, or voice. Help communities stay safe."
          />
          <FeatureCard
            title="Live Incidents"
            description="See real-time incidents on an interactive map with severity indicators."
          />
          <FeatureCard
            title="AI Analysis"
            description="Automated classification, duplicate detection, and risk scoring."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}