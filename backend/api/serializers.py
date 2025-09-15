from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
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

    class Meta:
        model = Lesson

        fields = ["id", "title", "content", "video", "video_url", "created_at", "category", "category_id"]

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

        