import uuid
from django.db import models


class CompanyProfile(models.Model):
    """
    Singleton model — only one row should ever exist.
    Holds all centrally-configurable company information.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    company_name = models.CharField(max_length=255, default="MK Garments")
    tagline = models.CharField(max_length=255, blank=True)

    address = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    whatsapp_number = models.CharField(
        max_length=50, blank=True,
        help_text="Include country code, digits only, e.g. 9779800000000"
    )
    email = models.EmailField(blank=True)

    business_hours = models.CharField(max_length=255, blank=True)
    google_maps_embed_url = models.URLField(blank=True)

    default_seo_title = models.CharField(max_length=255, blank=True)
    default_seo_description = models.CharField(max_length=500, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Company Profile"
        verbose_name_plural = "Company Profile"

    def __str__(self):
        return self.company_name

    def save(self, *args, **kwargs):
        # Enforce singleton: always overwrite the first row
        self.pk = CompanyProfile.objects.first().pk if CompanyProfile.objects.exists() and not self.pk else self.pk
        super().save(*args, **kwargs)


class SocialLink(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    platform = models.CharField(max_length=50)
    url = models.URLField()
    icon_name = models.CharField(
        max_length=50, blank=True,
        help_text="Lucide icon name, e.g. 'linkedin', 'facebook'"
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.platform


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject or 'No subject'}"