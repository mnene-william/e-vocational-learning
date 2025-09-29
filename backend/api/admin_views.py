from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

class AdminOnly(permissions.BasePermission):
      def has_permision(self, request, view):
            return request.user and request.user.is_staff
      

class AdminUserViewSet(viewsets.ModelViewSet):
      queryset = User.objects.all()
      serilizer_class = UserSerializer
      permission_classes = [AdminOnly]
      
class AdminLessonViewSet(viewsets.ModelViewSet):
      queryset = Lesson.objects.all()
      serializer_class = LessonSerializer
      permission_classes = [AdminOnly]



      




