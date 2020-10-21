from django.db import models

class Photo(models.Model):
    title = models.CharField(max_length = 75)
    description = models.TextField(max_length=300, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    taken_at = models.DateTimeField(null=True, blank=True)
    camera = models.CharField(max_length = 50, blank=True)
    lens = models.CharField(max_length = 50, blank=True)
    image = models.CharField(max_length=400)
    location = models.CharField(max_length = 75)

    def __str__(self):
        return f'{self.title}'
