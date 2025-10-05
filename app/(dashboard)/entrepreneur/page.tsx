import Link from "next/link";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { Lightbulb, UploadCloud, FileText } from "lucide-react";

const ideas = [
  {
    id: 1,
    name: "Circular Fashion Marketplace",
    status: "Raising Seed",
    traction: "60 designers onboarded",
    updatedAt: "2 days ago",
  },
  {
    id: 2,
    name: "Solar Cold Chain Logistics",
    status: "MVP Live",
    traction: "Pilot in 3 cities",
    updatedAt: "5 days ago",
  },
];

export default function EntrepreneurDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Entrepreneur workspace</h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage your startup ideas, upload materials, and share updates with investors.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500"
        >
          <Lightbulb className="h-5 w-5" />
          Submit new idea
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Active ideas" value="3" trend="+1 this month" />
        <OverviewCard title="Investor views" value="1,240" trend="+23%" />
        <OverviewCard title="Deck downloads" value="540" trend="+18%" />
        <OverviewCard title="Followers" value="860" trend="+12%" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Ideas in progress</h2>
            <p className="text-sm text-slate-600">Update traction and share new documents to stay visible in investor feeds.</p>
          </div>
          <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <UploadCloud className="h-4 w-4" />
            Upload pitch material
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{idea.name}</h3>
                  <p className="text-sm text-slate-600">{idea.traction}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p className="font-semibold text-brand-600">{idea.status}</p>
                  <p>Updated {idea.updatedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Compliance checklist</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <FileText className="mt-1 h-4 w-4 text-brand-500" />
            Upload CAC incorporation documents
          </li>
          <li className="flex items-start gap-2">
            <FileText className="mt-1 h-4 w-4 text-brand-500" />
            Provide tax ID and bank verification
          </li>
          <li className="flex items-start gap-2">
            <FileText className="mt-1 h-4 w-4 text-brand-500" />
            Record latest traction metrics for verification badge
          </li>
        </ul>
      </div>
    </div>
  );
}
