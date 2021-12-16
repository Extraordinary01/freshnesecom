from rest_framework import serializers
from rest_framework.generics import ListAPIView
from .serializers import PostSerializer, MonthSerializer
from .models import Post
from store.pagination import ProductsPagination
from django.db.models import Count
from django.db.models.functions import TruncMonth
from datetime import date, datetime

class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = ProductsPagination

class PostsMonthListAPIView(ListAPIView):
    serializer_class = MonthSerializer

    def get_queryset(self):
        queryset = Post.objects.annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).values('month').order_by('-month')
        return queryset

class PostsByDate(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = ProductsPagination

    def get_queryset(self):
        month = datetime.strptime(self.kwargs['month'],"%B")
        queryset = Post.objects.filter(created_at__year=self.kwargs['year'], created_at__month=month.month)
        return queryset