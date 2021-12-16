from os import path
from django.conf import settings
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import User


@receiver(pre_delete, sender=User)
def delete_img_hook(sender, instance, using, **kwargs):
    if instance.img.path != path.join(settings.BASE_DIR, 'media\default_user.jpg'):
        instance.img.delete(save=False)
