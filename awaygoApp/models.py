from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils import timezone

# Create your models here.

class Restaurant(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    freetext = models.TextField(blank=True, null=True)
    background_img = models.ImageField(upload_to='restaurants/', blank=True, null=True)
    menu_open = models.BooleanField(default=True)
    delivery_cost = models.DecimalField(max_digits=5, decimal_places=2)
    lat = models.DecimalField(max_digits=9, decimal_places=7)
    lng = models.DecimalField(max_digits=9, decimal_places=7)

    def __str__(self):
        return self.name

class Customer(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    
    phone_number = models.CharField(validators=[phone_regex], max_length=17, unique=True) # validators should be a list
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    number = models.IntegerField()
    apartment = models.IntegerField(blank=True, null=True)
    address_lat = models.DecimalField(max_digits=9, decimal_places=7)
    address_lng = models.DecimalField(max_digits=9, decimal_places=7)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class FoodCategory(models.Model):
    name = models.CharField(max_length=200)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Food Categories"

    def __str__(self):
        return self.name + ' - ' + self.restaurant.name
        
class Dish(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='dishes/', blank=True, null=True)
    visible = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Dishes"

    def __str__(self):
        return self.name + ' - ' + self.category.restaurant.name

class Order(models.Model):
    creation_date_time = models.DateTimeField(auto_now_add=True)
    process_date_time = models.DateTimeField(blank=True, null=True)
    timing_date_time = models.DateTimeField(blank=True, null=True)
    ready_date_time = models.DateTimeField(blank=True, null=True)
    sent_date_time = models.DateTimeField(blank=True, null=True)
    delivered_date_time = models.DateTimeField(blank=True, null=True)
    canceled_date_time = models.DateTimeField(blank=True, null=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=9,
        choices=[('new', 'New'), ('process', 'In Process'), ('ready', 'Ready'), ('sent', 'Sent'), ('delivered', 'Delivered'), ('canceled', 'Canceled')],
        default='new'
    )
    remark = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    number = models.IntegerField()
    apartment = models.IntegerField(blank=True, null=True)
    address_lat = models.DecimalField(max_digits=9, decimal_places=7)
    address_lng = models.DecimalField(max_digits=9, decimal_places=7)
    total_price = models.DecimalField(max_digits=6, decimal_places=2)
    delivery_distance = models.DecimalField(max_digits=5, decimal_places=3)

    class Meta:
        ordering = ['timing_date_time']

    def __str__(self):
        return str(self.id) + " - " + self.restaurant.name + " - " + self.customer.first_name + " " + self.customer.last_name + " - " + self.status

class ExtraCategory(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(
        max_length=9,
        choices=[('checkbox', 'Checkbox'), ('radio', 'Radio')],
        default='checkbox'
    )
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Extra Categories"

    def __str__(self):
        return self.name + ' - ' + self.dish.name + ' - ' + str(self.dish.category.restaurant.name)

class Extra(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    extraCategory = models.ForeignKey(ExtraCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' - ' + self.extraCategory.dish.name + ' - ' + str(self.extraCategory.dish.category.restaurant.name)

class DishInOrder(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    remark = models.TextField(blank=True, null=True)
    extras = models.ManyToManyField(Extra, blank=True)

    class Meta:
        verbose_name_plural = "Dishes In Orders"

    def __str__(self):
        return self.dish.name + ' ×' + str(self.quantity) + ' - הזמנה ' + str(self.order.id)
