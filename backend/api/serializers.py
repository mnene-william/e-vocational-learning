from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only":True}}


    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class LessonSerializer(serializers.ModelSerializer):
    category = SkillSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(

        queryset=Skill.objects.all(), source="category", write_only=True
    )

    placeholder_image = serializers.SerializerMethodField()

    class Meta:
        model = Lesson

        fields = ["id", "title", "content", "video", "video_url", "created_at", "category", "category_id", "placeholder_image"]

    def get_placeholder_image(self, object):
        if object.placeholder_image:
            return object.placeholder_image.url
            
        else:
            return None


class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = "__all__"

class UserProgressSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProgress
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"

class ContactMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactMessage
        fields = "__all__"

class LessonProgressSerializer(serializers.ModelSerializer):
      lesson_title = serializers.CharField(source="lesson.title", read_only=True)

      class Meta:
          model = LessonProgress
          fields = ["lesson", "lesson_title", "completed", "progress_percentage", "last_opened"]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    progress = LessonProgressSerializer(source="user.progress", many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ["username", "email", "bio", "profile_picture", "progress"]
        