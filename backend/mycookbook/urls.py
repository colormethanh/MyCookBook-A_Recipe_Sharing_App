from django.contrib import admin
from django.urls import path, include
from .views import api_detail, api_list, api_recents, image_upload_view, list

app_name = "mycookbook"
urlpatterns = [
    path('', image_upload_view, name="create_view" ),
    path('list/', list.as_view(), name="list_view"),
    path('api/', api_list, name="api_list_view" ),
    path('api/<int:id>', api_detail, name="api_detail_view"),
    path('api/recents', api_recents, name="api_recents_view"),
]