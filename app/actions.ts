"use server";

import { z } from "zod";
import { sql } from "@/lib/db";

const registrationSchema = z.object({
  role: z.enum(["entrepreneur", "investor", "member"]),
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
});

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
