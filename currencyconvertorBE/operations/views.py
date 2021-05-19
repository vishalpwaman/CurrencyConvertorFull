from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status, generics, views
from django.contrib.sites.shortcuts import get_current_site
from drf_yasg import openapi
import json
from drf_yasg.utils import swagger_auto_schema
# Create your views here.

from .serializers import *
# from .validations import *
from .models import *
from .Conversions import *

# Create your views here.

# Sign Up Api


class Currencyconversion(GenericAPIView):
    serializer_class = CurrencySerializer

    def post(self, request):
        try:
            print("flag 1")
            Result = ConversionService.Conversions(request)
            print("flag 2", Result)
            if Result == -1:
                return Response("Invalid Operation", status=status.HTTP_400_BAD_REQUEST)
            # Save in Database process
            try:
                print("flag 3")
                data = {
                    'CurrencyInputType': request.data.get("CurrencyInputType"),
                    'CurrencyOutputType': request.data.get("CurrencyOutputType"),
                    'CurrencyInputValue': request.data.get("CurrencyInputValue"),
                    'CurrencyOutputValue': Result
                }
                print(data)
                Serializer_class = CurrencyAllDetailSerializer(
                    data=data)
                if Serializer_class.is_valid():
                    Serializer_class.save()
                    data = {
                        "message": "Save detail Successful",
                        "data": data
                    }
                    print(data)
                    print("flag 4")
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
                "message": "Internal server Exception",
                "Exception": Exception
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class showallConversionHistoryView(GenericAPIView):

    def get(self, request):
        try:
            data = CurrencyConversionDetail.objects.all()
            serializer = CurrencyOutputDetailSerializer(data, many=True)
            print("Data Print", serializer.data)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class deleteallUserView(GenericAPIView):

    def delete(self, request):
        try:
            products = CurrencyConversionDetail.objects.all()
            products.delete()
            return Response("Successfully deleted", status=status.HTTP_202_ACCEPTED)
        except:
            data = {
                "message ": "Internal Server Error",
                "data ": request.data
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
