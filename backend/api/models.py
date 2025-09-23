from django.db import models
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField

User = get_user_model()

# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Lesson(models.Model):
    category = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    video = models.FileField(upload_to='lessons/videos/', blank=True, null=True)
    video_url =models.URLField(blank=True, null=True)
    placeholder_image = CloudinaryField('Placeholder-image', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category.name} - {self.title}"
    

class QuizQuestion(models.Model):

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="questions")
    question_text = models.TextField()
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_option = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.lesson.title} - {self.question_text[:200]}"
    
class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    last_attempted = models.DateTimeField(auto_now=True)


    def __str__ (self):
        return f"{self.user.username} - {self.lesson.title}"
    
class Review(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return f"{self.user.username} review for {self.lesson.title}"
    

    


