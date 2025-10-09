from __future__ import annotations

from django import forms

from .models import Idea, IdeaDocument


class HtmxFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            classes = field.widget.attrs.get("class", "")
            field.widget.attrs["class"] = f"{classes} w-full rounded border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500".strip()
            field.widget.attrs.setdefault("placeholder", field.label)


class IdeaForm(HtmxFormMixin, forms.ModelForm):
    class Meta:
        model = Idea
        exclude = ("owner", "created_at", "updated_at")


class IdeaDocumentForm(HtmxFormMixin, forms.ModelForm):
    class Meta:
        model = IdeaDocument
        fields = ("name", "document_url")
