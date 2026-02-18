from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/services/', include('services.urls')),
    path('api/team/', include('team.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/', include('about.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/events/', include('events.urls')),
    path('api/ticker/', include('ticker.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Custom error handlers
handler404 = 'django.views.defaults.page_not_found'
handler500 = 'django.views.defaults.server_error'
