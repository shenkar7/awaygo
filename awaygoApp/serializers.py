from rest_framework import serializers
from .models import Customer, Order, Dish, DishInOrder, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['city', 'street', 'number', 'zip_code', 'floor', 'apartment']

class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    
    class Meta:
        model = Customer
        fields = ['id', 'phone_number', 'first_name', 'last_name', 'email', 'address']

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'category']

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
