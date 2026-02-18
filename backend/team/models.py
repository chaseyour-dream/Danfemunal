from django.db import models


class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('shareholder', 'Shareholder'),
        ('board_member', 'Board Member'),
    ]
    
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    position = models.CharField(max_length=200, help_text='e.g., Chairman, Director, etc.')
    photo = models.ImageField(upload_to='team/')
    bio = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['role', 'order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"
