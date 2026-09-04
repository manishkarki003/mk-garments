from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.throttling import AnonRateThrottle
from .models import Inquiry
from .serializers import InquiryCreateSerializer


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquiryCreateSerializer
    parser_classes = [MultiPartParser, FormParser]
    throttle_classes = [AnonRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Thank you for your inquiry — our team will contact you shortly."},
            status=status.HTTP_201_CREATED
        )