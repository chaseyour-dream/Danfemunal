from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_date', 'location', 'is_active', 'created_at']
    list_filter = ['is_active', 'event_date']
    search_fields = ['title', 'description', 'description_nepali', 'location']
    date_hierarchy = 'event_date'
    list_editable = ['is_active']
    
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'description', 'description_nepali', 'image', 'event_date', 'location')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
