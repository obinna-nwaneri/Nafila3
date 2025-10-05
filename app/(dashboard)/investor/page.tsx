import { OverviewCard } from "@/components/dashboard/overview-card";
import { Building2, BookmarkCheck, Filter, LineChart } from "lucide-react";

const opportunities = [
  {
    id: 1,
    name: "AgriCarbon Analytics",
    sector: "Climate",
    traction: "₦120M revenue run-rate",
    risk: "Moderate",
    location: "Kenya",
  },
  {
    id: 2,
    name: "FinServe SME Lending",
    sector: "Fintech",
    traction: "5k active SMEs",
    risk: "Balanced",
    location: "Nigeria",
  },
];

export default function InvestorDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Investor control center</h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor your portfolio, filter new opportunities, and collaborate with partners.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700">
          <Filter className="h-5 w-5" />
          Advanced filters
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Saved opportunities" value="12" trend="+4 this week" />
        <OverviewCard title="Active diligence" value="5" trend="2 closing soon" />
        <OverviewCard title="Average ROI" value="24%" trend="Target 18-30%" />
        <OverviewCard title="Capital deployed" value="$2.1M" trend="Across 9 ventures" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Watchlist</h2>
            <p className="text-sm text-slate-600">
              Organize startups by thesis, diligence stage, or team ownership.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <BookmarkCheck className="h-4 w-4" />
            Manage collections
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{opportunity.name}</h3>
                  <p className="text-sm text-slate-600">{opportunity.sector} · {opportunity.location}</p>
                </div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
                  {opportunity.risk}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{opportunity.traction}</p>
              <button className="mt-4 text-sm font-semibold text-brand-600">
                View data room
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Portfolio analytics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <LineChart className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">
              Quarterly performance updates and benchmarking across sectors.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <Building2 className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">
              Geographic distribution across West, East, and North Africa.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <BookmarkCheck className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">
              Alerts when startups achieve milestones or require follow-on capital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
