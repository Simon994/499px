# pylint: disable=no-name-in-module, import-error
from django.urls import path
from .views import PhotoListView

urlpatterns = [
    path('', PhotoListView.as_view())
]
