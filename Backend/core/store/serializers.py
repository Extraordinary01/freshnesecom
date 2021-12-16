from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *
from users.models import User

class CategorySerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, obj):
        products = Product.objects.filter(category=obj).count()
        return products

    class Meta:
        model = Category
        fields = ("id", "name", "url", "products")


class TagSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, obj):
        products = Product.objects.filter(tags__in=[obj]).count()
        return products

    class Meta:
        model = Tag
        fields = ("id", "name", "url", "products")


class DeliveryFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryForm
        fields = ("short",)


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):
    category_url = serializers.SlugField(source='category.url')
    brand = serializers.CharField(source='brand.name')
    tags = TagSerializer(read_only=True, many=True)
    buyby = DeliveryFormSerializer(read_only=True, many=True)
    img = serializers.ImageField()
    rating_count = serializers.IntegerField(source='ratings.count', read_only=True)
    rating_user = serializers.SerializerMethodField('get_rating_user')
    rating_avg = serializers.SerializerMethodField('get_rating_avg')

    def get_rating_user(self, product):
        try:
            request = self.context.get("request")
            token = Token.objects.get(key=request.auth)
            is_user = product.ratings.filter(user=token.user)
            if is_user.count() > 0:
                return is_user[0].rating
            else:
                return 0
        except:
            return 0
            
    def get_rating_avg(self, product):
        return product.ratings.aggregate(models.Avg('rating'))["rating__avg"]

    class Meta:
        model = Product
        fields = ("id", "name", "url", "category_url", "tags", "img",
                  "desc", "description", "brand", "sku", "stock", "bought", "date", "buyby", "delivery_from", "delivery_date", "shipping", "price", "is_sale", "old_price", "rating_count","rating_avg", "rating_user")

class UserBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "img")
        read_only_fields = ("username", "img")



class ReviewSerializer(serializers.ModelSerializer):
    author = UserBlogSerializer(source="user",read_only=True)
    class Meta:
        model = Review
        fields = ("id", "text", "user", "author", "product", "created_at")
        extra_kwargs = {'user': {'write_only': True}, 'product': {'write_only': True}, 'created_at': {'read_only': True}}


class QuestionSerializer(serializers.ModelSerializer):
    author = UserBlogSerializer(source="user",read_only=True)
    class Meta:
        model = Question
        fields = ("id", "text", "user", "author", "product", "created_at")
        extra_kwargs = {'user': {'write_only': True}, 'product': {'write_only': True}, 'created_at': {'read_only': True}}