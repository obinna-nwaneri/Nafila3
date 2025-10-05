import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  items?: string[];
}

export function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
      {items && (
        <ul className="mt-2 space-y-1 text-sm text-slate-500">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
