from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from PIL import Image
from os import path
from django.conf import settings
from users.models import User

class Category(models.Model):
    name = models.CharField(max_length=150)
    url = models.SlugField(max_length=170)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id', ]
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class DeliveryForm(models.Model):
    name = models.CharField(max_length=50)
    short = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50)
    url = models.SlugField(max_length=60)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100)
    url = models.SlugField(max_length=110)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150)
    url = models.SlugField(max_length=165)
    desc = models.CharField(verbose_name='Short description', max_length=250)
    description = RichTextUploadingField()
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products')
    tags = models.ManyToManyField(Tag, related_name='products')
    brand = models.ForeignKey(
        Brand, on_delete=models.CASCADE, related_name='products')
    img = models.ImageField(verbose_name='Image',
                            upload_to="img/%Y/%m/%d", default="default.jpg")
    sku = models.CharField(max_length=30, unique=True)
    stock = models.PositiveIntegerField(default=0)
    date = models.DateField(auto_now=False, auto_now_add=False)
    buyby = models.ManyToManyField(DeliveryForm, verbose_name='Buy by')
    delivery_date = models.PositiveSmallIntegerField(default=0)
    delivery_from = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    is_sale = models.BooleanField(default=False)
    old_price = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)
    shipping = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    bought = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def get_image(self):
        if self.img:
            return f'<img src={self.img.url} width="50" height="50">'
        else:
            return '-'

    get_image.short_description = 'image'
    get_image.allow_tags = True

    def save(self):
        try:
            obj = Product.objects.get(url=self.url)
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
        ordering = ['-date', '-id']

class Rating(models.Model):
    rating = models.PositiveSmallIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')

    def __str__(self):
        return f'{self.user} - {self.product} - {self.rating}'

class Review(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}'s review on {self.product}"
    
class Question(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} leave question on {self.product}"