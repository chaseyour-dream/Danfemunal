from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TickerMessageViewSet

router = DefaultRouter()
router.register(r'', TickerMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
