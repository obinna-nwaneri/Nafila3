import Link from "next/link";
import { type Metadata } from "next";
import {
  Lightbulb,
  UploadCloud,
  FileText,
  Search,
  Rocket,
  BarChart3,
} from "lucide-react";

import {
  loadEntrepreneurIdeas,
  type EntrepreneurIdea,
} from "@/app/actions";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { CreateIdeaForm } from "@/components/dashboard/create-idea-form";
import { IdeaCard } from "@/components/dashboard/idea-card";

export const metadata: Metadata = {
  title: "Entrepreneur dashboard",
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function EntrepreneurDashboard({ searchParams }: PageProps) {
  const searchTerm = typeof searchParams?.q === "string" ? searchParams.q : "";
  const showWelcome = searchParams?.welcome === "1";

  const { user, ideas, isDemo } = await loadEntrepreneurIdeas(searchTerm);

  const ideaCount = ideas.length;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-100/80">
              Entrepreneur workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Welcome back{user ? `, ${user.fullName.split(" ")[0]}` : ""}!
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-100/90">
              Stay investor-ready by polishing your pitch, updating traction, and publishing new media assets that
              showcase your growth.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <Rocket className="h-4 w-4" /> Growth snapshot
            </div>
            <div className="flex items-baseline gap-2 text-3xl font-semibold">
              {ideaCount}
              <span className="text-base font-medium text-brand-100/80">ideas</span>
            </div>
            <p className="text-xs text-brand-100/80">
              Draft, update, and share your opportunities to stay visible in investor feeds.
            </p>
            <Link
              href="#create-idea"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50"
            >
              <Lightbulb className="h-4 w-4" /> Create new idea
            </Link>
          </div>
        </div>
        {showWelcome ? (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-white/10 p-4 text-xs text-brand-50 shadow-inner sm:flex-row sm:items-center sm:justify-between">
            <p>
              You&apos;re now signed in to the entrepreneur dashboard. Start by updating your traction metrics or
              sharing fresh media.
            </p>
            <Link
              href="/entrepreneur"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50"
            >
              Dismiss welcome banner
            </Link>
          </div>
        ) : null}
      </section>

      {isDemo ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold">Viewing demo data</p>
          <p className="mt-1 text-amber-700">
            Sign in with the entrepreneur credentials from the README to add, update, or delete your own startup
            ideas. Current entries mirror the seeded sample account.
          </p>
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Active ideas" value={String(ideaCount)} trend="+1 this month" icon={Lightbulb} />
        <OverviewCard title="Investor views" value="1,240" trend="+23%" icon={BarChart3} />
        <OverviewCard title="Deck downloads" value="540" trend="+18%" icon={UploadCloud} />
        <OverviewCard title="Followers" value="860" trend="+12%" icon={Rocket} />
      </section>

      <section id="create-idea" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Publish a new idea</h2>
            <p className="text-sm text-slate-600">
              Use the standardized template to ensure investors can quickly understand your business model and
              traction.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <CreateIdeaForm disabled={isDemo} />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {searchTerm ? `Search results for “${searchTerm}”` : "Ideas in progress"}
            </h2>
            <p className="text-sm text-slate-600">
              Update traction and share new documents to stay visible in investor feeds.
            </p>
          </div>
          <form className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row" action="/entrepreneur">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="search"
                name="q"
                defaultValue={searchTerm}
                placeholder="Search ideas, sectors, or traction"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500"
              >
                Search
              </button>
              {searchTerm ? (
                <Link
                  href="/entrepreneur"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                >
                  Clear
                </Link>
              ) : null}
            </div>
          </form>
        </div>

        <div className="mt-6 space-y-4">
          {ideas.length ? (
            ideas.map((idea: EntrepreneurIdea) => (
              <IdeaCard key={idea.id} idea={idea} disabled={isDemo} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center text-sm text-slate-600">
              No ideas found. {searchTerm ? "Try a different search query." : "Publish a new opportunity to get started."}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Compliance checklist</h2>
        <p className="mt-1 text-sm text-slate-600">
          Keep your profile verified with up-to-date documentation.
        </p>
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
      </section>
    </div>
  );
}
