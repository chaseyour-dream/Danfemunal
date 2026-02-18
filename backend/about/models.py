from django.db import models

class AboutUs(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'About Us'
        verbose_name_plural = 'About Us'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class HeroImage(models.Model):
    title = models.CharField(max_length=200, default='Hero Image')
    image = models.ImageField(upload_to='hero/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Hero Image'
        verbose_name_plural = 'Hero Images'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Logo(models.Model):
    title = models.CharField(max_length=200, default='Site Logo')
    image = models.ImageField(upload_to='logo/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Logo'
        verbose_name_plural = 'Logos'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class LeadershipMessage(models.Model):
    ROLE_CHOICES = [
        ('ceo', 'CEO'),
        ('md', 'Managing Director'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, unique=True)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='leadership/')
    message_english = models.TextField()
    message_nepali = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Leadership Message'
        verbose_name_plural = 'Leadership Messages'
        ordering = ['role']

    def __str__(self):
        return f"{self.get_role_display()} - {self.name}"

class Statistics(models.Model):
    total_business = models.IntegerField(default=4, help_text='Total years in business')
    total_products = models.IntegerField(default=4, help_text='Total number of products')
    total_categories = models.IntegerField(default=4, help_text='Total product categories')
    total_customers = models.IntegerField(default=400, help_text='Total satisfied customers')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Statistics'
        verbose_name_plural = 'Statistics'

    def __str__(self):
        return f"Statistics (Updated: {self.updated_at.strftime('%Y-%m-%d')})"
