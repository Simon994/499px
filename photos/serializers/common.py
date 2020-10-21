# pylint: disable=no-name-in-module, import-error
from rest_framework import serializers
from ..models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
