from rest_framework import generics
from .models import CaseStudy, BlogPost
from .serializers import (
    CaseStudyListSerializer, CaseStudyDetailSerializer,
    BlogPostListSerializer, BlogPostDetailSerializer
)


class CaseStudyListView(generics.ListAPIView):
    queryset = CaseStudy.objects.filter(is_published=True)
    serializer_class = CaseStudyListSerializer
    pagination_class = None


class CaseStudyDetailView(generics.RetrieveAPIView):
    queryset = CaseStudy.objects.filter(is_published=True)
    serializer_class = CaseStudyDetailSerializer
    lookup_field = 'slug'


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostListSerializer


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'