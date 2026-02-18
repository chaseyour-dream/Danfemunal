from django.contrib import admin
from .models import TickerMessage


@admin.register(TickerMessage)
class TickerMessageAdmin(admin.ModelAdmin):
    list_display = ['message', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['message']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        ('Message', {
            'fields': ('message', 'order')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
