# Generated by Django 3.1.7 on 2021-06-09 06:00

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('awaygoApp', '0017_auto_20210608_1445'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryBoy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=17, unique=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')])),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('vehicle', models.CharField(choices=[('bicycle', 'Bicycle'), ('motorcycle', 'Motorcycle')], default='bicycle', max_length=10)),
                ('current_status', models.CharField(choices=[('free', 'Free'), ('delivering', 'Delivering')], default='free', max_length=10)),
                ('current_lat', models.DecimalField(blank=True, decimal_places=7, max_digits=9, null=True)),
                ('current_lng', models.DecimalField(blank=True, decimal_places=7, max_digits=9, null=True)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
