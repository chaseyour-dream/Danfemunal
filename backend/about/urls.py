from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AboutUsViewSet, HeroImageViewSet, LogoViewSet, LeadershipMessageViewSet, StatisticsViewSet

router = DefaultRouter()
router.register(r'about', AboutUsViewSet)
router.register(r'hero', HeroImageViewSet)
router.register(r'logo', LogoViewSet)
router.register(r'leadership', LeadershipMessageViewSet)
router.register(r'statistics', StatisticsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
