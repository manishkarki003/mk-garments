from django.contrib import admin
from .models import CaseStudy, CaseStudyImage, BlogPost


class CaseStudyImageInline(admin.TabularInline):
    model = CaseStudyImage
    extra = 1
    fields = ('image', 'caption', 'order')


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'industry', 'client_name', 'is_published', 'order')
    list_filter = ('is_published', 'industry')
    search_fields = ('title', 'product_type', 'industry', 'client_name')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('order', '-created_at')
    inlines = [CaseStudyImageInline]

    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'slug', 'product_type', 'industry', 'client_name', 'cover_image', 'is_published', 'order')
        }),
        ('Case Study Content', {
            'fields': ('challenge', 'solution', 'process', 'result')
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


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_at', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('title', 'excerpt', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-published_at',)

    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image', 'author', 'published_at', 'is_published')
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