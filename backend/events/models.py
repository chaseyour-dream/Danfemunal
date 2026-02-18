from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    description_nepali = models.TextField(blank=True, help_text="Description in Nepali")
    image = models.ImageField(upload_to='events/')
    event_date = models.DateField()
    location = models.CharField(max_length=300, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-event_date', '-created_at']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
    def __str__(self):
        return self.title
