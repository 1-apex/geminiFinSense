from django.db import models

class FinancialQuery(models.Model):
    user_id = models.IntegerField()
    query_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class FinancialResponse(models.Model):
    query = models.ForeignKey(FinancialQuery, on_delete=models.CASCADE)
    response_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
