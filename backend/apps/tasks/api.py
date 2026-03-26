from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    # Sobreescribir get_queryset para filtrar tareas por usuario autenticado
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

# Sobreescribir perform_create para asociar la tarea con el usuario autenticado
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
