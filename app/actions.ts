"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sql } from "@/lib/db";

const registrationSchema = z.object({
  role: z.enum(["entrepreneur", "investor", "member"]),
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  user?: {
    id: number;
    email: string;
    fullName: string;
    role: "entrepreneur" | "investor" | "member" | "admin";
  };
};

export type IdeaActionState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

type AuthCookie = {
  id: number;
  role: "entrepreneur" | "investor" | "member" | "admin";
  fullName: string;
  email: string;
};

function readAuthCookie(): AuthCookie | null {
  const cookie = cookies().get("nafila_user");
  if (!cookie?.value) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookie.value) as AuthCookie;
    if (!parsed?.id || !parsed?.role) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("Unable to parse nafila_user cookie", error);
    return null;
  }
}

async function resolveEntrepreneurContext() {
  const auth = readAuthCookie();

  if (auth && auth.role === "entrepreneur") {
    return {
      userId: auth.id,
      fullName: auth.fullName,
      email: auth.email,
      isDemo: false,
    } as const;
  }

  const fallback = await sql<{ id: number; full_name: string; email: string }[]>`
    select u.id, u.full_name, u.email
    from users u
    where u.role = 'entrepreneur'
    order by u.id asc
    limit 1
  `;

  if (!fallback[0]) {
    return null;
  }

  return {
    userId: fallback[0].id,
    fullName: fallback[0].full_name,
    email: fallback[0].email,
    isDemo: true,
  } as const;
}

const ideaSchema = z.object({
  title: z.string().min(3, "Provide a title for your idea."),
  sector: z.string().min(2, "Sector is required."),
  status: z.string().min(2, "Status is required."),
  problemStatement: z.string().min(10, "Describe the problem you're solving."),
  solution: z.string().min(10, "Share the proposed solution."),
  marketOpportunity: z.string().min(10, "Explain the market opportunity."),
  revenueModel: z.string().min(5, "Outline the revenue model."),
  financialProjection: z.string().min(5, "Share your financial outlook."),
  traction: z.string().min(5, "Summarize traction or validation."),
  mediaLinks: z.string().optional(),
});

export type EntrepreneurIdea = {
  id: number;
  title: string;
  sector: string | null;
  status: string | null;
  problem_statement: string;
  solution: string;
  market_opportunity: string;
  revenue_model: string;
  financial_projection: string;
  traction: string;
  media_links: { label?: string; url: string }[];
  updated_at: string;
  created_at: string;
};

export async function registerUser(formData: FormData) {
  const payload = {
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  };

  const parsed = registrationSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    } as const;
  }

  const { email, password, role, fullName } = parsed.data;

  await sql`
    insert into users (email, password_hash, role, full_name)
    values (${email}, crypt(${password}, gen_salt('bf')), ${role}, ${fullName})
    on conflict (email) do nothing
  `;

  return { ok: true } as const;
}

export async function authenticateUser(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please fix the highlighted fields and try again.",
    };
  }

  const { email, password } = parsed.data;

  try {
    const rows = await sql<
      { id: number; role: "entrepreneur" | "investor" | "member" | "admin"; full_name: string; email: string }[]
    >`
      select id, role, full_name, email
      from users
      where email = ${email}
        and password_hash = crypt(${password}, password_hash)
      limit 1
    `;

    const user = rows[0];

    if (!user) {
      return {
        ok: false,
        message: "Invalid email or password. Check the demo credentials and try again.",
      };
    }

    cookies().set({
      name: "nafila_user",
      value: JSON.stringify({
        id: user.id,
        role: user.role,
        fullName: user.full_name,
        email: user.email,
      }),
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
    });

    return {
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
      message: `Signed in as ${user.full_name}.`,
    };
  } catch (error) {
    console.error("Failed to authenticate user", error);
    return {
      ok: false,
      message: "We couldn't sign you in. Please try again shortly.",
    };
  }
}

export async function searchEntrepreneurs(query: string) {
  const rows = await sql`
    select id, full_name, headline, sector, traction_score
    from entrepreneur_profiles
    where full_name ilike ${"%" + query + "%"}
    order by traction_score desc
    limit 12
  `;

  return rows;
}

export async function getInvestorHighlights() {
  const rows = await sql`
    select id, company_name, focus_sectors, ticket_size_min, ticket_size_max
    from investor_profiles
    order by updated_at desc
    limit 6
  `;
  return rows;
}

function parseMediaLinks(raw: string | undefined) {
  if (!raw) {
    return [] as { label?: string; url: string }[];
  }

  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((entry) => {
      const [label, url] = entry.split("|").map((value) => value.trim());
      if (url) {
        return { label: label || undefined, url };
      }
      return { url: label };
    });
}

function normalizeMediaLinks(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item?.url === "string").map((item) => ({
      label: typeof item?.label === "string" ? item.label : undefined,
      url: String(item.url),
    }));
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return normalizeMediaLinks(parsed);
    } catch (error) {
      console.error("Unable to parse media links", error);
    }
  }

  return [] as { label?: string; url: string }[];
}

