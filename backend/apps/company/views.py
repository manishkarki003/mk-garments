from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import CompanyProfile, ContactMessage
from .serializers import CompanyProfileSerializer, ContactMessageSerializer


class CompanyProfileView(generics.RetrieveAPIView):
    serializer_class = CompanyProfileSerializer

    def get_object(self):
        return CompanyProfile.objects.first()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({"detail": "Company profile not configured yet."}, status=404)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [AnonRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Thank you — we'll be in touch shortly."},
            status=status.HTTP_201_CREATED
        )