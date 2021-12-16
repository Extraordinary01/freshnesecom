from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import *


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"url": ("name", )}
    list_display = ("id", "name", "url")
    list_display_links = ("id", "name")

    class Meta:
        model = Category
        fields = '__all__'


@admin.register(DeliveryForm)
class DeliveryFormAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "short")
    list_display_links = ("id", "name")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {"url": ("name", )}
    list_display = ("id", "name", "url")
    list_display_links = ("id", "name")


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    prepopulated_fields = {"url": ("name",)}
    list_display = ("id", "name", "url")
    list_display_links = ("id", "name")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    save_on_top = True
    save_as = True
    prepopulated_fields = {"url": ("name", )}
    list_display = ("id", "name", "category", "stock",
                    "price", "is_sale", "old_price", "shipping", "bought", "get_image")
    list_display_links = ("id", "name")
    readonly_fields = ("bought", "get_image")
    search_fields = ("name",)
    list_editable = ("price", "is_sale", "old_price", "shipping")
    list_filter = ("category", "tags", "brand", "is_sale")

    def get_image(self, obj):
        if obj.img:
            return mark_safe(f'<img src="{obj.img.url}" width="50px" ></img>')
        else:
            return '-'

admin.site.register(Rating)
admin.site.register(Review)
