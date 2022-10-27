import re
from django.shortcuts import render
from .forms import RecipeForm
from django.views import generic
from .models import Direction, Ingredient, Recipe
from django.http import HttpResponseRedirect,JsonResponse
from django.urls import reverse

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import DirectionSerializer, IngredientSerializer, RecipeSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated


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


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def testEndPoint(request):

    if request.method == "GET":
        data = f"Congratulations {request.user}, your API just responded to GET request"
        return Response({'response':data}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get('text')
        data = f"Congratulations your API just responded to POST request with text: {text}"
        return Response({'response':data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]

    return Response(routes)


@api_view(["GET","POST"])
def api_list(request):
    if request.method=="GET":
        data = Recipe.objects.all()

        serializer = RecipeSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method=="POST":
        print("POST recieved")
        print (request.data)
        context={'rqst':request.data}
        serializer = RecipeSerializer(data=request.data, context=context)
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

@api_view(["POST","PUT"])
def api_ingredient(request):
    print(request.data)
    
    if request.method == "POST":
        serializer = IngredientSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "PUT":
        try:
            ingredient = Ingredient.objects.get(pk=request.data['id'])
        except:
            return Response(statues=status.HTTP_404_NOT_FOUND)

        serializer = IngredientSerializer(ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST','PUT'])
def api_direction(request):

    if request.method == "POST":
        serializer = DirectionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    if request.method == "PUT":
        try:
            direction = Direction.objects.get(pk=request.data['id'])
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        serializer = DirectionSerializer(direction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
