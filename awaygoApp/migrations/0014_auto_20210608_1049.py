# Generated by Django 3.1.7 on 2021-06-08 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0013_auto_20210607_1532'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='delivery_cost',
            field=models.DecimalField(decimal_places=2, default=10, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='restaurant',
            name='lat',
            field=models.DecimalField(decimal_places=7, default=32.1, max_digits=9),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='restaurant',
            name='lng',
            field=models.DecimalField(decimal_places=7, default=34.7, max_digits=9),
            preserve_default=False,
        ),
    ]