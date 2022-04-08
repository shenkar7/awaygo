# Generated by Django 3.1.7 on 2021-05-22 06:28

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0011_auto_20210516_0941'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['process_date_time']},
        ),
        migrations.RenameField(
            model_name='order',
            old_name='date_time',
            new_name='process_date_time',
        ),
        migrations.AddField(
            model_name='order',
            name='canceled_date_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='creation_date_time',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 5, 22, 6, 28, 6, 70680, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='delivered_date_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='ready_date_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='sent_date_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('process', 'In Process'), ('ready', 'Ready'), ('sent', 'Sent'), ('delivered', 'Delivered'), ('canceled', 'Canceled')], default='new', max_length=9),
        ),
    ]