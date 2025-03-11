from django.urls import path
from .views import ProjectListView, ProjectDetailView

urlpatterns = [
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-delete'), 
    path("projects/", ProjectListView.as_view(), name="project-list"),  # Handles GET and POST
    
]