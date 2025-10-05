import Link from "next/link";
import { Lightbulb, ShieldCheck, Users, BarChart3, Rocket, Search, PlayCircle, Building2, Star } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { FeatureCard } from "@/components/feature-card";
import { OverviewCard } from "@/components/dashboard/overview-card";

const entrepreneurFeatures = [
  {
    title: "Structured Storytelling",
    description: "Standardized templates to help founders articulate their problem, solution, and traction.",
    icon: <Lightbulb className="h-6 w-6" />,
    items: [
      "Problem, solution, and market opportunity prompts",
      "Upload decks, pitch videos, and due diligence documents",
      "Social links to showcase community engagement",
    ],
  },
  {
    title: "Investor-Ready Financials",
    description: "Collect revenue models, financial projections, and validation metrics in one view.",
    icon: <BarChart3 className="h-6 w-6" />,
    items: [
      "Revenue model canvas",
      "Financial milestones and projections",
      "Traction timeline and validation badges",
    ],
  },
  {
    title: "Role-Based Dashboards",
    description: "Entrepreneurs manage their ideas, investors review opportunities, and admins moderate.",
    icon: <Rocket className="h-6 w-6" />,
    items: [
      "Founder workspaces for each idea",
      "Investor watchlists with alerts",
      "Admin review queues and analytics",
    ],
  },
];

const investorFeatures = [
  {
    title: "Advanced Filtering",
    description: "Discover startups by sector, risk appetite, traction, or geography.",
    icon: <Search className="h-6 w-6" />,
    items: [
      "Ticket size range filters",
      "Traction and ROI scoring",
      "Export and CRM sync",
    ],
  },
  {
    title: "Portfolio Collaboration",
    description: "Save opportunities, manage diligence checklists, and collaborate with partners.",
    icon: <Users className="h-6 w-6" />,
    items: [
      "Shared watchlists with team comments",
      "Commitment tracking",
      "Deal room integrations",
    ],
  },
];

const trustFeatures = [
  {
    title: "KYC + Business Verification",
    description: "Built-in flows to verify identity, CAC documents, and tax IDs for credibility.",
    icon: <ShieldCheck className="h-6 w-6" />,
    items: [
      "Automated verification workflows",
      "Badge system for transparency",
      "Audit trails for compliance",
    ],
  },
  {
    title: "Ratings & Reviews",
    description: "Community-driven trust signals on responsiveness, transparency, and execution.",
    icon: <Star className="h-6 w-6" />,
    items: [
      "Weighted scoring per role",
      "Flag and moderation tools",
      "Public testimonials",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100" id="product">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-brand-600 ring-1 ring-brand-200">
              Verified marketplace for entrepreneurs & investors
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Showcase resilient African ventures with investor-grade data
            </h1>
            <p className="text-lg text-slate-600">
              Nafila Shop provides a compliant launchpad for founders to publish ideas, share traction, and connect with the right investors while keeping the community engaged and informed.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-500"
              >
                Create your profile
              </Link>
              <Link
                href="#showcases"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-50"
              >
                <PlayCircle className="h-5 w-5" />
                Explore showcases
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm text-slate-500 sm:grid-cols-4">
              {[
                { label: "Verified founders", value: "120+" },
                { label: "Active investors", value: "80" },
                { label: "Deals tracked", value: "$4.3M" },
                { label: "Community members", value: "5k" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-medium text-slate-600">{stat.label}</dt>
                  <dd className="text-2xl font-semibold text-slate-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid w-full max-w-lg grid-cols-1 gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl">
            <OverviewCard
              title="Investor conversions"
              value="34%"
              trend="+8% vs last quarter"
              description="Investors proceeding to diligence workflows"
            />
            <OverviewCard
              title="Pitch deck engagement"
              value="2.3k"
              trend="+1.2k downloads"
              description="Unique investor views on uploaded materials"
            />
            <OverviewCard
              title="Community actions"
              value="7,820"
              description="Likes, comments, and follows driving social proof"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8" id="showcases">
        <SectionHeader
          eyebrow="Entrepreneur Workspace"
          title="Standardized idea showcase with investor-ready sections"
          description="Founders can publish one or multiple business ideas with structured templates that guide them from problem statement to financial projections."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {entrepreneurFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8" id="investors">
        <SectionHeader
          eyebrow="Investor Suite"
          title="Search, evaluate, and manage opportunities"
          description="Investors access advanced filtering tools, diligence dashboards, and watchlists to track startups that match their thesis."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {investorFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-2xl font-semibold text-slate-900">Portfolio dashboard</h3>
              <p className="text-sm text-slate-600">
                Track saved opportunities, log interactions, and receive updates on milestone achievements or new funding rounds.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700"
            >
              <Building2 className="h-5 w-5" />
              View investor portal
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white" id="trust">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trust & Verification"
            title="Compliance-ready identity and business checks"
            description="Integrate KYC/KYB flows, upload compliance documents, and award verified badges visible across profiles."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {trustFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8" id="engagement">
        <SectionHeader
          eyebrow="Social Engagement"
          title="Community-led growth"
          description="Members can follow, like, comment, and message to accelerate deal-making and ecosystem trust."
        />
        <div className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-slate-100 p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-900">Content feed & messaging</h3>
              <p className="text-sm text-slate-600">
                Personalized timelines highlight trending ideas, investor insights, and milestone updates. Built-in messaging unlocks quick collaboration between founders and investors.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Users className="mt-1 h-5 w-5 text-brand-500" />
                  <span>Follow profiles to receive push and email alerts about new traction.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 text-brand-500" />
                  <span>Engage through likes and comments with moderation safeguards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-brand-500" />
                  <span>Report suspicious activity directly to admins with audit trails.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow">
              <h4 className="text-lg font-semibold text-slate-900">Live insights</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">Trending idea:</span> Solar-powered cold chain logistics (1.9k saves)
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Investor engagement:</span> 36 new diligence requests this week
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Community sentiment:</span> 4.7/5 credibility rating average
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900" id="admin">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Admin & Moderation"
            title="Operational command center"
            description="Monitor user growth, track verified deals, and action community reports from a centralized dashboard."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Moderation queue"
              description="Triaged alerts from community, verification expiries, and flagged documents."
              items={["Bulk approve or reject submissions", "Escalate to compliance partners", "Audit log export"]}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Platform analytics"
              description="Track KPIs like user growth, deals closed, and engagement velocity."
              items={["Segment by role", "Drill into region or sector", "Export to CSV"]}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Team collaboration"
              description="Assign tasks to team members and integrate with Slack or Teams."
              items={["Role-based permissions", "Activity feeds", "SLA tracking"]}
            />
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-10 text-center text-white">
            <h3 className="text-2xl font-semibold">Ready to launch your marketplace?</h3>
            <p className="mt-3 text-sm text-slate-300">
              Start with the template today and customize onboarding flows, social auth, and analytics to fit your investment thesis.
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
