from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"url": ("title",)}
    list_display = ("id", "title", "category", "get_image")
    list_display_links = ("id", "title")
    save_on_top = True
    save_as = True
    fields = ("title", "url", "category", "tags",
              "content", "author", "img", "get_image")
    readonly_fields = ("get_image",)
    list_filter = ("created_at", "category")
    search_fields = ("title",)

    def get_image(self, obj):
        if obj.img:
            return mark_safe(f'<img src="{obj.img.url}" width="50px" ></img>')
        else:
            return '-'
