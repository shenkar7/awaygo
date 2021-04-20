from rest_framework import serializers
from .models import *

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'freetext', 'background_img']

class CustomerSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Customer
        fields = '__all__'

class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extra
        fields = fields = ['id', 'name', 'price']

class ExtraCategorySerializer(serializers.ModelSerializer):
    extras = ExtraSerializer(source='extra_set', many=True, read_only=True)
    
    class Meta:
        model = ExtraCategory
        fields = ['name', 'type', 'extras']

class FullDishSerializer(serializers.ModelSerializer):
    extraCategories = ExtraCategorySerializer(source='extracategory_set', many=True, read_only=True)
    
    class Meta:
        model = Dish
        fields = ['id','name', 'description', 'price', 'extraCategories', 'img']

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
    class Meta:
        model = DishInOrder
        fields = ['dish', 'extras', 'order', 'quantity', 'remark']

class DetailedDishInOrderSerializer(serializers.ModelSerializer):
    dish = DishSerializer(read_only=True)
    extras = ExtraSerializer(many=True, read_only=True)
    
    class Meta:
        model = DishInOrder
        fields = ['dish', 'extras', 'order', 'quantity', 'remark']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class DetailedOrderSerializer(serializers.ModelSerializer):
    dishesinorder = DetailedDishInOrderSerializer(source='dishinorder_set', many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'restaurant', 'date_time', 'status', 'customer', 'city', 'street', 'number', 'apartment', 'remark','dishesinorder']