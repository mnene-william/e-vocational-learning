from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions, filters, status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializers import *
from rest_framework.response import Response
from  .models import Skill, Lesson, UserProfile
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
import os
import requests



GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_quiz(request, lesson_id):

    try:

        lesson = Lesson.objects.get(id=lesson_id)

    except Lesson.DoesNotExist:

        return Response({"error": "Lesson not found"}, status=404)

 
    prompt = f"""
    Generate 4 multiple-choice questions (A-D) with correct answers
    from the following lesson content:

    {lesson.content}

    Return in this JSON format:
    [
      {{
        "question_text": "...",
        "option_a": "...",
        "option_b": "...",
        "option_c": "...",
        "option_d": "...",
        "correct_option": "A/B/C/D"
      }},
      ...
    ]
    """

    payload = {
        "contents": [

            {"parts": [{"text": prompt}]}

        ]
    }

    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"

    }

    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)

    if response.status_code != 200:
        return Response({"error": "Failed to generate quiz"}, status=500)

    data = response.json()


    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]

        # Convert string response to actual JSON list
        import json
        questions_list = json.loads(text)
    except Exception as e:
        return Response({"error": "Failed to parse Gemini response", "details": str(e)}, status=500)

    # Save to QuizQuestion model
    created_questions = []

    for q in questions_list:

        question = QuizQuestion.objects.create(

            lesson=lesson,
            
            question_text=q["question_text"],
            option_a=q["option_a"],
            option_b=q["option_b"],
            option_c=q["option_c"],
            option_d=q["option_d"],
            correct_option=q["correct_option"]

        )
        created_questions.append(question.id)


    return Response({"created_questions": created_questions})
    

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.is_authenticated:
            

            lesson_progress, created = LessonProgress.objects.get_or_create(user=request.user,lesson=instance)
                
                
            

           
            lesson_progress.progress_percentage = min(lesson_progress.progress_percentage + 10, 100)
                
                
            
            lesson_progress.completed = lesson_progress.progress_percentage == 100

            lesson_progress.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class QuizQuestionViewSet(viewsets.ModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user)



class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    
    def get_queryset(self):

        lesson_id = self.request.query_params.get("lesson")

        if lesson_id:

            return Review.objects.filter(lesson_id=lesson_id)
        
        return super().get_queryset()

    def perform_create(self, serializer):
       
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

    # The first step is to check if query matches a Skill
    matching_skills = Skill.objects.filter(name__icontains=query)

    if matching_skills.exists():

        lessons = Lesson.objects.filter(category__in=matching_skills)
        serializer = LessonSerializer(lessons.distinct(), many=True)
        return Response({
            "skill": matching_skills.first().name,
            "lessons": serializer.data
        })
    

    # Otherwise search Lessons directly
    lessons = Lesson.objects.filter(
        Q(title__icontains=query) | Q(content__icontains=query)
    )

    serializer = LessonSerializer(lessons.distinct(), many=True)
    return Response({
        "skill": None,
        "lessons": serializer.data
    })



class TrackLessonProgressView(generics.CreateAPIView):
    serializer_class = LessonProgressSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        lesson_id = request.data.get("lesson_id")
        progress_percentage = request.data.get("progress_percentage", 0)


        try:
            lesson = Lesson.objects.get(id=lesson_id)

        except Lesson.DoesNotExist:

            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get or create(kama user hana) LessonProgress for this user + lesson
        progress, created = LessonProgress.objects.get_or_create(

            user=request.user,
            lesson=lesson,
            defaults={"progress_percentage": progress_percentage}
        )

        if not created:
            # Update progress if higher than before
            progress.progress_percentage = max(progress.progress_percentage,float(progress_percentage))
                
                
            

            # Mark the lesson as completed if the progress percentage is greater that 100
            if progress.progress_percentage >= 100:

                progress.completed = True

            progress.save()

        serializer = self.get_serializer(progress)

        return Response(serializer.data, status=status.HTTP_200_OK)
    


