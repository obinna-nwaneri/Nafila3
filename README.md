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

## Deploying to the VPS (74.50.81.201)

Follow these steps to push the project to your VPS and run it in a production-ready virtual environment:

1. **Copy the source to the server**

   From your local machine run:

   ```bash
   scp -r . obinnanwaneri@74.50.81.201:~/nafila-shop
   ```

   > Replace the username with the SSH user configured on the VPS if it differs.

2. **SSH into the VPS and install dependencies**

   ```bash
   ssh obinnanwaneri@74.50.81.201
   sudo apt update && sudo apt install -y python3-venv python3-pip
   cd ~/nafila-shop
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure Django for production**

   - Set `DEBUG = False` and update `ALLOWED_HOSTS` in `nafila_shop/settings.py` to include `74.50.81.201` (and any domain).
   - Create an `.env` or export environment variables for secret keys, email, and database credentials if required.

4. **Migrate, load data, and collect static files**

   ```bash
   python manage.py migrate
   python manage.py loaddata fixtures/sample_data.json  # optional demo data
   python manage.py collectstatic --noinput
   ```

5. **Run the application**

   For quick verification you can use Django’s dev server (behind a firewall):

   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

   For production, configure a process manager such as `gunicorn` with `systemd` and proxy it through Nginx or Caddy.

## License

This template is provided for rapid prototyping and internal evaluation.
