import uuid
from django.db import models


class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('quotation_sent', 'Quotation Sent'),
        ('negotiation', 'Negotiation'),
        ('won', 'Won'),
        ('lost', 'Lost'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    full_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    work_email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=100, blank=True)

    product_type = models.CharField(max_length=255, blank=True)
    estimated_quantity = models.CharField(max_length=100, blank=True)
    fabric_preference = models.CharField(max_length=255, blank=True)
    customization_requirements = models.TextField(blank=True)
    branding_requirements = models.TextField(blank=True)
    target_delivery_date = models.DateField(null=True, blank=True)

    message = models.TextField(blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    internal_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"{self.company_name} — {self.full_name} ({self.get_status_display()})"


def inquiry_attachment_path(instance, filename):
    return f"inquiry-attachments/{instance.inquiry.id}/{filename}"


class InquiryAttachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to=inquiry_attachment_path)
    original_filename = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.original_filename or str(self.file.name)