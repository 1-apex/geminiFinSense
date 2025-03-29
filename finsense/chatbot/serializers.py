from rest_framework import serializers

from .models import FinancialQuery, FinancialResponse

class FinancialQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialQuery
        fields = '__all__'

class FinancialResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialResponse
        fields = '__all__'
