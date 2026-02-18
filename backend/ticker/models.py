from django.db import models


class TickerMessage(models.Model):
    message = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Ticker Message'
        verbose_name_plural = 'Ticker Messages'
    
    def __str__(self):
        return self.message[:50]
