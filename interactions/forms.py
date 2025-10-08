from __future__ import annotations

from django import forms

from .models import IdeaComment


class CommentForm(forms.ModelForm):
    class Meta:
        model = IdeaComment
        fields = ("content",)
        widgets = {
            "content": forms.Textarea(
                attrs={
                    "rows": 3,
                    "class": "w-full rounded border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500",
                    "placeholder": "Share your thoughts...",
                }
            )
        }
