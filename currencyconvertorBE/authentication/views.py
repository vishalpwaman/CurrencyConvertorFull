from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status, generics, views
from django.contrib.sites.shortcuts import get_current_site
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
# Create your views here.

from .serializers import *
from .validations import *
from .models import *

# Sign Up Api

class signUpView(GenericAPIView):
    serializer_class = signUpSerializer

    def post(self, request):
        try:
            # Validation
            Validation_Response = signUpView_Validation(request)
            if Validation_Response:
                return Response(Validation_Response, status=status.HTTP_400_BAD_REQUEST)

            # Email id already present or not
            try:
                email_Response = UserAccountDetail.objects.get(
                    email=request.data.get('email'))
                data = {
                    "message": "Signup Unsuccessful. Email id already present",
                    "data": request.data
                }
                # return Response(message=data, status=status.HTTP_400_BAD_REQUEST)
                return Response({"data": {"message": "Unsuccessful"}}, 400)
            except:
                # Email id Not found
                pass

            # Password match
            if request.data.get("password") != request.data.get("confirmpassword"):
                Message = "Password not match"
                return Response(Message, status=status.HTTP_400_BAD_REQUEST)

            # Save in Database process
            try:
                Serializer_class = signUpFinalSerializer(data=request.data)
                if Serializer_class.is_valid():
                    Serializer_class.save()
                    data = {
                        "message": "Sign up Successful",
                        "data": request.data
                    }
                    print(data)
                    return Response(data, status=status.HTTP_201_CREATED)
                data = {
                    "message": "Sign Up Failed",
                    "data": request.data
                }
                print(data)
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except:
                data = {
                    "message": "Error in Database",
                    "data": request.data
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            data = {
                "message": "Sign Up Exception",
                "Exception": Exception
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Sign In Enter Email Api

class signInEmailView(GenericAPIView):
    serializer_class = signInEmailSerializer

    def post(self, request):
        try:
            validation_Response = EmailView_Validation(request)
            if validation_Response:
                return Response(validation_Response, status=status.HTTP_400_BAD_REQUEST)

            # Check Email Id Present Or not
            try:
                email_Response = UserAccountDetail.objects.get(
                    email=request.data.get('email'))
            except:
                data = {
                    "message ": "Email Id Not Found",
                    "data ": request.data
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            # Check Account Verified or not
            # if email_Response.is_verified == False:
            #     data = {
            #         "message": "Account Not Verified"
            #     }
            #     return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)

            serializer_class = AllDataSerializer(email_Response, many=False)
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Sign In Enter Password Api

class signInPasswordView(GenericAPIView):
    serializer_class = signInPasswordSerializer

    def post(self, request):
        try:
            validation_Response = signInPasswordView_Validation(request)
            if validation_Response:
                return Response(validation_Response, status=status.HTTP_400_BAD_REQUEST)

            try:
                signIn_Response = UserAccountDetail.objects.get(
                    email=request.data.get('email'), password=request.data.get("password"))
            except:
                data = {
                    "message ": "Sign In Failed",
                    "data ": request.data
                }
                return Response(data, status=status.HTTP_401_UNAUTHORIZED)

            serializer_class = AllDataSerializer(signIn_Response, many=False)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class deleteOneUserView(GenericAPIView):
    serializer_class = signInEmailSerializer

    def post(self, request):
        try:
            products = UserAccountDetail.objects.get(
                email=request.data.get('email'))
            products.delete()
            return Response("Successfully deleted", status=status.HTTP_202_ACCEPTED)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class deleteallUserView(GenericAPIView):

    def delete(self, request):
        try:
            products = UserAccountDetail.objects.all()
            products.delete()
            return Response("Successfully deleted", status=status.HTTP_202_ACCEPTED)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class showallUserView(GenericAPIView):

    def get(self, request):
        try:
            data = UserAccountDetail.objects.all()
            serializer = AllDataSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
