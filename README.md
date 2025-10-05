# Nafila Shop Platform

A Next.js 14 starter template for Nafila Shop – a marketplace that connects entrepreneurs and investors with verified data, social engagement, and moderation tooling.

## Getting Started

```bash
cp .env.example .env.local  # or `.env`
npm install
npm run seed
npm run dev
```

The development server will be available at `http://localhost:3000`.

## Environment Variables

Duplicate `.env.example` into `.env.local` (Next.js default) or `.env`. The example file already contains the Neon connection string supplied by the client, so copying it is enough to get started:

```
DATABASE_URL="postgresql://neondb_owner:npg_ZMgvT4APVa9C@ep-icy-fire-adel044n-pooler.c-2.us-east-1.aws.neon.tech/nafila2?sslmode=require&channel_binding=require"
```

## Database & Sample Data

The project includes a lightweight schema and seeding script that can be executed against the Neon database. It creates base tables for users, entrepreneur profiles, investor profiles, and engagement events plus a few sample records (with example passwords hashed using `pgcrypto`).

### Demo Accounts

After running the seed script you can sign in with any of these preconfigured users. All accounts currently share the password `password123` for quick testing:

| Role | Name | Email | Password |
| --- | --- | --- | --- |
| Entrepreneur | Amina Yusuf | `amina@nafila.shop` | `password123` |
| Investor | David Chen | `david@investnafila.com` | `password123` |
| Member | Lola Johnson | `lola@nafila.shop` | `password123` |
| Admin | Platform Admin | `admin@nafila.shop` | `password123` |

```bash
npm run seed
```

> Ensure your database has the `pgcrypto` extension available (the seed script enables it if missing).

## Features

- ✅ **Tailwind CSS** styling with reusable section and feature components.
- ✅ **Server Actions** with validation to register users directly against Neon.
- ✅ **Role-specific dashboards** for entrepreneurs, investors, and admins.
- ✅ **Landing page** describing idea templates, investor tooling, trust & verification, and engagement features.
- ✅ **Seed script** that bootstraps demo data (users, entrepreneur profiles, investor profiles).

## Extending the Template

- Add real authentication flows by enabling [`next-auth`](https://next-auth.js.org/) providers under `app/api/auth/[...nextauth]/route.ts`.
- Connect UI components to live data using server actions or React Query.
- Integrate file storage (e.g., UploadThing, AWS S3) for richer media handling.
- Wire up notifications and messaging via third-party providers (Pusher, Ably, Supabase Realtime).

## Project Structure

```
app/
  (auth)/
    login/
    register/
  (dashboard)/
    admin/
    entrepreneur/
    investor/
  actions.ts
  layout.tsx
  page.tsx
components/
  dashboard/
  feature-card.tsx
  footer.tsx
  logo.tsx
  navbar.tsx
  section-header.tsx
lib/
  db.ts
scripts/
  seed.ts
```

This structure keeps landing, auth, and dashboard routes organized while sharing UI primitives across the application.
