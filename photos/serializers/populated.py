from ..serializers.common import PhotoSerializer
from comments.serializers.common import CommentSerializer

class PopulatedPhotoSerializer(PhotoSerializer):
    
    comments = CommentSerializer(many=True)
