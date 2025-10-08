from __future__ import annotations

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse


class User(AbstractUser):
    class Roles(models.TextChoices):
        ENTREPRENEUR = "entrepreneur", "Entrepreneur"
        INVESTOR = "investor", "Investor"
        GENERAL = "general", "General User"

    role = models.CharField(
        max_length=32,
        choices=Roles.choices,
        default=Roles.GENERAL,
        help_text="Determines the features and dashboards available to the user.",
    )
    display_name = models.CharField(max_length=150, blank=True)

    def __str__(self) -> str:
        return self.display_name or self.get_username()

    @property
    def is_entrepreneur(self) -> bool:
        return self.role == self.Roles.ENTREPRENEUR

    @property
    def is_investor(self) -> bool:
        return self.role == self.Roles.INVESTOR


class EntrepreneurProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="entrepreneur_profile")
    bio = models.TextField(blank=True)
    business_name = models.CharField(max_length=255, blank=True)
    business_idea = models.TextField(blank=True)
    pitch_video_url = models.URLField(blank=True)
    documents = models.TextField(blank=True, help_text="Links to decks or documents")
    contact_email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    verified = models.BooleanField(default=False)

    class Meta:
        ordering = ["user__username"]

    def __str__(self) -> str:
        return f"Entrepreneur: {self.user}"

    def get_absolute_url(self) -> str:
        return reverse("entrepreneur-detail", args=[self.pk])


class InvestorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="investor_profile")
    sector_preferences = models.CharField(max_length=255, blank=True)
    ticket_size = models.CharField(max_length=255, blank=True)
    geography = models.CharField(max_length=255, blank=True)
    risk_appetite = models.CharField(max_length=255, blank=True)
    contact_email = models.EmailField(blank=True)
    verified = models.BooleanField(default=False)

    class Meta:
        ordering = ["user__username"]

    def __str__(self) -> str:
        return f"Investor: {self.user}"

    def get_absolute_url(self) -> str:
        return reverse("investor-detail", args=[self.pk])
