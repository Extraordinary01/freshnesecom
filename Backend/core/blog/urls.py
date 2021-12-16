from django.urls import path
from .views import PostListAPIView, PostsByDate, PostsMonthListAPIView

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='posts'),
    path('posts/months/', PostsMonthListAPIView.as_view()),
    path('posts/<slug:year>/<slug:month>/', PostsByDate.as_view())
]
