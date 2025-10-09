from __future__ import annotations

from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse_lazy

from ideas.models import Idea
from interactions.models import Watchlist

from .forms import (
    EntrepreneurProfileForm,
    HtmxAuthenticationForm,
    InvestorProfileForm,
    ProfileUpdateForm,
    RegistrationForm,
)
from .models import EntrepreneurProfile, InvestorProfile, User


class HtmxLoginView(LoginView):
    authentication_form = HtmxAuthenticationForm
    template_name = "accounts/login.html"
    success_url = reverse_lazy("accounts:dashboard")

    def form_invalid(self, form: HtmxAuthenticationForm) -> HttpResponse:
        response = super().form_invalid(form)
        if self.request.htmx:
            response.status_code = 422
        return response


def register(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user: User = form.save()
            if user.role == User.Roles.ENTREPRENEUR:
                EntrepreneurProfile.objects.get_or_create(user=user)
            elif user.role == User.Roles.INVESTOR:
                InvestorProfile.objects.get_or_create(user=user)
            login(request, user)
            messages.success(request, "Welcome to Nafila Shop! Complete your profile to get started.")
            return redirect("accounts:dashboard")
    else:
        form = RegistrationForm()
    return render(request, "accounts/register.html", {"form": form})


@login_required
def dashboard(request: HttpRequest) -> HttpResponse:
    user: User = request.user
    context: dict[str, object] = {"user": user}
    if user.is_entrepreneur:
        context["ideas"] = Idea.objects.filter(owner=user)
        template = "accounts/entrepreneur_dashboard.html"
    elif user.is_investor:
        context["watchlist"] = Watchlist.objects.filter(investor=user).select_related("idea")
        context["ideas"] = Idea.objects.filter(status=Idea.Status.PUBLISHED)[:8]
        template = "accounts/investor_dashboard.html"
    else:
        context["ideas"] = Idea.objects.filter(status=Idea.Status.PUBLISHED)[:8]
        template = "accounts/general_dashboard.html"
    return render(request, template, context)


@login_required
def profile(request: HttpRequest) -> HttpResponse:
    user: User = request.user
    profile_form = ProfileUpdateForm(instance=user)

    entrepreneur_form = None
    investor_form = None

    if user.is_entrepreneur:
        try:
            entrepreneur_instance = user.entrepreneur_profile
        except EntrepreneurProfile.DoesNotExist:
            entrepreneur_instance = None
        entrepreneur_form = EntrepreneurProfileForm(instance=entrepreneur_instance)
    elif user.is_investor:
        try:
            investor_instance = user.investor_profile
        except InvestorProfile.DoesNotExist:
            investor_instance = None
        investor_form = InvestorProfileForm(instance=investor_instance)

    if request.method == "POST":
        profile_form = ProfileUpdateForm(request.POST, instance=user)
        if user.is_entrepreneur:
            try:
                entrepreneur_instance = user.entrepreneur_profile
            except EntrepreneurProfile.DoesNotExist:
                entrepreneur_instance = None
            entrepreneur_form = EntrepreneurProfileForm(request.POST, instance=entrepreneur_instance)
        elif user.is_investor:
            try:
                investor_instance = user.investor_profile
            except InvestorProfile.DoesNotExist:
                investor_instance = None
            investor_form = InvestorProfileForm(request.POST, instance=investor_instance)

        forms = [profile_form]
        if entrepreneur_form:
            forms.append(entrepreneur_form)
        if investor_form:
            forms.append(investor_form)

        if all(form.is_valid() for form in forms):
            for form in forms:
                obj = form.save(commit=False)
                if isinstance(obj, User):
                    obj.save()
                else:
                    obj.user = user
                    obj.save()
            messages.success(request, "Profile updated successfully.")
            return redirect("accounts:profile")
        else:
            messages.error(request, "Please correct the errors below.")

    return render(
        request,
        "accounts/profile_form.html",
        {
            "profile_form": profile_form,
            "entrepreneur_form": entrepreneur_form,
            "investor_form": investor_form,
        },
    )
