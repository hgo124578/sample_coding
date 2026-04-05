import fs from 'fs';
import path from 'path';
import type { Metric } from '@/types/metric';
import MetricCard from '@/components/MetricCard';

export default function DashboardPage() {
  const filePath = path.join(process.cwd(), 'data', 'metrics.json');
  const metrics: Metric[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">ダッシュボード</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </main>
  );
}
