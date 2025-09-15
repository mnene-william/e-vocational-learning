from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



router = DefaultRouter()
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"questions", QuizQuestionViewSet, basename="question")
router.register(r"progress", UserProgressViewSet, basename="progress")
router.register("reviews", ReviewViewSet, basename="review")

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("", include(router.urls))
    

]