import { registerUser } from "@/app/actions";
import { Logo } from "@/components/logo";

const roles = [
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "investor", label: "Investor" },
  { value: "member", label: "Community Member" },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-brand-50 via-white to-slate-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="text-3xl font-semibold text-slate-900">Launch your profile</h1>
          <p className="text-sm text-slate-600">
            Register as an entrepreneur, investor, or community member to access role-based dashboards and collaborate on the Nafila ecosystem.
          </p>
        </div>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2" action={registerUser}>
          <div className="md:col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <p className="mt-1 text-xs text-slate-500">Minimum 8 characters.</p>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              defaultValue={roles[0].value}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-slate-500">
          Social authentication via Google can be configured by wiring NextAuth providers in <code>app/api/auth/[...nextauth]/route.ts</code>.
        </p>
      </div>
    </div>
  );
}
