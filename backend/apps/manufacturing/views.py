from rest_framework import generics
from .models import ManufacturingCapability, ManufacturingProcess, Certification, Testimonial
from .serializers import (
    ManufacturingCapabilitySerializer, ManufacturingProcessSerializer,
    CertificationSerializer, TestimonialSerializer
)


class ManufacturingCapabilityListView(generics.ListAPIView):
    queryset = ManufacturingCapability.objects.filter(is_active=True)
    serializer_class = ManufacturingCapabilitySerializer
    pagination_class = None


class ManufacturingProcessListView(generics.ListAPIView):
    queryset = ManufacturingProcess.objects.filter(is_active=True)
    serializer_class = ManufacturingProcessSerializer
    pagination_class = None


class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.filter(is_published=True)
    serializer_class = CertificationSerializer
    pagination_class = None


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer
    pagination_class = None