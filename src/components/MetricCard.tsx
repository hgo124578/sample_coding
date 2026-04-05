import type { Metric } from '@/types/metric';

type Props = {
  metric: Metric;
};

export default function MetricCard({ metric }: Props) {
  const isPositive = metric.change.startsWith('+');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-500';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <p className="text-sm text-gray-500">{metric.label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
      <p className={`mt-1 text-sm font-medium ${changeColor}`}>{metric.change}</p>
    </div>
  );
}
