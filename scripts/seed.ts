import "dotenv/config";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql`create extension if not exists pgcrypto;`;

  await sql`
    create table if not exists users (
      id serial primary key,
      email text unique not null,
      password_hash text not null,
      role text not null check (role in ('entrepreneur', 'investor', 'member', 'admin')),
      full_name text not null,
      created_at timestamptz default now()
    );
  `;

  await sql`
    create table if not exists entrepreneur_profiles (
      id serial primary key,
      user_id integer unique references users(id) on delete cascade,
      full_name text not null,
      headline text,
      sector text,
      traction_score numeric default 0,
      problem_statement text,
      solution text,
      market_opportunity text,
      revenue_model text,
      financial_projection text,
      traction text,
      media_links jsonb default '[]'::jsonb,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    );
  `;

  await sql`
    create table if not exists investor_profiles (
      id serial primary key,
      user_id integer unique references users(id) on delete cascade,
      company_name text,
      focus_sectors text[],
      ticket_size_min numeric,
      ticket_size_max numeric,
      geography text,
      risk_appetite text,
      watchlist jsonb default '[]'::jsonb,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    );
  `;

  await sql`
    create table if not exists engagement_events (
      id serial primary key,
      actor_id integer references users(id) on delete cascade,
      target_id integer references users(id) on delete cascade,
      event_type text not null,
      payload jsonb,
      created_at timestamptz default now()
    );
  `;

  const sampleUsers = [
    {
      email: "amina@nafila.shop",
      password: "password123",
      role: "entrepreneur",
      full_name: "Amina Yusuf",
    },
    {
      email: "david@investnafila.com",
      password: "password123",
      role: "investor",
      full_name: "David Chen",
    },
    {
      email: "lola@nafila.shop",
      password: "password123",
      role: "member",
      full_name: "Lola Johnson",
    },
    {
      email: "admin@nafila.shop",
      password: "password123",
      role: "admin",
      full_name: "Platform Admin",
    },
  ] as const;

  for (const user of sampleUsers) {
    await sql`
      insert into users (email, password_hash, role, full_name)
      values (${user.email}, crypt(${user.password}, gen_salt('bf')), ${user.role}, ${user.full_name})
      on conflict (email) do nothing;
    `;
  }

  const entrepreneurUser = await sql<{ id: number; full_name: string }[]>`
    select id, full_name from users where role = 'entrepreneur';
  `;
  const investorUser = await sql<{ id: number; full_name: string }[]>`
    select id, full_name from users where role = 'investor';
  `;

  if (entrepreneurUser[0]) {
    await sql`
      insert into entrepreneur_profiles (
        user_id, full_name, headline, sector, traction_score, problem_statement,
        solution, market_opportunity, revenue_model, financial_projection, traction, media_links
      )
      values (
        ${entrepreneurUser[0].id},
        ${entrepreneurUser[0].full_name},
        'Circular fashion marketplace',
        'Sustainable Fashion',
        82,
        'African fashion entrepreneurs struggle to access global markets and sustainable fabrics.',
        'A marketplace that aggregates circular fabrics with financing and distribution support.',
        'Global sustainable fashion spending will reach $15B by 2027 with 19% CAGR.',
        'Commission-based marketplace with embedded logistics and financing fees.',
        'Revenue targets of $500K ARR in 18 months driven by 2k active designers.',
        '60 designers onboarded, pilot completed in Lagos with 30% repeat orders.',
        ${JSON.stringify([
          { label: "Pitch Deck", url: "https://example.com/pitchdeck.pdf" },
          { label: "Demo Day Video", url: "https://youtube.com/" },
        ])}::jsonb
      )
      on conflict (user_id) do nothing;
    `;
  }

  if (investorUser[0]) {
    await sql`
      insert into investor_profiles (
        user_id, company_name, focus_sectors, ticket_size_min, ticket_size_max, geography, risk_appetite, watchlist
      )
      values (
        ${investorUser[0].id},
        'North Star Capital',
        ARRAY['Climate', 'Commerce', 'AI'],
        50000,
        500000,
        'Pan-African',
        'Moderate',
        ${JSON.stringify([
          { id: 1, name: "Amina Yusuf", sector: "Sustainable Fashion" },
        ])}::jsonb
      )
      on conflict (user_id) do nothing;
    `;
  }

  console.log("Seed data synced successfully");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
