from multiprocessing import context
import re
from django.shortcuts import render
from .forms import RecipeForm
from django.views import generic
from .models import Ingredient, Recipe
from django.http import HttpResponseRedirect
from django.urls import reverse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RecipeSerializer, IngredientSerializer, DirectionSerializer

from .models import Recipe, User
# Create your views here.

def image_upload_view(request):

    if request.method == "POST":
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save()
            return HttpResponseRedirect(reverse("mycookbook:list_view"))
    else:
        form = RecipeForm
    return render (request, 'mycookbook/index.html', {'form':form}) 

class list(generic.ListView):
    model = Recipe


## API VIEWS ##
@api_view(["GET","POST"])
def api_list(request):
    if request.method=="GET":
        data = Recipe.objects.all()

        serializer = RecipeSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method=="POST":
        print("POST recieved")
        print (request.data)
        serializer = RecipeSerializer(data=request.data, context={'request':request})
        print("Validating..")
        if serializer.is_valid():
            print("validated!")
            serializer.save()


            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print (serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET","PUT","DELETE"])
def api_detail(request, id):
    
    try:
        recipe = Recipe.objects.get(id=id)
    except Recipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method =="GET":
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = RecipeSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            ingredients = request.data.get("ingredients")
            print (ingredients)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def api_recents(request):
    
    if request.method == "GET":
        data = Recipe.objects.all()[:3]

        serializer = RecipeSerializer(data, many=True)

        return Response(serializer.data)


    
