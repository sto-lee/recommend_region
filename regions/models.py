from django.db import models

# Create your models here.

class District(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    average_price = models.DecimalField(max_digits=12, decimal_places=2)
    safety_score = models.FloatField()
    convenience_score = models.FloatField()
    
class Amenity(models.Model):
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    distance = models.FloatField()
