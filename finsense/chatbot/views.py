from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FinancialQuery, FinancialResponse
from .serializers import FinancialQuerySerializer, FinancialResponseSerializer
import requests
from decouple import config

class ChatView(APIView):
    def post(self, request):
        user_input = request.data.get('message', '')
        if user_input:
            response_text = self.call_gemini_api(user_input)
            return Response({'response': response_text}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)

    def call_gemini_api(self, query_text):
        api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{
                "parts": [{"text": query_text}]
            }],
            "generationConfig": {
                "maxOutputTokens": 2048,
                "temperature": 0.7
            }
        }
        response = requests.post(f"{api_url}?key={config('GEMINI_API_KEY')}", headers=headers, json=payload)
        
        if response.status_code == 200:
            try:
                # return response.json().get('contents', [{}])[0].get('parts', [{}])[0].get('text', "No valid response")
                response_json = response.json()
                return response_json['candidates'][0]['content']['parts'][0]['text']
            except (IndexError, KeyError):
                return "Malformed response from Gemini API"
        else:
            return f"Unexpected error: {response.status_code}"