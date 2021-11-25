import re
import secrets
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

def random_string():
    return str(secrets.randbits(32))

def isLowerCase(val):
    if any(char.isupper() for char in val):
        raise ValidationError('public_address must be lowercase')

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=400)
    nonce = models.BigIntegerField(default = random_string, blank=False)
    public_address = models.CharField(max_length=50, unique=True, validators=[isLowerCase], null=True)
    followed_by = models.ManyToManyField(
        'self',
        related_name='following',
        symmetrical=False,
        blank=True
    )
