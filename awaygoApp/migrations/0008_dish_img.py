# Generated by Django 3.1.7 on 2021-04-20 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0007_auto_20210420_1919'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='dishes/'),
        ),
    ]
