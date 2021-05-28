from django.urls import path
from .views import UserView, UserDetailView

urlpatterns = [
  path('', UserView.as_view()),
  path('/<int:userId>', UserDetailView.as_view()),
  path('/<int:userId>/scores', UserDetailView.as_view()),
]