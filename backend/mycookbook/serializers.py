from rest_framework import serializers
from .models import Ingredient, Recipe, User, Ingredient



class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('name',)

class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    ingredients = IngredientSerializer(many=True, required=False)
    class Meta:
        model = Recipe
        fields = (
            'id',
            'name',
            'owner',
            'image',
            'created_at',
            'ingredients',
            )


    def create(self, validated_data):
        print (validated_data)
        ingredient_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredient_data:
            print (ingredient_data)
            Ingredient.objects.create(recipe=recipe, name=ingredient_data.get("name"))
        return recipe