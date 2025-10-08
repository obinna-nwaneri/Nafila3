# Generated manually for Nafila Shop interactions app
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("accounts", "0001_initial"),
        ("ideas", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Follow",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "follower",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="following", to=settings.AUTH_USER_MODEL),
                ),
                (
                    "following",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="followers", to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"unique_together": {("follower", "following")}},
        ),
        migrations.CreateModel(
            name="IdeaLike",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("idea", models.ForeignKey(on_delete=models.CASCADE, related_name="likes", to="ideas.idea")),
                ("user", models.ForeignKey(on_delete=models.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={"unique_together": {("user", "idea")}},
        ),
        migrations.CreateModel(
            name="IdeaComment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("content", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("idea", models.ForeignKey(on_delete=models.CASCADE, related_name="comments", to="ideas.idea")),
                ("user", models.ForeignKey(on_delete=models.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Watchlist",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("idea", models.ForeignKey(on_delete=models.CASCADE, related_name="watchlisted_by", to="ideas.idea")),
                (
                    "investor",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="watchlist", to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"unique_together": {("investor", "idea")}},
        ),
        migrations.CreateModel(
            name="ProfileReview",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("rating", models.PositiveSmallIntegerField(default=5)),
                ("feedback", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "reviewee",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="received_reviews", to=settings.AUTH_USER_MODEL),
                ),
                (
                    "reviewer",
                    models.ForeignKey(on_delete=models.CASCADE, related_name="given_reviews", to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
