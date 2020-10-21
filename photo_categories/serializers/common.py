from rest_framework import serializers
from ..models import PhotoCategory

class PhotoCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoCategory
        fields = '__all__'
