from rest_framework import serializers
from .models import *

# used in "restaurant_details" (GET, PUT) view which is used in: /restaurant_menu/?id=<id>
# used in "my_restaurant" view which is used in: /restaurant
class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'freetext', 'background_img', 'menu_open', 'delivery_cost']
        read_only_fields = ['background_img']

# used in "customers_list" view in: /restaurant
# used in "order_add" view (POST only) in: /restaurant and /restaurant_menu?id=<id>
# used by DetailedOrderSerializer
class CustomerSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Customer
        fields = '__all__'

# used by ExtraCategorySerializer
# used by DetailedDishInOrderSerializer
class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extra
        fields = fields = ['id', 'name', 'price']

# used by FullDishSerializer
class ExtraCategorySerializer(serializers.ModelSerializer):
    extras = ExtraSerializer(source='extra_set', many=True, read_only=True)
    
    class Meta:
        model = ExtraCategory
        fields = ['name', 'type', 'extras']

# used by FoodCategorySerializer
class FullDishSerializer(serializers.ModelSerializer):
    extraCategories = ExtraCategorySerializer(source='extracategory_set', many=True, read_only=True)
    
    class Meta:
        model = Dish
        fields = ['id','name', 'description', 'price', 'extraCategories', 'img', 'visible']

# used by "foodCategories_list" view in: /restaurant and /restaurant_menu?id=<id>
class FoodCategorySerializer(serializers.ModelSerializer):
    dishes = FullDishSerializer(source='dish_set', many=True, read_only=True)

    class Meta:
        model = FoodCategory
        fields = ['name', 'dishes']

# used by "dishes_list" view in: /restaurant
# used by "dish_details" (PUT only) view in: /resstaurant
# used by DetailedDishInOrderSerializer
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'
        read_only_fields = ['img']

# used by "order_add" view (POST) in: /restaurant and /restaurant_menu?id=<id>
class DishInOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DishInOrder
        fields = ['dish', 'extras', 'order', 'quantity', 'remark']

# used by DetailedOrderSerializer
class DetailedDishInOrderSerializer(serializers.ModelSerializer):
    dish = DishSerializer(read_only=True)
    extras = ExtraSerializer(many=True, read_only=True)
    
    class Meta:
        model = DishInOrder
        fields = ['dish', 'extras', 'order', 'quantity', 'remark']

# used by "order_detail" view (PUT only) for staff to update order status and timing
# used by "order_add" view (POST) in: /restaurant and /restaurant_menu?id=<id>
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# used by "orders_list" view in: /restaurant
class DetailedOrderSerializer(serializers.ModelSerializer):
    dishesinorder = DetailedDishInOrderSerializer(source='dishinorder_set', many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'restaurant', 'creation_date_time', 'process_date_time', 'timing_date_time', 'ready_date_time', 'sent_date_time', 'delivered_date_time', 'canceled_date_time','status', 'address_lat', 'address_lng', 'total_price','customer', 'city', 'street', 'number', 'apartment', 'remark', 'dishesinorder']