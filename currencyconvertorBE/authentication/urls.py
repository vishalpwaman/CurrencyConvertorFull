from django.urls import path, include
from .views import *

urlpatterns = [
    path('signUp/', signUpView.as_view(), name="signUP"),
    path('signInEmail/', signInEmailView.as_view(), name="signInEmail"),
    path('signInPassword/', signInPasswordView.as_view(), name="signInPassword"),
    path('deleteOneUser/', deleteOneUserView.as_view(),
         name="deleteOneUser"),
    path('showallUser/', showallUserView.as_view(),
         name="showallUser"), 
    path('deleteallUser/', deleteallUserView.as_view(),
         name="deleteallUser"),
]
