# pylint: disable=no-name-in-module, import-error
from photos.serializers.common import PhotoSerializer
from comments.serializers.common import CommentSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    created_photo = PhotoSerializer(many=True)
    posted_comments = CommentSerializer(many=True)
    liked_photos = PhotoSerializer(many=True)
