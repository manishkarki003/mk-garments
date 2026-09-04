from rest_framework import serializers
from .models import CompanyProfile, SocialLink, ContactMessage


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'icon_name', 'order']


class CompanyProfileSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfile
        fields = [
            'id', 'company_name', 'tagline', 'address', 'phone',
            'whatsapp_number', 'email', 'business_hours',
            'google_maps_embed_url', 'default_seo_title',
            'default_seo_description', 'social_links',
        ]

    def get_social_links(self, obj):
        links = SocialLink.objects.filter(is_active=True).order_by('order')
        return SocialLinkSerializer(links, many=True).data


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message']
        # created_at, is_read excluded — internal-only, not settable by public