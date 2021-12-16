from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone

class City(models.Model):
    name = models.CharField(max_length=50, unique=True)
    url = models.SlugField(max_length=55, unique=True)

    def __str__(self):
        return self.name
    
class UserManager(BaseUserManager):

    def _create_user(self, username, email, is_active, is_staff, is_superuser, password=None, **extra_fields):

        if not username:
            raise ValueError("User must enter the username!")

        if not email:
            raise ValueError("User must enter the email!")

        now = timezone.now()

        username = self.model.normalize_username(username)

        user = self.model(
            username = username,
            email = email,
            is_active = is_active,
            is_staff = is_staff,
            is_superuser = is_superuser,
            last_login = now,
            date_joined = now,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username=None, email=None, password=None, **extra_fields):
        return self._create_user(username, email, False, False, False, password, **extra_fields)

    def create_superuser(self, username=None, email=None, password=None, **extra_fields):
        user = self._create_user(username, email, True, True, True, password, **extra_fields)
        user.save(using=self._db)
        return user

class User(AbstractUser):
    img = models.ImageField(default='default_user.jpg',blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='users')
    address = models.CharField(max_length=150)
    phone = models.CharField(max_length=12, default="No number")
    wishlist = models.ManyToManyField('store.Product', blank=True, related_name='users')

    objects = UserManager()

    def get_image(self):
        if self.img:
            return f'<img src={self.img.url} width="50" height="50">'
        else:
            return '-'
    get_image.short_description = 'image'
    get_image.allow_tags = True

    def __unicode__(self):
        return self.username

    def __str__(self):
        return f'{self.username} Profile'

