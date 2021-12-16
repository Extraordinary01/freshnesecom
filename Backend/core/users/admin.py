from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, City
from django.utils.safestring import mark_safe

class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "is_staff", "get_image")
    fieldsets = (
        (None, {
            'fields': ("username", "password")
        }),
        ("Personal info", {
            'fields': ("first_name", "last_name", "email", "img", "city", "address", "phone", "wishlist")
        }),
        ("Permissions", {
            'fields': ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")
        }),
        ("Important dates", {
            'fields': ("last_login", "date_joined")
        })
    )

    def get_image(self, obj):
        if obj.img:
            return mark_safe(f'<img src="{obj.img.url}" width="50px" ></img>')
        else:
            return '-'
    
    get_image.short_description = 'image'


class CityAdmin(admin.ModelAdmin):
    prepopulated_fields = { "url": ("name",) }
    list_display = ("id", "name", "url")
    list_display_links = ("id", "name")

    class Meta:
        model = City
        fields = '__all__'


admin.site.register(User, CustomUserAdmin)
admin.site.register(City, CityAdmin)