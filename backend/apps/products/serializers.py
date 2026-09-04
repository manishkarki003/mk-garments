from rest_framework import serializers
from .models import ProductCategory, Product, ProductImage


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'slug', 'description', 'image', 'order']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'order']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for the product grid/listing page."""
    category = ProductCategorySerializer(read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'short_description', 'category', 'cover_image']

    def get_cover_image(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ProductImageSerializer(first_image).data
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full serializer for the product detail page."""
    category = ProductCategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'short_description', 'description',
            'fabric_options', 'customization_options', 'branding_options',
            'available_colors', 'moq', 'images', 'seo_title', 'seo_description',
        ]