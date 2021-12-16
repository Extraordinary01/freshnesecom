from .models import User
from rest_framework import serializers
from store.serializers import ProductsSerializer


class UserSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField()
    img = serializers.ImageField(required=False,use_url=True, allow_empty_file=True)
    wishlist = ProductsSerializer(read_only=True, many=True)

    def get_city(self, obj):
        try:
            if obj.city:
                return obj.city.name
            else:
                return '-'
        except:
            return '-'
   
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "password", "img", "city", "address", "phone", "wishlist")
        extra_kwargs = { "password": { "write_only": True } }

class PasswordResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(max_length=150)

    class Meta:
        fields = ["uid", "token", "password"]


