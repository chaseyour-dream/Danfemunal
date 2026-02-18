from django.contrib import admin
from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'position', 'order', 'is_active', 'created_at']
    list_filter = ['role', 'is_active']
    search_fields = ['name', 'position']
    list_editable = ['order', 'is_active']
