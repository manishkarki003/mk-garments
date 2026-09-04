import uuid
from django.db import models
from django.utils.text import slugify


class ManufacturingCapability(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon_name = models.CharField(
        max_length=50, blank=True,
        help_text="Lucide icon name, e.g. 'scissors', 'shirt'"
    )
    image = models.ImageField(upload_to='manufacturing/capabilities/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Manufacturing Capabilities"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ManufacturingProcess(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['step_number']
        verbose_name_plural = "Manufacturing Process Steps"

    def __str__(self):
        return f"{self.step_number:02d}. {self.title}"


class Certification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255, blank=True)
    certificate_number = models.CharField(max_length=100, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    certificate_file = models.FileField(
        upload_to='certifications/', blank=True, null=True,
        help_text="Image or PDF of the certificate"
    )
    description = models.TextField(blank=True)
    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-issue_date']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    quote = models.TextField()
    is_published = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.author_name} — {self.company or 'N/A'}"