# pylint: disable=no-name-in-module, import-error
from comments.serializers.common import CommentSerializer
from photo_categories.serializers.common import PhotoCategorySerializer
from ..serializers.common import PhotoSerializer

class PopulatedPhotoSerializer(PhotoSerializer):

    comments = CommentSerializer(many=True)
    categories = PhotoCategorySerializer(many=True)
