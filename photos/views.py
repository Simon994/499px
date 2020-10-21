# pylint: disable=no-name-in-module, import-error
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Photo
from .serializers.common import PhotoSerializer


class PhotoListView(APIView):
    def get(self, _request):
        photos_list = Photo.objects.all()
        serialized_photo_list = PhotoSerializer(photos_list, many=True)
        return Response(serialized_photo_list.data, status=status.HTTP_200_OK)


