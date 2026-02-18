from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactInquiryViewSet

router = DefaultRouter()
router.register(r'', ContactInquiryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
