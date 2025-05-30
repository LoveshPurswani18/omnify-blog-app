from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)  # Shows username
    class Meta:
        model = Blog
        fields = '__all__'
        