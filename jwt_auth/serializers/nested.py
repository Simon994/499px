from rest_framework import serializers
from django.contrib.auth import get_user_model
# pylint: disable=no-name-in-module, import-error
from photos.serializers.common import PhotoSerializer

User = get_user_model()
class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class NestedPublicUserSerializer(serializers.ModelSerializer):
    created_photo = PhotoSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image', 'created_photo')
