"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { createIdeaAction, type IdeaActionState } from "@/app/actions";

const initialState: IdeaActionState = { ok: false };

export function CreateIdeaForm({ disabled }: { disabled?: boolean }) {
  const [state, formAction] = useFormState(createIdeaAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state.message ? (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {state.message}
          {disabled ? (
            <span className="block pt-2 text-xs text-rose-600">
              Sign in with the entrepreneur demo credentials to manage ideas.
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          name="title"
          label="Idea title"
          placeholder="Circular fashion marketplace"
          state={state}
          disabled={disabled}
        />
        <Field
          name="sector"
          label="Sector"
          placeholder="Sustainable fashion"
          state={state}
          disabled={disabled}
        />
        <Field
          name="status"
          label="Stage / status"
          placeholder="Raising Seed"
          state={state}
          disabled={disabled}
        />
        <Field
          name="traction"
          label="Traction & validation"
          placeholder="60 designers onboarded, pilot completed"
          state={state}
          disabled={disabled}
        />
      </div>

      <TextArea
        name="problemStatement"
        label="Problem statement"
        placeholder="Describe the market gap you are solving"
        state={state}
        disabled={disabled}
      />
      <TextArea
        name="solution"
        label="Solution"
        placeholder="Explain how your product uniquely solves the problem"
        state={state}
        disabled={disabled}
      />
      <TextArea
        name="marketOpportunity"
        label="Market opportunity"
        placeholder="Share market size, target segments, and competitive insights"
        state={state}
        disabled={disabled}
      />
      <TextArea
        name="revenueModel"
        label="Business / revenue model"
        placeholder="Detail pricing, revenue streams, and customer acquisition"
        state={state}
        disabled={disabled}
      />
      <TextArea
        name="financialProjection"
        label="Financial projections"
        placeholder="Project revenue, margins, or runway assumptions"
        state={state}
        disabled={disabled}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="mediaLinks">
          Media links (optional)
        </label>
        <textarea
          id="mediaLinks"
          name="mediaLinks"
          rows={3}
          placeholder="Pitch deck | https://example.com/pitch.pdf\nDemo day video | https://youtube.com/..."
          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={disabled}
        />
        <p className="mt-1 text-xs text-slate-500">
          Add one item per line. Use “Label | URL” to keep things tidy.
        </p>
      </div>

      <SubmitButton disabled={disabled} />
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  state,
  disabled,
}: {
  name: string;
  label: string;
  placeholder?: string;
  state: IdeaActionState;
  disabled?: boolean;
}) {
  const error = state.errors?.[name]?.[0];

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        aria-invalid={Boolean(error)}
        disabled={disabled}
      />
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

function TextArea({
  name,
  label,
  placeholder,
  state,
  disabled,
}: {
  name: string;
  label: string;
  placeholder?: string;
  state: IdeaActionState;
  disabled?: boolean;
}) {
  const error = state.errors?.[name]?.[0];

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        aria-invalid={Boolean(error)}
        disabled={disabled}
      />
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-75"
    >
      {pending ? "Saving idea..." : "Save idea"}
    </button>
  );
}
