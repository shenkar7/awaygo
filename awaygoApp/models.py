from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.

class Restaurant(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    # img = models.ImageField(upload_to='restaurants/', blank=True, null=True)

    def __str__(self):
        return self.name

class Address(models.Model):
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200, blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    floor = models.IntegerField(blank=True, null=True)
    apartment = models.IntegerField(blank=True, null=True)

    def __str__(self):
        street = ''
        if self.street:
                street = str(self.street)
        number = ''
        if self.number:
            number = str(self.number)
        floor = ''
        if self.floor:
            floor = str(self.floor)
        apartment = ''
        if self.apartment:
            apartment = str(self.apartment)
        return self.city + ' ' + street + ' ' + number + ' ' + floor + ' ' + apartment

class Customer(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, unique=True) # validators should be a list
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True, blank=True, null=True)
    # remove null
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

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
    # parent_dish = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    # img = models.ImageField(upload_to='dishes/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Dishes"

    def __str__(self):
        return self.name + ' - ' + self.category.restaurant.name

class Order(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=9,
        choices=[('new', 'New'), ('process', 'In Process'), ('ready', 'Ready'), ('sent', 'Sent'), ('delivered', 'Delivered')],
        default='process'
    )
    # remove null
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    remark = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    class Meta:
        ordering = ['date_time']

    def __str__(self):
        return str(self.id) + " - " + self.restaurant.name + " - " + self.customer.first_name + " " + self.customer.last_name

class DishInOrder(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        verbose_name_plural = "Dishes In Orders"

    def __str__(self):
        return self.dish.name + ' ×' + str(self.quantity) + ' - הזמנה ' + str(self.order.id)