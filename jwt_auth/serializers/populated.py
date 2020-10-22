# pylint: disable=no-name-in-module, import-error
from rest_framework import serializers
from django.contrib.auth import get_user_model

from photos.serializers.populated import PopulatedPhotoSerializer
from comments.serializers.common import CommentSerializer
from ..serializers.common import UserSerializer
from ..serializers.nested import NestedUserSerializer, NestedPublicUserSerializer


class PopulatedUserSerializer(UserSerializer):

    created_photo = PopulatedPhotoSerializer(many=True)
    posted_comments = CommentSerializer(many=True)
    liked_photos = PopulatedPhotoSerializer(many=True)
    followed_by = NestedUserSerializer(many=True)
    following = NestedPublicUserSerializer(many=True)


User = get_user_model()

class PopulatedPublicUserSerializer(serializers.ModelSerializer):
    created_photo = PopulatedPhotoSerializer(many=True)
    followed_by = NestedUserSerializer(many=True)
    following = NestedPublicUserSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'created_photo', 'first_name', 'last_name', 'followed_by', 'following')


# class PopulatedPublicUserSerializer(PrePublicUserSerializer):

#     created_photo = PopulatedPhotoSerializer(many=True)
