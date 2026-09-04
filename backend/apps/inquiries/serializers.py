from rest_framework import serializers
from .models import Inquiry, InquiryAttachment


class InquiryAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = InquiryAttachment
        fields = ['id', 'file', 'original_filename']


class InquiryCreateSerializer(serializers.ModelSerializer):
    attachments = serializers.ListField(
        child=serializers.FileField(), write_only=True, required=False
    )

    class Meta:
        model = Inquiry
        fields = [
            'id', 'full_name', 'company_name', 'work_email', 'phone', 'country',
            'product_type', 'estimated_quantity', 'fabric_preference',
            'customization_requirements', 'branding_requirements',
            'target_delivery_date', 'message', 'attachments',
        ]
        # status, internal_notes deliberately excluded — internal-only fields

    def validate_attachments(self, files):
        allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.ai', '.eps', '.doc', '.docx']
        max_size_mb = 10
        for f in files:
            ext = '.' + f.name.rsplit('.', 1)[-1].lower() if '.' in f.name else ''
            if ext not in allowed_extensions:
                raise serializers.ValidationError(
                    f"File type '{ext}' not allowed. Allowed: {', '.join(allowed_extensions)}"
                )
            if f.size > max_size_mb * 1024 * 1024:
                raise serializers.ValidationError(
                    f"File '{f.name}' exceeds the {max_size_mb}MB limit."
                )
        return files

    def create(self, validated_data):
        attachments = validated_data.pop('attachments', [])
        inquiry = Inquiry.objects.create(**validated_data)
        for f in attachments:
            InquiryAttachment.objects.create(
                inquiry=inquiry, file=f, original_filename=f.name
            )
        return inquiry