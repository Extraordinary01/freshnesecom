from django.urls import path
from .views import UserRetrieveUpdateDestroyView, activate, register, CheckUserAPIView, custom_login, reset_password, reset_password_email

urlpatterns = [
    path("user/", UserRetrieveUpdateDestroyView.as_view()),
    path("signup/", register),
    path("check/", CheckUserAPIView.as_view()),
    path("login/", custom_login),
    path("activate/", activate),
    path("reset-password/email/", reset_password_email),
    path("reset-password/", reset_password)
]
