from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Score
from .serializers import ScoreSerializer

class ScoreView(APIView):

  def post(self, req):
    score = {
      'user': req.data.get('userId'),
      'win': req.data.get('win'),
      'time': req.data.get('time'),
    }
    serializer = ScoreSerializer(data = score)

    if serializer.is_valid():
      serializer.save()

      return Response(serializer.data, status = status.HTTP_201_CREATED)

    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
