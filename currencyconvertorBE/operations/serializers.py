from rest_framework import serializers
from .models import *


class CurrencySerializer(serializers.ModelSerializer):
    CurrencyInputType = serializers.CharField(max_length=10)
    CurrencyOutputType = serializers.CharField(max_length=10)
    CurrencyInputValue = serializers.CharField(max_length=10)

    class Meta:
        model = CurrencyConversionDetail
        fields = ['CurrencyInputType',
                  'CurrencyOutputType', 'CurrencyInputValue']


class CurrencyAllDetailSerializer(serializers.ModelSerializer):
    CurrencyInputType = serializers.CharField(max_length=10)
    CurrencyOutputType = serializers.CharField(max_length=10)
    CurrencyInputValue = serializers.CharField(max_length=10)
    CurrencyOutputValue = serializers.CharField(max_length=10)

    class Meta:
        model = CurrencyConversionDetail
        fields = ['CurrencyInputType',
                  'CurrencyOutputType', 'CurrencyInputValue', 'CurrencyOutputValue']


class CurrencyOutputDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = CurrencyConversionDetail
        fields = '__all__'
