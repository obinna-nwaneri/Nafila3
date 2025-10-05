import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse as parseEnv } from "dotenv";

function resolveConnectionString(): string | undefined {
  const direct = process.env.DATABASE_URL?.trim();
  if (direct) return direct;

  const examplePath = resolve(process.cwd(), ".env.example");
  if (!existsSync(examplePath)) {
    return undefined;
  }

  const exampleContents = readFileSync(examplePath, "utf8");
  const parsed = parseEnv(exampleContents);
  return parsed.DATABASE_URL?.trim();
}

const connectionString = resolveConnectionString();

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is required. Create a .env (or .env.local) file or ensure .env.example includes the Neon connection string."
  );
}

const sql = neon(connectionString);

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
    create table if not exists entrepreneur_ideas (
      id serial primary key,
      user_id integer references users(id) on delete cascade,
      title text not null,
      sector text,
      status text,
      problem_statement text not null,
      solution text not null,
      market_opportunity text not null,
      revenue_model text not null,
      financial_projection text not null,
      traction text not null,
      media_links jsonb default '[]'::jsonb,
      created_at timestamptz default now(),
      updated_at timestamptz default now(),
      unique (user_id, title)
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

    await sql`
      insert into entrepreneur_ideas (
        user_id, title, sector, status, problem_statement, solution, market_opportunity,
        revenue_model, financial_projection, traction, media_links
      )
      values
        (
          ${entrepreneurUser[0].id},
          'Circular Fashion Marketplace',
          'Sustainable Fashion',
          'Raising Seed',
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
        ),
        (
          ${entrepreneurUser[0].id},
          'Solar Cold Chain Logistics',
          'Climate & Agriculture',
          'MVP live',
          'Agricultural SMEs lose 40% of produce due to unreliable cold storage across African trade routes.',
          'Deploy solar-powered modular cold rooms with IoT monitoring and pay-as-you-store billing.',
          'West African horticulture exports to reach $6B by 2028 with increasing demand for cold storage infrastructure.',
          'Hybrid leasing model with carbon credit monetisation and embedded insurance.',
          'Projected to hit $1.2M ARR within 24 months at 65% utilisation.',
          'Pilot network running across 3 cities with 18 agribusinesses under contract.',
          ${JSON.stringify([
            { label: "Product Demo", url: "https://example.com/demo" },
          ])}::jsonb
        )
      on conflict (user_id, title) do update
      set
        sector = excluded.sector,
        status = excluded.status,
        problem_statement = excluded.problem_statement,
        solution = excluded.solution,
        market_opportunity = excluded.market_opportunity,
        revenue_model = excluded.revenue_model,
        financial_projection = excluded.financial_projection,
        traction = excluded.traction,
        media_links = excluded.media_links,
        updated_at = now();
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
