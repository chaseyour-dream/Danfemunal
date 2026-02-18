from rest_framework import serializers
from .models import AboutUs, HeroImage, Logo, LeadershipMessage, Statistics

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['id', 'title', 'description', 'image', 'is_active', 'created_at']

class HeroImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroImage
        fields = ['id', 'title', 'image', 'is_active', 'created_at']

class LogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logo
        fields = ['id', 'title', 'image', 'is_active', 'created_at']

class LeadershipMessageSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    
    class Meta:
        model = LeadershipMessage
        fields = ['id', 'role', 'role_display', 'name', 'image', 'message_english', 'message_nepali', 'is_active', 'created_at']

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = ['id', 'total_business', 'total_products', 'total_categories', 'total_customers', 'updated_at']
