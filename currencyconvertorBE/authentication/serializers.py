from rest_framework import serializers
from .models import *


class AllDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountDetail
        fields = ['user_id', 'firstname', 'lastname', 'mobile',
                  'email', 'is_actived', 'created_at', 'updated_at']


class signUpSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=200)
    confirmpassword = serializers.CharField(max_length=200)

    class Meta:
        model = UserAccountDetail
        fields = ['firstname', 'lastname',
                  'email', 'password', 'confirmpassword']


class signUpFinalSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=200)

    class Meta:
        model = UserAccountDetail
        fields = ['firstname', 'lastname', 'email', 'password']


class signInEmailSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=100)

    class Meta:
        model = UserAccountDetail
        fields = ['email']


class signInPasswordSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=200)

    class Meta:
        model = UserAccountDetail
        fields = ['email', 'password']
