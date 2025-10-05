"use client";

import { useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CalendarClock, Trash2, Save } from "lucide-react";

import {
  deleteIdeaAction,
  updateIdeaAction,
  type EntrepreneurIdea,
  type IdeaActionState,
} from "@/app/actions";

const initialState: IdeaActionState = { ok: false };

export function IdeaCard({ idea, disabled }: { idea: EntrepreneurIdea; disabled?: boolean }) {
  const [updateState, updateAction] = useFormState(updateIdeaAction, initialState);
  const [deleteState, deleteAction] = useFormState(deleteIdeaAction, initialState);
  const mediaLinksText = useMemo(() => {
    if (!Array.isArray(idea.media_links) || idea.media_links.length === 0) {
      return "";
    }

    return idea.media_links
      .map((item) => (item.label ? `${item.label} | ${item.url}` : item.url))
      .join("\n");
  }, [idea.media_links]);

  return (
    <article className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{idea.title}</h3>
          <p className="text-sm text-slate-600">
            {idea.status ? `${idea.status} • ` : ""}
            {idea.sector ?? "General"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarClock className="h-4 w-4" />
          Updated {new Date(idea.updated_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </div>
      </header>

      {updateState.message ? (
        <div
          className={`mt-4 rounded-2xl border p-3 text-xs ${
            updateState.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {updateState.message}
        </div>
      ) : null}

      <form action={updateAction} className="mt-4 space-y-3">
        <input type="hidden" name="ideaId" value={idea.id} />
        <InlineField
          name="title"
          label="Idea title"
          defaultValue={idea.title}
          state={updateState}
          disabled={disabled}
          id={`title-${idea.id}`}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <InlineField
            name="sector"
            label="Sector"
            defaultValue={idea.sector ?? ""}
            state={updateState}
            disabled={disabled}
            id={`sector-${idea.id}`}
          />
          <InlineField
            name="status"
            label="Status"
            defaultValue={idea.status ?? ""}
            state={updateState}
            disabled={disabled}
            id={`status-${idea.id}`}
          />
        </div>
        <InlineTextArea
          name="traction"
          label="Traction & validation"
          defaultValue={idea.traction}
          state={updateState}
          disabled={disabled}
          id={`traction-${idea.id}`}
        />
        <InlineTextArea
          name="problemStatement"
          label="Problem statement"
          defaultValue={idea.problem_statement}
          state={updateState}
          disabled={disabled}
          id={`problem-${idea.id}`}
        />
        <InlineTextArea
          name="solution"
          label="Solution"
          defaultValue={idea.solution}
          state={updateState}
          disabled={disabled}
          id={`solution-${idea.id}`}
        />
        <InlineTextArea
          name="marketOpportunity"
          label="Market opportunity"
          defaultValue={idea.market_opportunity}
          state={updateState}
          disabled={disabled}
          id={`market-${idea.id}`}
        />
        <InlineTextArea
          name="revenueModel"
          label="Business / revenue model"
          defaultValue={idea.revenue_model}
          state={updateState}
          disabled={disabled}
          id={`revenue-${idea.id}`}
        />
        <InlineTextArea
          name="financialProjection"
          label="Financial projections"
          defaultValue={idea.financial_projection}
          state={updateState}
          disabled={disabled}
          id={`financial-${idea.id}`}
        />
        <InlineTextArea
          name="mediaLinks"
          label="Media links"
          description="Label | URL — one per line"
          defaultValue={mediaLinksText}
          state={updateState}
          disabled={disabled}
          id={`media-${idea.id}`}
        />
        <div className="flex items-center justify-end">
          <UpdateButton disabled={disabled} />
        </div>
      </form>

      <form action={deleteAction} className="mt-3 flex items-center justify-end gap-3">
        <input type="hidden" name="ideaId" value={idea.id} />
        <DeleteSubmit disabled={disabled} />
        {deleteState.message ? (
          <span className="text-xs text-rose-600">{deleteState.message}</span>
        ) : null}
      </form>
    </article>
  );
}

function InlineField({
  name,
  label,
  defaultValue,
  state,
  disabled,
  id,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  state: IdeaActionState;
  disabled?: boolean;
  id: string;
}) {
  const error = state.errors?.[name]?.[0];

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        aria-invalid={Boolean(error)}
        disabled={disabled}
      />
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

function InlineTextArea({
  name,
  label,
  defaultValue,
  description,
  state,
  disabled,
  id,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  description?: string;
  state: IdeaActionState;
  disabled?: boolean;
  id: string;
}) {
  const error = state.errors?.[name]?.[0];

  return (
    <div>
      <label
        className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={3}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        aria-invalid={Boolean(error)}
        disabled={disabled}
      />
      {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

function UpdateButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-75"
    >
      <Save className="h-4 w-4" />
      {pending ? "Saving" : "Save changes"}
    </button>
  );
}

function DeleteSubmit({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-75"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "Removing" : "Delete"}
    </button>
  );
}
