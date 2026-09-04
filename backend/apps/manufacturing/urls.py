from django.urls import path
from .views import (
    ManufacturingCapabilityListView, ManufacturingProcessListView,
    CertificationListView, TestimonialListView
)

urlpatterns = [
    path('manufacturing/', ManufacturingCapabilityListView.as_view(), name='capability-list'),
    path('process/', ManufacturingProcessListView.as_view(), name='process-list'),
    path('certifications/', CertificationListView.as_view(), name='certification-list'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),
]