from django.urls import path
from .views import CompanyProfileView, ContactMessageCreateView

urlpatterns = [
    path('company/', CompanyProfileView.as_view(), name='company-profile'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
]