# pylint: disable=no-name-in-module, import-error
from comments.serializers.common import CommentSerializer
from ..serializers.common import PhotoSerializer

class PopulatedPhotoSerializer(PhotoSerializer):

    comments = CommentSerializer(many=True)
