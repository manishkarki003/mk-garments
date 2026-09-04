from django.contrib import admin
from .models import GalleryCategory, GalleryImage


@admin.register(GalleryCategory)
class GalleryCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order',)


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('alt_text', 'category', 'order', 'is_published', 'created_at')
    list_filter = ('is_published', 'category')
    search_fields = ('alt_text', 'caption')
    ordering = ('order', '-created_at')