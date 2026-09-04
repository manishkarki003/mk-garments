from rest_framework import serializers
from .models import GalleryCategory, GalleryImage


class GalleryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryCategory
        fields = ['id', 'name', 'slug', 'order']


class GalleryImageSerializer(serializers.ModelSerializer):
    category = GalleryCategorySerializer(read_only=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'category', 'image', 'alt_text', 'caption', 'order']