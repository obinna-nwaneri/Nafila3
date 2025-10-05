import type { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string;
  trend?: string;
  description?: string;
  icon?: LucideIcon;
}

export function OverviewCard({ title, value, trend, description, icon: Icon }: OverviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {trend && <p className="mt-1 text-sm font-medium text-brand-600">{trend}</p>}
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
    </div>
  );
}
