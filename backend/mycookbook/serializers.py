from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Ingredient, Recipe, User, Ingredient, Direction





class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('name', 'amount','recipe')

class DirectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Direction
        fields = ('content','recipe')



class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    ingredients = IngredientSerializer(many=True, required=True)
    directions = DirectionSerializer(many=True, required=True)
    class Meta:
        model = Recipe
        fields = (
            'id',
            'name',
            'owner',
            'image',
            'description',
            'created_at',
            'ingredients',
            'directions',
            )


    def create(self, validated_data):
        print ("Validated Data...", validated_data)

        print("context", self.context['request'].data)

        has_ingredients = validated_data.get("ingredients")
        has_directions = validated_data.get("directions")

        if has_ingredients:
            ingredient_data = validated_data.pop('ingredients')
        if has_directions:
            direction_data = validated_data.pop('directions')

        recipe_name = validated_data.get('name')
        recipe_name = recipe_name.replace('"','')

        recipe_description = validated_data.get('description')
        recipe_description = recipe_description.replace('"','')


        recipe = Recipe.objects.create(name=recipe_name, description=recipe_description, image=validated_data.get('image'))
        
        if has_ingredients:
            for ingredient in ingredient_data:
                ingredient_name = ingredient.get("name")
                ingredient_name = ingredient_name.replace('"','')

                ingredient_amount = ingredient.get("amount")
                ingredient_amount = ingredient_amount.replace('"','')
                Ingredient.objects.create(recipe=recipe, name=ingredient_name, amount=ingredient_amount)

        if has_directions:
            for direction in direction_data:
                direction_content = direction.get("content")
                direction_content = direction_content.replace('"','')
                Direction.objects.create(recipe=recipe, content=direction_content)
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
