from django.contrib import admin
from .models import ProductCategory, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text', 'order')


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'moq', 'is_active', 'order', 'updated_at')
    list_filter = ('is_active', 'category')
    search_fields = ('name', 'short_description', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProductImageInline]

    fieldsets = (
        ('Basic Info', {
            'fields': ('category', 'name', 'slug', 'short_description', 'description', 'is_active', 'order')
        }),
        ('Manufacturing Details', {
            'fields': ('fabric_options', 'customization_options', 'branding_options', 'available_colors', 'moq')
        }),
        ('SEO', {
            'fields': ('seo_title', 'seo_description'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )