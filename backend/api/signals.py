from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print(" Password reset token:", reset_password_token.key)
    print(
        " Reset link:",
        f"http://localhost:5173/reset-password?token={reset_password_token.key}&uid={reset_password_token.user.pk}"
    )

