from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AboutUs, HeroImage, Logo, LeadershipMessage, Statistics
from .serializers import AboutUsSerializer, HeroImageSerializer, LogoSerializer, LeadershipMessageSerializer, StatisticsSerializer

class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutUs.objects.filter(is_active=True)
    serializer_class = AboutUsSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        about = AboutUs.objects.filter(is_active=True).first()
        if about:
            serializer = self.get_serializer(about)
            return Response(serializer.data)
        return Response({'detail': 'No active about us content found'}, status=404)

class HeroImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroImage.objects.filter(is_active=True)
    serializer_class = HeroImageSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        hero = HeroImage.objects.filter(is_active=True).first()
        if hero:
            serializer = self.get_serializer(hero)
            return Response(serializer.data)
        return Response({'detail': 'No active hero image found'}, status=404)

class LogoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logo.objects.filter(is_active=True)
    serializer_class = LogoSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        logo = Logo.objects.filter(is_active=True).first()
        if logo:
            serializer = self.get_serializer(logo)
            return Response(serializer.data)
        return Response({'detail': 'No active logo found'}, status=404)

class LeadershipMessageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadershipMessage.objects.filter(is_active=True)
    serializer_class = LeadershipMessageSerializer

class StatisticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Statistics.objects.filter(is_active=True)
    serializer_class = StatisticsSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        stats = Statistics.objects.filter(is_active=True).first()
        if stats:
            serializer = self.get_serializer(stats)
            return Response(serializer.data)
        return Response({'detail': 'No active statistics found'}, status=404)
