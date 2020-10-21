# pylint: disable=no-name-in-module, import-error
from jwt_auth.serializers.nested import NestedUserSerializer
from comments.serializers.common import CommentSerializer
from photo_categories.serializers.common import PhotoCategorySerializer
from ..serializers.common import PhotoSerializer

class PopulatedPhotoSerializer(PhotoSerializer):

    comments = CommentSerializer(many=True)
    categories = PhotoCategorySerializer(many=True)
    owner = NestedUserSerializer()
    liked_by = NestedUserSerializer(many=True)
