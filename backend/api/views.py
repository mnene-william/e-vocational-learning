from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions, filters
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .serializers import *
from rest_framework.response import Response
from  .models import Skill, Lesson, UserProfile
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]


class QuizQuestionViewSet(viewsets.ModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Automatically attach the logged-in user
        serializer.save(user=self.request.user)



class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    
    def perform_create(self, serializer):
        # This automatically sets the user from the request
        serializer.save(user=self.request.user)


class ContactMessageCreateView(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    http_method_names = ['post', 'get']



class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)
    



@api_view(["GET"])
@permission_classes([AllowAny])
def search(request):
    query = request.GET.get("q", "").strip()

    if not query:
        return Response({"skill": None, "lessons": []})

    # First: check if query matches a Skill
    matching_skills = Skill.objects.filter(name__icontains=query)
    if matching_skills.exists():
        lessons = Lesson.objects.filter(category__in=matching_skills)
        serializer = LessonSerializer(lessons.distinct(), many=True)
        return Response({
            "skill": matching_skills.first().name,
            "lessons": serializer.data
        })

    # Otherwise: search Lessons directly
    lessons = Lesson.objects.filter(
        Q(title__icontains=query) | Q(content__icontains=query)
    )

    serializer = LessonSerializer(lessons.distinct(), many=True)
    return Response({
        "skill": None,
        "lessons": serializer.data
    })
