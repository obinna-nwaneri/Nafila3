import Link from "next/link";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-brand-50 via-white to-slate-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl">
        <Logo className="mx-auto" />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access your dashboards and manage opportunities.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
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
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500"
          >
            Continue
          </button>
        </form>
        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-4 text-sm text-slate-700">
          <p className="font-semibold text-brand-700">Demo accounts</p>
          <p className="mt-1 text-xs text-slate-500">
            Seed the database (`npm run seed`) to enable these sample users. All passwords are
            <span className="font-medium text-slate-700"> password123</span>.
          </p>
          <ul className="mt-3 space-y-1 text-xs">
            <li>
              <span className="font-semibold text-slate-700">Entrepreneur:</span> amina@nafila.shop
            </li>
            <li>
              <span className="font-semibold text-slate-700">Investor:</span> david@investnafila.com
            </li>
            <li>
              <span className="font-semibold text-slate-700">Member:</span> lola@nafila.shop
            </li>
            <li>
              <span className="font-semibold text-slate-700">Admin:</span> admin@nafila.shop
            </li>
          </ul>
        </div>
        <div className="text-center text-xs text-slate-500">
          By continuing, you agree to our <Link href="#" className="underline">
            Terms
          </Link>{" "}
          and <Link href="#" className="underline">
            Privacy Policy
          </Link>.
        </div>
        <div className="text-center text-sm text-slate-600">
          New to Nafila Shop?{" "}
          <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-500">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
