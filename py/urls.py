from django.urls import include, path, re_path
from quick_color.views import index

urlpatterns = [
  path('api/users', include('user.urls')),
  path('api/scores', include('score.urls')),
  re_path(r'', index),
]
