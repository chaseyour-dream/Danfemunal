from rest_framework import serializers
from .models import TickerMessage


class TickerMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TickerMessage
        fields = ['id', 'message', 'order']
