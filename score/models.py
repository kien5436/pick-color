from django.db import models
from user.models import User

class Score(models.Model):

  win = models.BooleanField()
  time = models.PositiveSmallIntegerField()
  user = models.ForeignKey(User, on_delete = models.CASCADE)