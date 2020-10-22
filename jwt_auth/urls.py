from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ProfileDetailView, ProfileFollowView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<int:pk>/', ProfileDetailView.as_view()),
    path('profile/<int:pk>/follows/', ProfileFollowView.as_view()),
    path('profile/', ProfileView.as_view())
]
