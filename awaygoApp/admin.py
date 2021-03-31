from django.contrib import admin

from .models import Restaurant, Customer, Dish, Order, DishInOrder, FoodCategory, Address

# Register your models here.
modelsList = [Restaurant, Customer, Dish, Order, DishInOrder, FoodCategory, Address]
admin.site.register(modelsList)