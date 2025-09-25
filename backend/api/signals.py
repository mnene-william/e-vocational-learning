from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.contrib.auth import get_user_model
from .models import UserProfile
from django.db.models.signals import post_save


User = get_user_model()


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    print(" Password reset token:", reset_password_token.key)

    print(" Reset link:", f"http://localhost:5173/reset-password?token={reset_password_token.key}&uid={reset_password_token.user.pk}")



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
