interface OverviewCardProps {
  title: string;
  value: string;
  trend?: string;
  description?: string;
}

export function OverviewCard({ title, value, trend, description }: OverviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {trend && <p className="mt-1 text-sm font-medium text-brand-600">{trend}</p>}
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
    </div>
  );
}
