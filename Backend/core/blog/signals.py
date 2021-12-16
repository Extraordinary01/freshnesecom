from os import path
from django.conf import settings
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Post


@receiver(pre_delete, sender=Post)
def delete_img_hook(sender, instance, using, **kwargs):
    if instance.img.path != path.join(settings.BASE_DIR, 'media\default.jpg'):
        print(instance.img.path)
        instance.img.delete(save=False)
