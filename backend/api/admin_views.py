from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

class AdminOnly(permissions.BasePermission):
      def has_permision(self, request, view):
            return request.user and request.user.is_staff
      


      




