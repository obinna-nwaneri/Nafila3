"use server";

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