export async function loadEntrepreneurIdeas(search?: string) {
  const context = await resolveEntrepreneurContext();

  if (!context) {
    return {
      user: null,
      ideas: [] as EntrepreneurIdea[],
      isDemo: true,
    } as const;
  }

  const searchTerm = search?.trim();

  if (!searchTerm) {
    const ideas = await sql<EntrepreneurIdea[]>`
      select id, title, sector, status, problem_statement, solution, market_opportunity,
             revenue_model, financial_projection, traction, media_links, created_at, updated_at
      from entrepreneur_ideas
      where user_id = ${context.userId}
      order by updated_at desc
    `;

    return {
      user: { id: context.userId, fullName: context.fullName, email: context.email },
      ideas: ideas.map((idea) => ({
        ...idea,
        media_links: normalizeMediaLinks(idea.media_links),
      })),
      isDemo: context.isDemo,
    } as const;
  }

  const ideas = await sql<EntrepreneurIdea[]>`
    select id, title, sector, status, problem_statement, solution, market_opportunity,
           revenue_model, financial_projection, traction, media_links, created_at, updated_at
    from entrepreneur_ideas
    where user_id = ${context.userId}
      and (
        title ilike ${"%" + searchTerm + "%"} or
        sector ilike ${"%" + searchTerm + "%"} or
        problem_statement ilike ${"%" + searchTerm + "%"} or
        solution ilike ${"%" + searchTerm + "%"}
      )
    order by updated_at desc
  `;

  return {
    user: { id: context.userId, fullName: context.fullName, email: context.email },
    ideas: ideas.map((idea) => ({
      ...idea,
      media_links: normalizeMediaLinks(idea.media_links),
    })),
    isDemo: context.isDemo,
  } as const;
}

export async function createIdeaAction(
  _prev: IdeaActionState,
  formData: FormData
): Promise<IdeaActionState> {
  const context = readAuthCookie();

  if (!context || context.role !== "entrepreneur") {
    return {
      ok: false,
      message: "Sign in as an entrepreneur to add ideas.",
    };
  }

  const payload = {
    title: formData.get("title"),
    sector: formData.get("sector"),
    status: formData.get("status"),
    problemStatement: formData.get("problemStatement"),
    solution: formData.get("solution"),
    marketOpportunity: formData.get("marketOpportunity"),
    revenueModel: formData.get("revenueModel"),
    financialProjection: formData.get("financialProjection"),
    traction: formData.get("traction"),
    mediaLinks: formData.get("mediaLinks") ?? undefined,
  };

  const parsed = ideaSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please review the highlighted fields.",
    };
  }

  const mediaLinks = parseMediaLinks(parsed.data.mediaLinks);

  await sql`
    insert into entrepreneur_ideas (
      user_id, title, sector, status, problem_statement, solution, market_opportunity,
      revenue_model, financial_projection, traction, media_links
    )
    values (
      ${context.id},
      ${parsed.data.title},
      ${parsed.data.sector},
      ${parsed.data.status},
      ${parsed.data.problemStatement},
      ${parsed.data.solution},
      ${parsed.data.marketOpportunity},
      ${parsed.data.revenueModel},
      ${parsed.data.financialProjection},
      ${parsed.data.traction},
      ${JSON.stringify(mediaLinks)}::jsonb
    )
  `;

  revalidatePath("/entrepreneur");

  return {
    ok: true,
    message: "Idea saved successfully.",
  };
}

export async function updateIdeaAction(
  _prev: IdeaActionState,
  formData: FormData
): Promise<IdeaActionState> {
  const context = readAuthCookie();

  if (!context || context.role !== "entrepreneur") {
    return {
      ok: false,
      message: "Sign in as an entrepreneur to update ideas.",
    };
  }

  const ideaId = Number(formData.get("ideaId"));

  if (!ideaId) {
    return {
      ok: false,
      message: "Unable to determine which idea to update.",
    };
  }

  const payload = {
    title: formData.get("title"),
    sector: formData.get("sector"),
    status: formData.get("status"),
    problemStatement: formData.get("problemStatement"),
    solution: formData.get("solution"),
    marketOpportunity: formData.get("marketOpportunity"),
    revenueModel: formData.get("revenueModel"),
    financialProjection: formData.get("financialProjection"),
    traction: formData.get("traction"),
    mediaLinks: formData.get("mediaLinks") ?? undefined,
  };

  const parsed = ideaSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please review the highlighted fields.",
    };
  }

  const mediaLinks = parseMediaLinks(parsed.data.mediaLinks);

  const updated = await sql`
    update entrepreneur_ideas
    set title = ${parsed.data.title},
        sector = ${parsed.data.sector},
        status = ${parsed.data.status},
        problem_statement = ${parsed.data.problemStatement},
        solution = ${parsed.data.solution},
        market_opportunity = ${parsed.data.marketOpportunity},
        revenue_model = ${parsed.data.revenueModel},
        financial_projection = ${parsed.data.financialProjection},
        traction = ${parsed.data.traction},
        media_links = ${JSON.stringify(mediaLinks)}::jsonb,
        updated_at = now()
    where id = ${ideaId}
      and user_id = ${context.id}
    returning id
  `;

  if (!updated[0]) {
    return {
      ok: false,
      message: "We couldn't update this idea. It may have been removed.",
    };
  }

  revalidatePath("/entrepreneur");

  return {
    ok: true,
    message: "Idea updated successfully.",
  };
}

export async function deleteIdeaAction(formData: FormData): Promise<IdeaActionState> {
  const context = readAuthCookie();

  if (!context || context.role !== "entrepreneur") {
    return {
      ok: false,
      message: "Sign in as an entrepreneur to manage ideas.",
    };
  }

  const ideaId = Number(formData.get("ideaId"));

  if (!ideaId) {
    return {
      ok: false,
      message: "Idea not found.",
    };
  }

  await sql`
    delete from entrepreneur_ideas
    where id = ${ideaId}
      and user_id = ${context.id}
  `;

  revalidatePath("/entrepreneur");

  return {
    ok: true,
    message: "Idea removed.",
  };
}
