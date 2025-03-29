from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FinancialQuery, FinancialResponse
from .serializers import FinancialQuerySerializer, FinancialResponseSerializer
import requests
from decouple import config

class QueryView(APIView):
    def post(self, request):
        serializer = FinancialQuerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            query_text = serializer.data['query_text']
            response_text = self.call_gemini_api(query_text)
            response = FinancialResponse.objects.create(query_id=serializer.data['id'], response_text=response_text)
            return Response(FinancialResponseSerializer(response).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def call_gemini_api(self, query_text):
        api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": query_text}]}],
            "generationConfig": {
                "maxOutputTokens": 2048,
                "temperature": 0.7
            }
        }
        response = requests.post(f"{api_url}?key={config('GEMINI_API_KEY')}", headers=headers, json=payload)

        print("API Response Status Code:", response.status_code)
        print("API Response Body:", response.text)

        if response.status_code == 200:
            try:
                response_json = response.json()
                return response_json['candidates'][0]['content']['parts'][0]['text']
            except (IndexError, KeyError):
                return "Malformed response from Gemini API"
        else:
            return f"Error {response.status_code}: {response.text}"

