from django.urls import path

from . import views

app_name = "interactions"

urlpatterns = [
    path("", views.home, name="home"),
    path("follow/<str:username>/", views.toggle_follow, name="toggle-follow"),
    path("ideas/<int:pk>/like/", views.toggle_like, name="toggle-like"),
    path("ideas/<int:pk>/comment/", views.add_comment, name="add-comment"),
    path("ideas/<int:pk>/watchlist/", views.toggle_watchlist, name="toggle-watchlist"),
    path("reviews/<str:username>/", views.submit_review, name="submit-review"),
]
