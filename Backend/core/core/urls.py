from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_auth.urls')),
    path('api/auth/registration/', include('rest_auth.registration.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/store/', include('store.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/user/', include('users.urls')),
    path('api/order/', include('order.urls')),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 