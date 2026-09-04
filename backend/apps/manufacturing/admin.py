from django.contrib import admin
from .models import ManufacturingCapability, ManufacturingProcess, Certification, Testimonial


@admin.register(ManufacturingCapability)
class ManufacturingCapabilityAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)


@admin.register(ManufacturingProcess)
class ManufacturingProcessAdmin(admin.ModelAdmin):
    list_display = ('step_number', 'title', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    ordering = ('step_number',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'issue_date', 'expiry_date', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('name', 'issuer', 'certificate_number')
    readonly_fields = ('created_at',)
    ordering = ('-issue_date',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'company', 'is_published', 'order')
    list_filter = ('is_published',)
    search_fields = ('author_name', 'company', 'quote')
    ordering = ('order',)