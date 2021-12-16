from rest_framework import serializers
from .models import *
from store.models import Tag
from store.serializers import UserBlogSerializer

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ("id", "name", "url")


class PostSerializer(serializers.ModelSerializer):
    category_url = serializers.SlugField(source='category.url')
    tags = TagSerializer(read_only=True, many=True)
    author = UserBlogSerializer()

    class Meta:
        model = Post
        fields = ("id", "title", "url", "category_url", "tags",
                  "img", "content", "created_at", "author")

class MonthSerializer(serializers.Serializer):
    month = serializers.DateField(format="%B %Y")

    class Meta:
        fields =("month",)