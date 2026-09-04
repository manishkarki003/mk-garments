from django.contrib import admin
from .models import Inquiry, InquiryAttachment


class InquiryAttachmentInline(admin.TabularInline):
    model = InquiryAttachment
    extra = 0
    readonly_fields = ('uploaded_at',)


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = (
        'company_name', 'full_name', 'work_email', 'country',
        'product_type', 'status', 'created_at'
    )
    list_filter = ('status', 'country', 'created_at')
    search_fields = ('company_name', 'full_name', 'work_email', 'product_type', 'message')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    inlines = [InquiryAttachmentInline]
    list_editable = ('status',)

    fieldsets = (
        ('Contact Info', {
            'fields': ('full_name', 'company_name', 'work_email', 'phone', 'country')
        }),
        ('Product Requirements', {
            'fields': (
                'product_type', 'estimated_quantity', 'fabric_preference',
                'customization_requirements', 'branding_requirements', 'target_delivery_date'
            )
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Sales Tracking', {
            'fields': ('status', 'internal_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    actions = ['mark_as_contacted', 'mark_as_qualified']

    @admin.action(description="Mark selected inquiries as Contacted")
    def mark_as_contacted(self, request, queryset):
        queryset.update(status='contacted')

    @admin.action(description="Mark selected inquiries as Qualified")
    def mark_as_qualified(self, request, queryset):
        queryset.update(status='qualified')