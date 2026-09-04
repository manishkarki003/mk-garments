from django.urls import path
from .views import ProductCategoryListView, ProductListView, ProductDetailView

urlpatterns = [
    path('categories/', ProductCategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]