import { OverviewCard } from "@/components/dashboard/overview-card";
import { ShieldCheck, BarChart3, AlertTriangle } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Identity verification pending",
    type: "KYC",
    status: "Action required",
    submittedBy: "Amina Yusuf",
  },
  {
    id: 2,
    title: "Inappropriate comment flagged",
    type: "Moderation",
    status: "Under review",
    submittedBy: "Community Bot",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Admin console</h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor platform health, user verifications, and engagement metrics.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500">
          <ShieldCheck className="h-5 w-5" />
          Run verification audit
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Total users" value="5,980" trend="↑ 12% MoM" />
        <OverviewCard title="Verified founders" value="312" trend="↑ 24 this week" />
        <OverviewCard title="Active investors" value="188" trend="↑ 8 new" />
        <OverviewCard title="Reports pending" value="7" trend="↓ 3 since yesterday" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Moderation queue</h2>
            <p className="text-sm text-slate-600">Resolve flagged content and verification issues from the community.</p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <AlertTriangle className="h-4 w-4" />
            View full queue
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{report.title}</p>
                  <p className="text-xs text-slate-600">Submitted by {report.submittedBy}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
                  {report.type} · {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Engagement analytics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <BarChart3 className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">Daily active users breakdown by role and geography.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <BarChart3 className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">Deal funnel conversion analytics from profile view to funding.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <BarChart3 className="h-8 w-8 text-brand-500" />
            <p className="mt-3 text-sm text-slate-600">Engagement actions by content type: likes, comments, and follows.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
