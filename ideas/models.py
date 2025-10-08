from __future__ import annotations

from django.conf import settings
from django.db import models
from django.urls import reverse


class Idea(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        ARCHIVED = "archived", "Archived"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="ideas",
    )
    title = models.CharField(max_length=255)
    summary = models.TextField()
    problem_statement = models.TextField()
    solution = models.TextField()
    market_opportunity = models.TextField(blank=True)
    business_model = models.TextField(blank=True)
    financial_projections = models.TextField(blank=True)
    traction = models.TextField(blank=True)
    pitch_video_url = models.URLField(blank=True)
    instagram_handle = models.URLField(blank=True)
    other_social_links = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=32, choices=Status.choices, default=Status.DRAFT)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self) -> str:
        return reverse("idea-detail", args=[self.pk])


class IdeaDocument(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name="documents")
    name = models.CharField(max_length=255)
    document_url = models.URLField()

    class Meta:
        verbose_name = "Supporting Document"
        verbose_name_plural = "Supporting Documents"

    def __str__(self) -> str:
        return f"{self.name} ({self.idea})"
