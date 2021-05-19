from django.db import models
import datetime
# Create your models here.


class UserAccountDetail(models.Model):
    user_id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100, blank=False, null=False)
    lastname = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(
        max_length=100, blank=False, null=False, unique=True)
    mobile = models.DecimalField(
        max_digits=12, decimal_places=0, default=False)
    password = models.CharField(
        max_length=200, blank=False, null=False)
    is_verified = models.BooleanField(default=False)
    is_actived = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
