from django.contrib import admin

from .models import Follow, IdeaComment, IdeaLike, ProfileReview, Watchlist


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("follower", "following", "created_at")
    search_fields = ("follower__username", "following__username")


@admin.register(IdeaLike)
class IdeaLikeAdmin(admin.ModelAdmin):
    list_display = ("user", "idea", "created_at")
    search_fields = ("user__username", "idea__title")


@admin.register(IdeaComment)
class IdeaCommentAdmin(admin.ModelAdmin):
    list_display = ("user", "idea", "created_at")
    search_fields = ("user__username", "idea__title", "content")


@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ("investor", "idea", "created_at")
    search_fields = ("investor__username", "idea__title")


@admin.register(ProfileReview)
class ProfileReviewAdmin(admin.ModelAdmin):
    list_display = ("reviewer", "reviewee", "rating", "created_at")
    search_fields = ("reviewer__username", "reviewee__username")
