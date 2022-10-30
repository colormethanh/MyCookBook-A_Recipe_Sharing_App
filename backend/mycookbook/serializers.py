from asyncore import write
from wsgiref.validate import validator
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Ingredient, Recipe, User, Ingredient, Direction


def strip_quotes(data):
    '''
    Function to strip the quotes off of request data
    '''
    data=data.replace('"','')
    return data

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("retreiving token")
        token['username'] = user.username
        token['email'] = user.email

        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username','password','password2')
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"password fields didn't match"}
            )
        return attrs
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'amount','id','recipe')
    
    def create(self, validated_data):
        print("validated data...", validated_data)
        
        recipe = validated_data.get('recipe')
        name = validated_data.get('name')
        amount = validated_data.get('amount')
        ingredient = Ingredient.objects.create(name=name, amount=amount, recipe=recipe)
        return ingredient

    def update(self, instance, validated_data):

        instance.name = strip_quotes(validated_data.get('name'))
        instance.amount = strip_quotes(validated_data.get('amount'))
        instance.save()
        return instance

class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ('content', 'id', 'recipe')

    def create(self, validated_data):
        print("validated data...", validated_data)

        recipe = validated_data.get('recipe')
        content = strip_quotes(validated_data.get('content'))

        direction = Direction.objects.create(content=content, recipe=recipe)
        return direction

    def update(self, instance, validated_data):
        instance.content = strip_quotes(validated_data.get('content'))
        instance.save()
        return instance



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

        ingredient_data = validated_data.pop('ingredients')

        direction_data = validated_data.pop('directions')

        recipe_name = strip_quotes(validated_data.get('name'))

        recipe_description = strip_quotes(validated_data.get('description'))
        
        rqst  = self.context.get('rqst') #Validated data missing owner so I decided to pass owner through context
        print(rqst['owner'])

        owner = strip_quotes(rqst['owner'])
        owner = User.objects.get(username=owner)
        

        recipe = Recipe.objects.create(name=recipe_name, description=recipe_description, image=validated_data.get('image'), owner=owner)
        

        for ingredient in ingredient_data:
            ingredient_name = strip_quotes(ingredient.get("name"))
            ingredient_amount = strip_quotes(ingredient.get("amount"))

            Ingredient.objects.create(recipe=recipe, name=ingredient_name, amount=ingredient_amount)


        for direction in direction_data:
            direction_content = strip_quotes(direction.get("content"))

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
