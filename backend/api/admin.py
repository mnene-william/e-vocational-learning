from django.contrib import admin
from .models import Skill, Lesson, QuizQuestion, UserProgress, Review

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)
    ordering = ("-created_at",)

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "created_at")
    list_filter = ("category",)
    search_fields = ("title",)

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ("lesson", "question_text", "correct_option")
    search_fields = ("question_text",)

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "lesson", "completed", "last_attempted")
    list_filter = ("completed",)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("user", "lesson", "rating", "created_at")
    list_filter = ("rating",)
    search_fields = ("comment",)

