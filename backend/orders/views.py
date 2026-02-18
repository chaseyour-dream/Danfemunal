from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import PaymentQR, Order
from .serializers import PaymentQRSerializer, OrderSerializer


class PaymentQRViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentQR.objects.filter(is_active=True)
    serializer_class = PaymentQRSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        qr = self.queryset.first()
        if qr:
            serializer = self.get_serializer(qr)
            return Response(serializer.data)
        return Response({'error': 'No active QR code found'}, status=status.HTTP_404_NOT_FOUND)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
