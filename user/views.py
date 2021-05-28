from .models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from score.models import Score
from score.serializers import ScoreSerializer

def getUser(field, value):
  try:
    if 'name' == field:
      return User.objects.get(name = value)
    else:
      return User.objects.get(id = value)
  except User.DoesNotExist:
    return None

def custom_exception_handler(ex, context):
  codes = ex.get_codes()

  if 'name' in codes and 'unique' in codes['name']:
    user = getUser('name', context['name'])
    serializer = UserSerializer(user)

    return Response(serializer.data, status = status.HTTP_200_OK)

  response = exception_handler(ex, None)

  return response

class UserView(APIView):

  def post(self, req):
    user = { 'name': req.data.get('name') }
    serializer = UserSerializer(data = user)

    try:
      serializer.is_valid(raise_exception = True)
      serializer.save()

      return Response(serializer.data, status = status.HTTP_201_CREATED)
    except Exception as ex:
      return custom_exception_handler(ex, serializer.data)

    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):

  def get(self, req, userId):

    if '/scores' in req.path:
      return self.getUserScores(userId)
    else:
      return self.getUserInfo(userId)

  def getUserInfo(self, userId):
    user = getUser('id', userId)

    if not user:
      return Response({}, status = status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user)

    return Response(serializer.data, status = status.HTTP_200_OK)

  def getUserScores(self, userId):
    scores = Score.objects.filter(user = userId)
    serializer = ScoreSerializer(scores, many = True)

    return Response(serializer.data, status = status.HTTP_200_OK)