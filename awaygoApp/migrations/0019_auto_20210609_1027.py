# Generated by Django 3.1.7 on 2021-06-09 07:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0018_deliveryboy'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['timing_date_time']},
        ),
        migrations.AddField(
            model_name='order',
            name='deliveryboy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='awaygoApp.deliveryboy'),
        ),
    ]
