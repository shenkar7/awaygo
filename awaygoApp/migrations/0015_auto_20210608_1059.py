# Generated by Django 3.1.7 on 2021-06-08 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('awaygoApp', '0014_auto_20210608_1049'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='address_lat',
            field=models.DecimalField(decimal_places=7, default=32.1, max_digits=9),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='address_lng',
            field=models.DecimalField(decimal_places=7, default=34.8, max_digits=9),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='address_lat',
            field=models.DecimalField(decimal_places=7, default=32.1, max_digits=9),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='address_lng',
            field=models.DecimalField(decimal_places=7, default=34.8, max_digits=9),
            preserve_default=False,
        ),
    ]