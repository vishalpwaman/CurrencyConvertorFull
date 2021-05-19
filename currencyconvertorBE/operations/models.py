from django.db import models

# Create your models here.


class CurrencyConversionDetail(models.Model):
    conversion_id = models.AutoField(primary_key=True)
    CurrencyInputType = models.CharField(
        max_length=10, blank=False, null=False)
    CurrencyOutputType = models.CharField(
        max_length=10, blank=False, null=False)
    CurrencyInputValue = models.CharField(
        max_length=10, blank=False, null=False)
    CurrencyOutputValue = models.CharField(
        max_length=10, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.conversion_id
