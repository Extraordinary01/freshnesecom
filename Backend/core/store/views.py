from rest_framework import pagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .pagination import ProductsPagination
from django.db.models import Q

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListAPIView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ProductsByCategory(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    def get_queryset(self, *args, **kwargs):
        queryset = Product.objects.filter(category__url=self.kwargs['url'])
        return queryset


class BestSellingProducts(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    def get_queryset(self):
        queryset = Product.objects.order_by('-bought')
        return queryset

class BestFromFarmers(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    
    def get_queryset(self):
        queryset = Product.objects.filter(brand__name__icontains='Farm')
        return queryset

class RelatedProducts(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    def get_queryset(self):
        product = Product.objects.get(url=self.kwargs['slug'])
        queryset = Product.objects.filter(Q(Q(category=product.category) | Q(brand=product.brand) | Q(tags__in=product.tags.all())) & ~Q(id=product.id)).distinct()
        return queryset

class SearchProducts(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    def get_queryset(self):
        query = self.request.GET.get('q')
        category = self.request.GET.get('category', None)
        queryset = Product.objects.filter(name__icontains=query)
        if category != None:
            queryset = queryset.filter(category__name=category)
        return queryset

class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = 'url'

class ProductsByTag(ListAPIView):
    serializer_class = ProductsSerializer
    pagination_class = ProductsPagination

    def get_queryset(self, *args, **kwargs):
        queryset = Product.objects.filter(tags__url=self.kwargs['url'])
        return queryset


@api_view(["POST"])
def rating_create_or_update(request):
    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        rating = Rating.objects.update_or_create(product=serializer.validated_data.get("product", None), user=serializer.validated_data.get("user", None), defaults={"rating": serializer.validated_data.get("rating", None)})
        return Response(serializer.data, HTTP_201_CREATED)
    else :
        print(serializer.errors)
        return Response({"error": "Something went wrong!",}, HTTP_400_BAD_REQUEST)

class ReviewsByProducts(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Review.objects.filter(product__url=self.kwargs['url'])
        return queryset

@api_view(["POST"])
def review_create(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        Review.objects.create(text=serializer.validated_data.get("text", None), user=serializer.validated_data.get("user", None), product=serializer.validated_data.get("product", None))
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(serializer.error_messages, HTTP_400_BAD_REQUEST)


class QuestionsByProducts(ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Question.objects.filter(product__url=self.kwargs['url'])
        return queryset

@api_view(["POST"])
def question_create(request):
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        Question.objects.create(text=serializer.validated_data.get("text", None), user=serializer.validated_data.get("user", None), product=serializer.validated_data.get("product", None))
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(serializer.error_messages, HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def add_wish(request):
    product = request.data.get("product")
    try:
        request.user.wishlist.add(product)
        return Response(status=HTTP_201_CREATED)
    except:
        return Response(status=HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def remove_wish(request):
    product = request.data.get("product")
    try:
        request.user.wishlist.remove(product)
        return Response(status=HTTP_200_OK)
    except:
        return Response(status=HTTP_400_BAD_REQUEST)
