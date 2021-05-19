# Generated by Django 3.2 on 2021-05-18 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CurrencyConversionDetail',
            fields=[
                ('conversion_id', models.AutoField(primary_key=True, serialize=False)),
                ('CurrencyInputType', models.CharField(max_length=10)),
                ('CurrencyOutputType', models.CharField(max_length=10)),
                ('CurrencyInputValue', models.CharField(max_length=10)),
                ('CurrencyOutputValue', models.CharField(max_length=10)),
                ('FinalOutput', models.CharField(max_length=15)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]