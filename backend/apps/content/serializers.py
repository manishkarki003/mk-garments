from rest_framework import serializers
from .models import CaseStudy, CaseStudyImage, BlogPost


class CaseStudyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudyImage
        fields = ['id', 'image', 'caption', 'order']


class CaseStudyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'product_type', 'industry',
            'client_name', 'cover_image',
        ]


class CaseStudyDetailSerializer(serializers.ModelSerializer):
    images = CaseStudyImageSerializer(many=True, read_only=True)

    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'product_type', 'industry', 'client_name',
            'challenge', 'solution', 'process', 'result', 'cover_image',
            'images', 'seo_title', 'seo_description',
        ]


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author', 'published_at']


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'author', 'published_at', 'seo_title', 'seo_description',
        ]