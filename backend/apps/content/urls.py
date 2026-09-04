from django.urls import path
from .views import (
    CaseStudyListView, CaseStudyDetailView,
    BlogPostListView, BlogPostDetailView
)

urlpatterns = [
    path('case-studies/', CaseStudyListView.as_view(), name='case-study-list'),
    path('case-studies/<slug:slug>/', CaseStudyDetailView.as_view(), name='case-study-detail'),
    path('blog/', BlogPostListView.as_view(), name='blog-list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
]