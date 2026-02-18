from rest_framework import viewsets
from .models import TickerMessage
from .serializers import TickerMessageSerializer


class TickerMessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TickerMessage.objects.filter(is_active=True)
    serializer_class = TickerMessageSerializer
