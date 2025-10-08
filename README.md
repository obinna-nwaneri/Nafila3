# Nafila Shop Platform

A full-stack Django + HTMX + Tailwind CSS starter template for the Nafila Shop marketplace. The project is built to connect entrepreneurs and investors with role-based dashboards, structured idea submissions, trust signals, and social engagement primitives.

## Features

- **Authentication & Roles** – Custom user model with Entrepreneur, Investor, and General roles, registration & HTMX-enhanced login flows.
- **Profile Management** – Dedicated profile forms for entrepreneurs and investors including bios, documents, verification flags, and investment preferences.
- **Idea Showcase** – Structured idea CRUD with sections for problem, solution, market opportunity, financials, traction, and media links.
- **Investor Workflows** – Searchable idea marketplace, investor watchlists, and dashboards with trending opportunities.
- **Engagement Layer** – Likes, comments, follows, and community reviews rendered via HTMX partials for responsive interactivity.
- **Trust & Verification** – Profile verification badges, document links, and ratings to boost credibility.
- **Admin Dashboards** – Django admin already wired to monitor users, ideas, and social activity.
- **Sample Content** – Fixtures with ready-to-use entrepreneur, investor, and community accounts plus demo ideas and interactions.

## Getting Started

1. **Install dependencies**

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Apply migrations & load sample data**

   ```bash
   python manage.py migrate
   python manage.py loaddata fixtures/sample_data.json
   ```

3. **Run the development server**

   ```bash
   python manage.py runserver
   ```

4. **Visit the app**

   Open [http://localhost:8000](http://localhost:8000) to explore the landing page, dashboards, and idea marketplace.

## Sample Accounts

All sample users share the password `Password123!` and can be used to explore role-based flows:

| Role | Username | Email |
| --- | --- | --- |
| Entrepreneur | `founder` | `founder@nafila.shop` |
| Investor | `investor` | `investor@nafila.shop` |
| Community | `community` | `community@nafila.shop` |

## Environment Variables

The template uses SQLite by default and does not require custom environment variables. Update `nafila_shop/settings.py` for production-ready configurations (secret key, allowed hosts, email backend, etc.).

## Tailwind & HTMX

- Tailwind CSS is included via CDN for zero-config styling.
- HTMX powers partial updates for likes, comments, follows, reviews, and watchlist interactions.

## Next Steps

- Plug in OAuth (e.g., Google) using `django-allauth` for social login.
- Connect to a production database and storage for media uploads.
- Extend messaging, analytics dashboards, and verification workflows.

## License

This template is provided for rapid prototyping and internal evaluation.
