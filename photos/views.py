from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Photo
from .serializers.common import PhotoSerializer
from .serializers.populated import PopulatedPhotoSerializer


class PhotoListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        photos_list = Photo.objects.all()
        serialized_photo_list = PopulatedPhotoSerializer(photos_list, many=True)
        return Response(serialized_photo_list.data, status=status.HTTP_200_OK)

    def post(self, request):
        photo_to_create = PhotoSerializer(data=request.data)
        if photo_to_create.is_valid():
            photo_to_create.save()
            return Response(photo_to_create.data, status=status.HTTP_201_CREATED)
        return Response(photo_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PhotoDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_photo(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        photo = self.get_photo(pk=pk)
        serialized_single_photo = PopulatedPhotoSerializer(photo)
        return Response(serialized_single_photo.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        photo_to_update = self.get_photo(pk=pk)
        updated_photo = PhotoSerializer(photo_to_update, data=request.data)
        if updated_photo.is_valid():
            updated_photo.save()
            return Response(updated_photo.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_photo.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        photo_to_delete = self.get_photo(pk=pk)
        photo_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
