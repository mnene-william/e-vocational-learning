from django.db import models

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
    content = models.CharField(blank=True)
    video = models.FileField(upload_to='lessons/videos/', blank=True, null=True)
    video_url =models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category.name} - {self.title}"
    

class Qu
    


