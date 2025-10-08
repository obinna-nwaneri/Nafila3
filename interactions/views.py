from __future__ import annotations

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import BooleanField, Exists, OuterRef, Value
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render

from accounts.models import User
from ideas.models import Idea

from .forms import CommentForm
from .models import Follow, IdeaComment, IdeaLike, ProfileReview, Watchlist


def home(request: HttpRequest) -> HttpResponse:
    ideas_qs = (
        Idea.objects.filter(status=Idea.Status.PUBLISHED)
        .select_related("owner", "owner__investor_profile")
    )
    if request.user.is_authenticated:
        liked_subquery = IdeaLike.objects.filter(user=request.user, idea=OuterRef("pk"))
        ideas_qs = ideas_qs.annotate(liked_by_user=Exists(liked_subquery))
    else:
        ideas_qs = ideas_qs.annotate(
            liked_by_user=Value(False, output_field=BooleanField())
        )
    ideas = ideas_qs[:12]
    comment_form = CommentForm()
    return render(
        request,
        "interactions/home.html",
        {
            "ideas": ideas,
            "comment_form": comment_form,
        },
    )


@login_required
def toggle_follow(request: HttpRequest, username: str) -> HttpResponse:
    target = get_object_or_404(User, username=username)
    if target == request.user:
        messages.warning(request, "You cannot follow yourself.")
        return redirect("home")
    follow, created = Follow.objects.get_or_create(follower=request.user, following=target)
    if not created:
        follow.delete()
        following = False
    else:
        following = True
    if not request.htmx:
        return redirect("home")
    template = "interactions/components/follow_button.html"
    return render(request, template, {"target": target, "following": following})


@login_required
def toggle_like(request: HttpRequest, pk: int) -> HttpResponse:
    idea = get_object_or_404(Idea, pk=pk)
    like, created = IdeaLike.objects.get_or_create(user=request.user, idea=idea)
    if not created:
        like.delete()
    liked = idea.likes.filter(user=request.user).exists()
    if not request.htmx:
        return redirect(idea.get_absolute_url())
    template = "interactions/components/like_button.html"
    return render(
        request,
        template,
        {
            "idea": idea,
            "liked": liked,
            "like_count": idea.likes.count(),
        },
    )


def add_comment(request: HttpRequest, pk: int) -> HttpResponse:
    idea = get_object_or_404(Idea, pk=pk)
    form = CommentForm(request.POST or None)
    if request.method == "POST":
        if not request.user.is_authenticated:
            messages.error(request, "Log in to join the discussion.")
            if request.htmx:
                response = render(
                    request,
                    "interactions/components/comment_list.html",
                    {"idea": idea, "comments": idea.comments.select_related("user")},
                )
                response.status_code = 401
                return response
            return redirect("login")
        if form.is_valid():
            comment: IdeaComment = form.save(commit=False)
            comment.user = request.user
            comment.idea = idea
            comment.save()
            messages.success(request, "Comment added.")
        elif request.htmx:
            response = render(request, "interactions/components/comment_form.html", {"form": form, "idea": idea})
            response.status_code = 422
            return response
        else:
            messages.error(request, "Please fix the comment and try again.")
        if not request.htmx:
            return redirect(idea.get_absolute_url())
    return render(
        request,
        "interactions/components/comment_list.html",
        {"idea": idea, "comments": idea.comments.select_related("user")},
    )


@login_required
def toggle_watchlist(request: HttpRequest, pk: int) -> HttpResponse:
    idea = get_object_or_404(Idea, pk=pk)
    watch, created = Watchlist.objects.get_or_create(investor=request.user, idea=idea)
    if not created:
        watch.delete()
    in_watchlist = idea.watchlisted_by.filter(investor=request.user).exists()
    if not request.htmx:
        return redirect(idea.get_absolute_url())
    template = "interactions/components/watchlist_button.html"
    return render(
        request,
        template,
        {
            "idea": idea,
            "in_watchlist": in_watchlist,
        },
    )


def submit_review(request: HttpRequest, username: str) -> HttpResponse:
    target = get_object_or_404(User, username=username)
    if request.method == "POST":
        if not request.user.is_authenticated:
            messages.error(request, "Log in to rate this profile.")
            if request.htmx:
                response = render(
                    request,
                    "interactions/components/review_list.html",
                    {"target": target, "reviews": target.received_reviews.select_related("reviewer")},
                )
                response.status_code = 401
                return response
            return redirect("login")
        rating = int(request.POST.get("rating", 5))
        feedback = request.POST.get("feedback", "")
        ProfileReview.objects.update_or_create(
            reviewer=request.user,
            reviewee=target,
            defaults={"rating": rating, "feedback": feedback},
        )
        messages.success(request, "Review submitted.")
        if not request.htmx:
            return redirect("home")
    return render(
        request,
        "interactions/components/review_list.html",
        {"target": target, "reviews": target.received_reviews.select_related("reviewer")},
    )
