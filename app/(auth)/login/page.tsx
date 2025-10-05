"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticateUser, type LoginFormState } from "@/app/actions";
import { Logo } from "@/components/logo";

const initialState: LoginFormState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-75"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Continue"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(authenticateUser, initialState);

  const dashboardRoutes: Record<"entrepreneur" | "investor" | "admin" | "member", string> = {
    entrepreneur: "/entrepreneur",
    investor: "/investor",
    admin: "/admin",
    member: "/",
  };

  const roleLabels: Record<"entrepreneur" | "investor" | "admin" | "member", string> = {
    entrepreneur: "Entrepreneur",
    investor: "Investor",
    admin: "Admin",
    member: "Member",
  };

  const dashboardHref = state.ok && state.user ? dashboardRoutes[state.user.role] : null;

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

        {state.message && (
          <div
            className={`rounded-2xl border p-4 text-sm ${
              state.ok
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {state.message}
            {state.ok && state.user && dashboardHref && (
              <>
                {" "}
                <span className="block pt-2 text-xs text-emerald-600">
                  Continue to the {roleLabels[state.user.role]} dashboard below.
                </span>
              </>
            )}
          </div>
        )}

        <form className="space-y-4" action={formAction}>
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
              aria-invalid={Boolean(state.errors?.email?.length)}
              aria-describedby={state.errors?.email?.length ? "email-error" : undefined}
            />
            {state.errors?.email?.length ? (
              <p id="email-error" className="mt-1 text-xs text-rose-600">
                {state.errors.email[0]}
              </p>
            ) : null}
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
              aria-invalid={Boolean(state.errors?.password?.length)}
              aria-describedby={state.errors?.password?.length ? "password-error" : undefined}
            />
            {state.errors?.password?.length ? (
              <p id="password-error" className="mt-1 text-xs text-rose-600">
                {state.errors.password[0]}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">Use the seeded password: password123</p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state.ok && dashboardHref && (
          <Link
            href={dashboardHref}
            className="block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
          >
            Go to {state.user ? roleLabels[state.user.role] : "your"} dashboard
          </Link>
        )}

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
