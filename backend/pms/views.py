from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework import status
from .models import ProjectList
from .serializers import ProjectListSerializer

class ProjectDetailView(RetrieveUpdateDestroyAPIView):
    queryset = ProjectList.objects.all()
    serializer_class = ProjectListSerializer

class ProjectListView(APIView):
    def get(self, request):
        projects = ProjectList.objects.all()
        serializer = ProjectListSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)