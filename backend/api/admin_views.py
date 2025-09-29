from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

class AdminOnly(permissions.BasePermission):
      def has_permission(self, request, view):
            return request.user and request.user.is_staff
      

class AdminUserViewSet(viewsets.ModelViewSet):
      queryset = User.objects.all()
      serializer_class = UserSerializer
      permission_classes = [AdminOnly]
      
class AdminLessonViewSet(viewsets.ModelViewSet):
      queryset = Lesson.objects.all()
      serializer_class = LessonSerializer
      permission_classes = [AdminOnly]


class AdminQuizViewSet(viewsets.ModelViewSet):
      queryset = QuizQuestion.objects.all()
      serializer_class = QuizQuestionSerializer
      permission_classes = [AdminOnly]

class AdminReviewViewSet(viewsets.ModelViewSet):
      queryset = Review.objects.all()
      serializer_class = ReviewSerializer
      permission_classes = [AdminOnly]


class AdminUserProfileViewSet(viewsets.ModelViewSet):
      queryset = UserProfile.objects.all()
      serializer_class = UserProfileSerializer
      permission_classes = [AdminOnly]




      




