from django.contrib import admin
from .models import Direction, Recipe, User, Ingredient, Direction

admin.site.register(Recipe)
admin.site.register(User)
admin.site.register(Ingredient)
admin.site.register(Direction)