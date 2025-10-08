from __future__ import annotations

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render

from accounts.models import EntrepreneurProfile
from interactions.forms import CommentForm

from .forms import IdeaForm
from .models import Idea


def idea_list(request: HttpRequest) -> HttpResponse:
    query = request.GET.get("q", "").strip()
    ideas = Idea.objects.filter(status=Idea.Status.PUBLISHED)
    if query:
        ideas = ideas.filter(
            Q(title__icontains=query)
            | Q(summary__icontains=query)
            | Q(problem_statement__icontains=query)
            | Q(solution__icontains=query)
        )
    return render(request, "ideas/idea_list.html", {"ideas": ideas, "query": query})


def idea_detail(request: HttpRequest, pk: int) -> HttpResponse:
    idea = get_object_or_404(Idea, pk=pk)
    comment_form = CommentForm()
    try:
        entrepreneur_profile = idea.owner.entrepreneur_profile
    except EntrepreneurProfile.DoesNotExist:
        entrepreneur_profile = None
    return render(
        request,
        "ideas/idea_detail.html",
        {
            "idea": idea,
            "comment_form": comment_form,
            "entrepreneur_profile": entrepreneur_profile,
        },
    )


@login_required
def idea_create(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = IdeaForm(request.POST)
        if form.is_valid():
            idea = form.save(commit=False)
            idea.owner = request.user
            idea.save()
            messages.success(request, "Idea created successfully.")
            return redirect(idea.get_absolute_url())
    else:
        form = IdeaForm()
    return render(request, "ideas/idea_form.html", {"form": form})


@login_required
def idea_update(request: HttpRequest, pk: int) -> HttpResponse:
    idea = get_object_or_404(Idea, pk=pk, owner=request.user)
    if request.method == "POST":
        form = IdeaForm(request.POST, instance=idea)
        if form.is_valid():
            form.save()
            messages.success(request, "Idea updated successfully.")
            return redirect(idea.get_absolute_url())
    else:
        form = IdeaForm(instance=idea)
    return render(request, "ideas/idea_form.html", {"form": form, "idea": idea})
