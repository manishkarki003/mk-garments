from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import ProductCategory, Product
from .serializers import (
    ProductCategorySerializer, ProductListSerializer, ProductDetailSerializer
)


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.filter(is_active=True)
    serializer_class = ProductCategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category__slug']
    search_fields = ['name', 'short_description']

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related('category')


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'