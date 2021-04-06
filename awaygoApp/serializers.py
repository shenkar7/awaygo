from rest_framework import serializers
from .models import *

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['city', 'street', 'number', 'zip_code', 'floor', 'apartment']

class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    
    class Meta:
        model = Customer
        fields = ['id', 'phone_number', 'first_name', 'last_name', 'email', 'address']

class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extra
        fields = fields = ['name', 'price']

class ExtraCategorySerializer(serializers.ModelSerializer):
    extras = ExtraSerializer(source='extra_set', many=True, read_only=True)
    
    class Meta:
        model = ExtraCategory
        fields = ['name', 'type', 'extras']

class FullDishSerializer(serializers.ModelSerializer):
    extraCategories = ExtraCategorySerializer(source='extracategory_set', many=True, read_only=True)
    
    class Meta:
        model = Dish
        fields = ['name', 'description', 'price', 'extraCategories']

class FoodCategorySerializer(serializers.ModelSerializer):
    dishes = FullDishSerializer(source='dish_set', many=True, read_only=True)

    class Meta:
        model = FoodCategory
        fields = ['name', 'dishes']

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class DishInOrderSerializer(serializers.ModelSerializer):
    dish = DishSerializer(read_only=True)
    
    class Meta:
        model = DishInOrder
        fields = ['dish', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    dishesinorder = DishInOrderSerializer(source='dishinorder_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
