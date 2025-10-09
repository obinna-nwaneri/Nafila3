from django.urls import path
from django.contrib.auth.views import LogoutView

from .views import HtmxLoginView, dashboard, profile, register

app_name = "accounts"

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", HtmxLoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("dashboard/", dashboard, name="dashboard"),
    path("profile/", profile, name="profile"),
]
