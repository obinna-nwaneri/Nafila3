# Generated manually for Nafila Shop ideas app
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Idea",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("summary", models.TextField()),
                ("problem_statement", models.TextField()),
                ("solution", models.TextField()),
                ("market_opportunity", models.TextField(blank=True)),
                ("business_model", models.TextField(blank=True)),
                ("financial_projections", models.TextField(blank=True)),
                ("traction", models.TextField(blank=True)),
                ("pitch_video_url", models.URLField(blank=True)),
                ("instagram_handle", models.URLField(blank=True)),
                ("other_social_links", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[("draft", "Draft"), ("published", "Published"), ("archived", "Archived")],
                        default="draft",
                        max_length=32,
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="ideas", to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="IdeaDocument",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255)),
                ("document_url", models.URLField()),
                ("idea", models.ForeignKey(on_delete=models.CASCADE, related_name="documents", to="ideas.idea")),
            ],
            options={
                "verbose_name": "Supporting Document",
                "verbose_name_plural": "Supporting Documents",
            },
        ),
    ]
