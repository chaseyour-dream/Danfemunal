from django.contrib import admin
from .models import AboutUs, HeroImage, Logo, LeadershipMessage, Statistics

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_active']

@admin.register(HeroImage)
class HeroImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title']
    list_editable = ['is_active']

@admin.register(Logo)
class LogoAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title']
    list_editable = ['is_active']

@admin.register(LeadershipMessage)
class LeadershipMessageAdmin(admin.ModelAdmin):
    list_display = ['role', 'name', 'is_active', 'created_at']
    list_filter = ['role', 'is_active', 'created_at']
    search_fields = ['name', 'message_english', 'message_nepali']
    list_editable = ['is_active']

@admin.register(Statistics)
class StatisticsAdmin(admin.ModelAdmin):
    list_display = ['total_business', 'total_products', 'total_categories', 'total_customers', 'is_active', 'updated_at']
    list_filter = ['is_active']
    
    fieldsets = (
        ('Business Statistics', {
            'fields': ('total_business', 'total_products', 'total_categories', 'total_customers')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
