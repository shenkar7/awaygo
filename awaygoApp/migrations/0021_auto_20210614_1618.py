# Generated by Django 3.1.7 on 2021-06-14 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0020_order_delivery_distance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliveryboy',
            name='current_status',
            field=models.CharField(choices=[('free', 'Free'), ('delivering', 'Delivering'), ('inaccessible', 'Inaccessible')], default='free', max_length=12),
        ),
    ]
