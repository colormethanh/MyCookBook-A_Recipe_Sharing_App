from rest_framework import serializers
from .models import Ingredient, Recipe, User, Ingredient, Direction



class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('name',)

class DirectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Direction
        fields = ('content',)


class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    ingredients = IngredientSerializer(many=True, required=False)
    directions = DirectionSerializer(many=True, required=False)
    class Meta:
        model = Recipe
        fields = (
            'id',
            'name',
            'owner',
            'image',
            'created_at',
            'ingredients',
            'directions',
            )


    def create(self, validated_data):
        print (validated_data)

        has_ingredients = validated_data.get("ingredients")
        has_directions = validated_data.get("directions")

        if has_ingredients:
            ingredient_data = validated_data.pop('ingredients')
        if has_directions:
            direction_data = validated_data.pop('directions')

        recipe = Recipe.objects.create(**validated_data)
        
        if has_ingredients:
            for ingredient in ingredient_data:
                Ingredient.objects.create(recipe=recipe, name=ingredient.get("name"))
        if has_directions:
            for direction in direction_data:
                Direction.objects.create(recipe=recipe, content=direction.get("content"))
        return recipe
    
    def update(self, instance, validated_data):

        recipe = instance

        if validated_data.get("ingredients") != None:
            prev_ingredients = Ingredient.objects.filter(recipe=recipe).all()
            prev_ingredients.delete()
            
            new_ingredients = validated_data.pop("ingredients")
            [Ingredient.objects.create(recipe=recipe, name=ingredient['name']) for ingredient in new_ingredients]
        
        if validated_data.get("directions") != None:
            prev_directions = Direction.objects.filter(recipe=recipe).all()
            prev_directions.delete()

            new_directions = validated_data.pop("directions")
            [Direction.objects.create(recipe=recipe, content=direction['content']) for direction in new_directions]
        
        
        super(RecipeSerializer, self).update(instance, validated_data)

        return instance
