from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.company.urls')),
    path('api/v1/', include('apps.products.urls')),
    path('api/v1/', include('apps.manufacturing.urls')),
    path('api/v1/', include('apps.content.urls')),
    path('api/v1/', include('apps.gallery.urls')),
    path('api/v1/', include('apps.inquiries.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)