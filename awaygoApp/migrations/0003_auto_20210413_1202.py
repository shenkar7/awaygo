# Generated by Django 3.1.7 on 2021-04-13 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0002_auto_20210413_1201'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dishinorder',
            name='extras',
            field=models.ManyToManyField(blank=True, null=True, to='awaygoApp.Extra'),
        ),
    ]