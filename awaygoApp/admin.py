from django.contrib import admin

from .models import *

# Register your models here.
modelsList = [Restaurant, Address, Customer, FoodCategory, Dish, Order, DishInOrder, ExtraCategory, Extra]
admin.site.register(modelsList)