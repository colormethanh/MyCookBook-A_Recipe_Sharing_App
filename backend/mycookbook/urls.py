from django.contrib import admin
from django.urls import path, include
from .views import api_detail, api_ingredient, api_direction, api_list, api_recents, image_upload_view, list, MyTokenObtainPairView, RegisterView, getRoutes, testEndPoint

from rest_framework_simplejwt.views import (TokenRefreshView)

app_name = "mycookbook"
urlpatterns = [
    path('', image_upload_view, name="create_view" ),
    path('list/', list.as_view(), name="list_view"),
    path('api/', api_list, name="api_list_view" ),
    path('api/<int:id>', api_detail, name="api_detail_view"),
    path('api/ingredient/',api_ingredient, name="api_ingredient_view"),
    path('api/direction/', api_direction, name="api_direction_view"),
    path('api/recents', api_recents, name="api_recents_view"),
    path('api/token', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/register', RegisterView.as_view(), name="auth_register"),
    path('api/routed', getRoutes),
    path('api/test', testEndPoint, name="test"),
]