# Generated by Django 5.1.6 on 2025-03-29 21:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='financialquery',
            name='user_id',
        ),
    ]
