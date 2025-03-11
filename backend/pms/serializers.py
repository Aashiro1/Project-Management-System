# pms_app/serializers.py

from rest_framework import serializers
from .models import ProjectList

class ProjectListSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ProjectList
        fields = '__all__'  # You can specify the fields if needed instead of all
