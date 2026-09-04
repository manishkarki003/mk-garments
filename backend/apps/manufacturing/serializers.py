from rest_framework import serializers
from .models import ManufacturingCapability, ManufacturingProcess, Certification, Testimonial


class ManufacturingCapabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ManufacturingCapability
        fields = ['id', 'title', 'slug', 'description', 'icon_name', 'image', 'order']


class ManufacturingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManufacturingProcess
        fields = ['id', 'step_number', 'title', 'description', 'icon_name']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'id', 'name', 'issuer', 'certificate_number',
            'issue_date', 'expiry_date', 'certificate_file', 'description',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'company', 'quote', 'order']