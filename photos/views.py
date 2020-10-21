# pylint: disable=no-name-in-module, import-error
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import Photo
from .serializers.common import PhotoSerializer


class PhotoListView(APIView):
    def get(self, _request):
        photos_list = Photo.objects.all()
        serialized_photo_list = PhotoSerializer(photos_list, many=True)
        return Response(serialized_photo_list.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        photo_to_create = PhotoSerializer(data=request.data)
        if photo_to_create.is_valid():
            photo_to_create.save()
            return Response(photo_to_create.data, status=status.HTTP_201_CREATED)
        return Response(photo_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PhotoDetailView(APIView):

    def get_photo(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        photo = self.get_photo(pk=pk)
        serialized_single_photo = PhotoSerializer(photo)
        return Response(serialized_single_photo.data, status=status.HTTP_200_OK)
