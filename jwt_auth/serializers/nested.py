from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()
class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class NestedPublicUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image', 'created_photo')
