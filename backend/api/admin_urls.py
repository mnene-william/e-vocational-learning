from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .admin_views import *


router = DefaultRouter()

router.register(r"users", AdminUserViewSet, basename="admin-users")
router.register(r"lessons", AdminLessonViewSet, basename="admin-lessons")
router.register(r"quizzes", AdminQuizViewSet, basename="admin-reviews")
router.register(r"profiles", AdminUserProfileViewSet, basename="admin-profiles")
router.register(r"reviews", AdminReviewViewSet, basename="admin-reviews")

urlpatterns = [
    path('',include(router.urls)),
]