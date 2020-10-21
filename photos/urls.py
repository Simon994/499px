from django.urls import path
from .views import PhotoListView, PhotoDetailView, PhotoLikeView

urlpatterns = [
    path('', PhotoListView.as_view()),
    path('<int:pk>/', PhotoDetailView.as_view()),
    path('<int:pk>/likes/', PhotoLikeView.as_view())
]
