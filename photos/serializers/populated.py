# pylint: disable=no-name-in-module, import-error
from jwt_auth.serializers.nested import NestedUserSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from photo_categories.serializers.common import PhotoCategorySerializer
from ..serializers.common import PhotoSerializer

class PopulatedPhotoSerializer(PhotoSerializer):

    comments = PopulatedCommentSerializer(many=True)
    categories = PhotoCategorySerializer(many=True)
    owner = NestedUserSerializer()
    liked_by = NestedUserSerializer(many=True)
