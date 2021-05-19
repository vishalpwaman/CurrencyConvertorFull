from django.urls import path, include
from .views import *

urlpatterns = [
    path('Currencyconversion/', Currencyconversion.as_view(),
         name="Currencyconversion"),
    path('showallConversionHistory/', showallConversionHistoryView.as_view(),
         name="showallConversionHistory"),
    path('deleteallUser/', deleteallUserView.as_view(),
         name="deleteallUser"),
]
