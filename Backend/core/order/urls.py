from django.urls import path
from .views import *

urlpatterns = [
    path('checkout/', OrderView.as_view()),
]
