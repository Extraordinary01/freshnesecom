from django.db import models
from store.models import Category, Tag
from ckeditor_uploader.fields import RichTextUploadingField
from django.contrib.auth import get_user_model
from os import path
from django.conf import settings
from PIL import Image

User = get_user_model()


class Post(models.Model):
    title = models.CharField(max_length=150)
    url = models.SlugField(max_length=160, unique=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts')
    content = RichTextUploadingField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    img = models.ImageField(
        upload_to="img/%Y/%m/%d/posts", default='default.jpg')
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_image(self):
        if self.img:
            return f'<img src={self.img.url} width="50" height="50">'
        else:
            return '-'

    def save(self):
        try:
            obj = Post.objects.get(url=self.url)
            if obj.img != self.img and obj.img.path != path.join(settings.BASE_DIR, 'media\default.jpg'):
                obj.img.delete()
        except:
            pass
        super().save()
        image = Image.open(self.img.path)
        output_size = (600, 455)
        image = image.resize(output_size)
        image.save(self.img.path)

    class Meta:
        ordering = ['-created_at', '-id']
