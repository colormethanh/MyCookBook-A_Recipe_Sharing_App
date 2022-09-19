from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

class Recipe(models.Model):
    name = models.CharField(max_length=250, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='recipes', blank=True, null=True)
    ## Add description section  ##

class Ingredient(models.Model):
    name = models.CharField(max_length=125)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredients")
    ## ADD Quantity and Standard measurements later ##

class Direction(models.Model):
    content = models.CharField(max_length=250)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="directions")

