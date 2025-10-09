from __future__ import annotations

from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import User, EntrepreneurProfile, InvestorProfile


class BootstrapMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if hasattr(field.widget, "input_type") and field.widget.input_type in {"checkbox", "radio"}:
                field.widget.attrs.setdefault("class", "rounded border-gray-300")
            else:
                classes = field.widget.attrs.get("class", "")
                field.widget.attrs["class"] = f"{classes} w-full rounded border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500".strip()
            field.widget.attrs.setdefault("placeholder", field.label)


class RegistrationForm(BootstrapMixin, UserCreationForm):
    role = forms.ChoiceField(choices=User.Roles.choices)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "display_name", "email", "role")


class ProfileUpdateForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = User
        fields = ("display_name", "email")


class EntrepreneurProfileForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = EntrepreneurProfile
        exclude = ("user",)


class InvestorProfileForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = InvestorProfile
        exclude = ("user",)


class HtmxAuthenticationForm(BootstrapMixin, AuthenticationForm):
    pass
