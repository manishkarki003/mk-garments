from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryImage
from .serializers import GalleryImageSerializer


class GalleryImageListView(generics.ListAPIView):
    serializer_class = GalleryImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug']
    pagination_class = None

    def get_queryset(self):
        return GalleryImage.objects.filter(is_published=True).select_related('category')