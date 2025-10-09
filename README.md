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

## Deploying to an Ubuntu Production VPS (74.50.81.201)

The steps below assume you have SSH access to an Ubuntu VPS at `74.50.81.201` and want to run Nafila Shop in production. Adapt usernames, domains, and paths to match your environment.

### 1. Prepare your local project for upload

- Commit or stash local changes so the codebase is in a clean state.
- Ensure `requirements.txt` and any `.env.example` files are up to date.

### 2. Transfer the source code to the server

From your local machine (outside the VPS):

```bash
scp -r . obinnanwaneri@74.50.81.201:/var/www/nafila-shop
```

> Swap `obinnanwaneri` for the SSH user that owns your deployment directory. Ensure `/var/www/nafila-shop` exists and is writable (see step 4) before running the copy. Alternatively, push to a Git host and clone from the server.

### 3. SSH into the VPS and install system dependencies

```bash
ssh obinnanwaneri@74.50.81.201
sudo apt update
sudo apt install -y python3-venv python3-pip python3-dev build-essential nginx git
```

### 4. Create the project directory structure

```bash
sudo mkdir -p /var/www/nafila-shop
sudo chown -R obinnanwaneri:www-data /var/www/nafila-shop
cd /var/www/nafila-shop
```

> Adjust the ownership command to match your deploy user and group. For root-owned deployments, you may skip the `chown` step.

If you transferred an archive instead of a directory, extract it now (for example, `tar -xzf nafila-shop.tar.gz`).

### 5. Set up a Python virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip wheel
pip install -r requirements.txt
pip install gunicorn
```

### 6. Configure environment variables

- Copy `.env.example` to `.env` if available, or create one manually alongside `manage.py`.
- Set core Django settings such as:
  - `SECRET_KEY` – generate a long random string (e.g., via `python -c "import secrets; print(secrets.token_urlsafe(64))"`).
  - `DEBUG=False` to disable debug mode in production.
  - `ALLOWED_HOSTS=74.50.81.201,<your-domain>` so Django serves responses for your VPS IP and any custom domain.
  - `CSRF_TRUSTED_ORIGINS=https://74.50.81.201,https://<your-domain>` to avoid CSRF verification errors behind HTTPS.
- Configure database credentials if you are using PostgreSQL/MySQL instead of SQLite (e.g., `DATABASE_URL` or individual engine settings).
- Provide email, storage, and third-party API credentials (`EMAIL_HOST`, `DEFAULT_FROM_EMAIL`, `AWS_ACCESS_KEY_ID`, etc.) required for production features.

### 7. Apply migrations, load optional data, and collect static files

```bash
python manage.py migrate
python manage.py loaddata fixtures/sample_data.json  # optional demo data
python manage.py collectstatic --noinput
```

### 8. Create a systemd service for Gunicorn

Create `/etc/systemd/system/nafila-shop.service` with the following contents (update paths and usernames):

```ini
[Unit]
Description=Gunicorn daemon for Nafila Shop
After=network.target

[Service]
User=obinnanwaneri
Group=www-data
WorkingDirectory=/var/www/nafila-shop
Environment="DJANGO_SETTINGS_MODULE=nafila_shop.settings"
EnvironmentFile=/var/www/nafila-shop/.env
RuntimeDirectory=nafila-shop
ExecStart=/var/www/nafila-shop/.venv/bin/gunicorn \
    --access-logfile - \
    --workers 3 \
    --bind unix:/run/nafila-shop/nafila-shop.sock nafila_shop.wsgi:application

[Install]
WantedBy=multi-user.target
```

Then reload systemd and enable the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now nafila-shop
```

### 9. Configure Nginx as a reverse proxy

Create `/etc/nginx/sites-available/nafila-shop` with:

```nginx
server {
    listen 80;
    server_name 74.50.81.201 your-domain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        alias /var/www/nafila-shop/static/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/nafila-shop/nafila-shop.sock;
    }
}
```

Activate the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/nafila-shop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 10. Configure the firewall (optional but recommended)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 11. Verify the deployment

- Check Gunicorn logs: `journalctl -u nafila-shop -f`.
- Visit `http://74.50.81.201/` (or your domain) to confirm the site is live.

### 11a. Troubleshoot a failed systemd start

If `sudo systemctl enable --now nafila-shop` reports a failure:

- Inspect the service status for immediate errors:

  ```bash
  sudo systemctl status nafila-shop
  ```

- Tail the detailed logs to see Gunicorn and Django output:

  ```bash
  sudo journalctl -xeu nafila-shop
  ```

- Common fixes:
  - Ensure `/var/www/nafila-shop/.env` exists and contains the required environment variables (`SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, etc.).
  - Confirm the virtual environment is populated and includes Gunicorn: `source /var/www/nafila-shop/.venv/bin/activate && pip show gunicorn`.
  - Verify database migrations have been applied: `python manage.py migrate`.
  - Check file permissions so the service user can read the project files and the `.env` file.
  - If you changed the socket path, mirror the update in both the systemd unit and Nginx configuration.

### 12. Set up HTTPS (optional but recommended)

Use Let’s Encrypt with Certbot for TLS certificates:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

Renewals run automatically via systemd timers. Confirm with `sudo certbot renew --dry-run`.

### 13. Configure continuous delivery (optional)

- Pull updates from Git: `git pull origin main && sudo systemctl restart nafila-shop`.
- Or automate deployments with GitHub Actions, Rsync, or other tooling.

These steps cover the end-to-end process of uploading the project to the Ubuntu VPS and running it behind Gunicorn and Nginx for production traffic.

## Production Hardening

For production, configure a process manager such as `gunicorn` with `systemd` and proxy it through Nginx or Caddy.

## License

This template is provided for rapid prototyping and internal evaluation.
