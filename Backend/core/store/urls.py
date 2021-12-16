from django.urls import path
from .views import BestFromFarmers, BestSellingProducts, RelatedProducts, SearchProducts, CategoryListAPIView, ProductDetailAPIView, ProductsByCategory, ProductsByTag, QuestionsByProducts, TagListAPIView, add_wish, question_create, rating_create_or_update, ReviewsByProducts, remove_wish, review_create

urlpatterns = [
    path('category/', CategoryListAPIView.as_view()),
    path('best-selling-products/', BestSellingProducts.as_view()),
    path('best-from-farmers/', BestFromFarmers.as_view()),
    path('products/related/<slug:slug>/', RelatedProducts.as_view()),
    path('products/search/', SearchProducts.as_view()),
    path('product/detail/<slug:url>/', ProductDetailAPIView.as_view()),
    path('tags/', TagListAPIView.as_view()),
    path('category/<slug:url>/products/', ProductsByCategory.as_view()),
    path('tag/<slug:url>/products/', ProductsByTag.as_view()),
    path('rating/', rating_create_or_update),
    path('product/<slug:url>/reviews/', ReviewsByProducts.as_view()),
    path('review/create/', review_create),
    path('product/<slug:url>/questions/', QuestionsByProducts.as_view()),
    path('question/create/', question_create),
    path('wishlist/remove/', remove_wish),
    path('wishlist/add/', add_wish),
]
